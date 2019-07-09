port module Main exposing (Model)

import Browser
import Browser.Navigation as Nav
import ElmEscapeHtml exposing (escape, unescape)
import FeatherIcons
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Decode as Decode exposing (Decoder, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required, requiredAt)
import Json.Encode as Encode
import List.Extra as ListX
import Process
import Task



-- MODEL


type alias Model =
    { activities : List Activity
    , selectedActivity : Maybe Activity
    , selectedProperty : Maybe Property
    , standards : List Standard
    , status : Status
    , errors : List String
    }


type alias Activity =
    String


type alias Property =
    { fullAddress : String
    , streetNumber : String
    , streetName : String
    , suburb : String
    , postCode : String
    , title : String
    , valuationId : String
    , valuationWufi : Int
    , zone : String
    , specialResidentialArea : String
    , hazardFaultLineArea : String
    }


type alias Standard =
    { key : String
    , description : String
    , name : String
    , questions : List Question
    , section : String
    , status : String
    }


type alias Question =
    { key : String
    , input : Input
    , unit : String
    }


type Input
    = Text (Maybe String) String
    | Number (Maybe Int) String
    | Multichoice (Maybe String) String (List String)
    | File (Maybe String) String


type Status
    = Permitted
    | Controlled
    | DiscretionaryRestricted
    | DiscretionaryUnrestricted
    | NonCompliant
    | Unknown


type Msg
    = NoOp
    | AddError String
    | ExpireError
    | SelectActivity Activity
    | SelectMapProperty Decode.Value
    | ReceiveStandards Decode.Value
    | InputAnswer Standard Question String
    | AskRubric


init : List String -> ( Model, Cmd Msg )
init flags =
    let
        model =
            { activities = flags
            , selectedActivity = Nothing
            , selectedProperty = Nothing
            , standards = []
            , errors = []
            , status = Unknown
            }
    in
    ( model, Cmd.none )



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        AddError e ->
            ( { model | errors = model.errors ++ [ e ] }, delay 5000 ExpireError )

        ExpireError ->
            ( { model | errors = List.drop 1 model.errors }, Cmd.none )

        SelectActivity activity ->
            ( { model | selectedActivity = Just activity }, Cmd.none )

        SelectMapProperty propertyValue ->
            case Decode.decodeValue decodeProperty propertyValue of
                Ok p ->
                    ( { model | selectedProperty = Just p }, Cmd.none )

                Err err ->
                    let
                        debug =
                            Debug.log "Error decoding section: " <|
                                Decode.errorToString err
                    in
                    ( model, addError "Oops! An error has occurred. Check the console for more details." )

        ReceiveStandards val ->
            case Decode.decodeValue decodeStandards val of
                Ok s ->
                    ( { model | standards = s }, Cmd.none )

                Err err ->
                    let
                        debug =
                            Debug.log "Error decoding section: " <|
                                Decode.errorToString err
                    in
                    ( model, addError "Oops! An error has occurred. Check the console for more details." )

        InputAnswer standard question answer ->
            let
                -- oof ouch elm
                updateInput i =
                    case i of
                        Text _ p ->
                            Text (Just answer) p

                        Number _ p ->
                            Number (String.toInt answer) p

                        Multichoice _ p ops ->
                            Multichoice (Just answer) p ops

                        File _ p ->
                            File (Just answer) p

                updateQuestion q =
                    { q | input = updateInput q.input }

                updateStandard s =
                    { s | questions = ListX.updateIf (\q -> q.key == question.key) updateQuestion s.questions }

                newStandards =
                    ListX.updateIf (\s -> s.key == standard.key) updateStandard model.standards
            in
            ( { model | standards = newStandards }, Cmd.none )

        AskRubric ->
            case ( model.selectedActivity, model.selectedProperty ) of
                ( Just a, Just p ) ->
                    let
                        allQuestions =
                            List.foldl (\s l -> s.questions ++ l) [] model.standards
                    in
                    ( model, askRubric <| encodePayload a p allQuestions )

                ( Nothing, Just p ) ->
                    ( model, addError "You need to select an activity first!" )

                ( Just a, Nothing ) ->
                    ( model, addError "You need to select a property first!" )

                ( Nothing, Nothing ) ->
                    ( model, addError "You need to select a property and an activity first!" )



-- INTEROP


port selectMapProperty : (Decode.Value -> msg) -> Sub msg


port askRubric : Encode.Value -> Cmd msg


port receiveStandards : (Decode.Value -> msg) -> Sub msg


encodePayload : Activity -> Property -> List Question -> Encode.Value
encodePayload a p qs =
    Encode.object
        [ ( "scenario", encodeScenario a p )
        , ( "answers", encodeAnswers qs )
        ]


encodeScenario : Activity -> Property -> Encode.Value
encodeScenario a p =
    Encode.object
        [ ( "activity", Encode.string a )
        , ( "address", Encode.string p.fullAddress )
        , ( "valuation_wufi", Encode.int p.valuationWufi )
        , ( "zone", Encode.string p.zone )
        , ( "area_specific_layers", Encode.string p.specialResidentialArea )
        , ( "hazard_fault_line_area", Encode.string p.hazardFaultLineArea )
        ]


encodeAnswers : List Question -> Encode.Value
encodeAnswers questions =
    let
        formatAnswer q =
            ( q.key, getInputAnswer q.input )

        encodeMaybe encoder =
            Maybe.map encoder >> Maybe.withDefault Encode.null

        getInputAnswer i =
            case i of
                Text a _ ->
                    encodeMaybe Encode.string a

                Number a _ ->
                    encodeMaybe Encode.int a

                Multichoice a _ _ ->
                    encodeMaybe Encode.string a

                File a _ ->
                    encodeMaybe Encode.string a
    in
    List.map formatAnswer questions
        |> Encode.object


decodeProperty : Decode.Decoder Property
decodeProperty =
    Decode.succeed Property
        |> required "fullAddress" string
        |> required "streetNumber" string
        |> required "streetName" string
        |> required "suburb" string
        |> required "postCode" string
        |> optional "title" string "No Associated Title"
        |> required "valuationId" string
        |> required "valuationWufi" int
        |> required "zone" string
        |> optional "specialResidentialArea" string ""
        |> optional "hazardFaultLineArea" string ""


decodeStandards : Decode.Decoder (List Standard)
decodeStandards =
    Decode.list decodeStandard


decodeStandard : Decode.Decoder Standard
decodeStandard =
    Decode.succeed Standard
        |> required "key" string
        |> required "description" string
        |> required "name" string
        |> required "questions" (Decode.list decodeQuestion)
        |> required "section" string
        |> optional "activityStatus" string "Unknown"


decodeQuestion : Decode.Decoder Question
decodeQuestion =
    Decode.succeed Question
        |> required "key" string
        |> required "input" decodeInput
        |> required "unit" string


decodeInput : Decode.Decoder Input
decodeInput =
    Decode.field "format" Decode.string
        |> Decode.andThen matchInput


matchInput : String -> Decode.Decoder Input
matchInput format =
    case format of
        "text" ->
            Decode.succeed Text
                |> required "previousAnswer" (nullable string)
                |> required "prompt" string

        "number" ->
            Decode.succeed Number
                |> required "previousAnswer" (nullable int)
                |> required "prompt" string

        "multichoice" ->
            Decode.succeed Multichoice
                |> required "previousAnswer" (nullable string)
                |> required "prompt" string
                |> required "options" (Decode.list string)

        "file" ->
            Decode.succeed File
                |> required "previousAnswer" (nullable string)
                |> required "prompt" string

        _ ->
            Decode.fail ("Invalid format: " ++ format)



-- VIEW


view : Model -> Html Msg
view model =
    let
        errorMessage e =
            div [ class "error-message" ] [ text e ]
    in
    div [ id "container" ]
        [ div [ class "errors" ] (List.map errorMessage model.errors)
        , renderSidebar model.standards model.status
        , renderContent model
        ]


renderSidebar : List Standard -> Status -> Html msg
renderSidebar standards status =
    let
        sectionButton i s =
            a [ class "standard", href <| "#standard-" ++ String.fromInt i ]
                [ text s.name ]

        statusToString =
            case status of
                Permitted ->
                    "Permitted"

                Controlled ->
                    "Controlled"

                DiscretionaryRestricted ->
                    "Discretionary Restricted"

                DiscretionaryUnrestricted ->
                    "Discretionary Unrestricted"

                NonCompliant ->
                    "Non-compliant"

                Unknown ->
                    "Status unknown: You'll need to provide more information."

        statusBox =
            div [ class "status" ] [ text statusToString ]
    in
    div [ id "sidebar" ]
        [ h1 [] [ text "RuBRIC" ]
        , h3 [ class "subtitle" ] [ text "A Proof of Concept" ]
        , div [ class "standards" ] <|
            List.indexedMap sectionButton standards
        , statusBox
        ]


renderContent : Model -> Html Msg
renderContent model =
    let
        activitySelect =
            div [ class "question" ]
                [ label [ for "activity-select" ]
                    [ text "What do you want to do?" ]
                , select [ id "activity-select", onInput SelectActivity ] <|
                    option [ hidden True, disabled True, selected True ] [ text "Select an activity..." ]
                        :: List.map (\a -> option [ value a ] [ text a ]) model.activities
                ]

        propertySelect =
            let
                propertyTable =
                    case model.selectedProperty of
                        Just p ->
                            input [ class "property-input", readonly True, value p.fullAddress ] []

                        Nothing ->
                            input [ class "property-input", readonly True, placeholder "Please use the map to select a property..." ] []
            in
            div [ class "question" ]
                [ label [ for "property-select" ]
                    [ text "What is the address of the property?" ]
                , div [ id "map" ] []
                , propertyTable
                ]

        displayStandards i s =
            details [ class "standards", id <| "standards-" ++ String.fromInt i, attribute "open" "true" ]
                [ summary [] [ text <| s.name ++ " [Status: " ++ s.status ++ "]" ]
                , div [ class "questions" ] <|
                    List.map (displayQuestion s) s.questions
                ]

        displayQuestion s q =
            case q.input of
                Text a p ->
                    div [ class "question" ]
                        [ label [ for q.key ] [ text <| unescape p ]
                        , input
                            [ id q.key
                            , type_ "text"
                            , value <| Maybe.withDefault "" a
                            , onInput (InputAnswer s q)
                            ]
                            []
                        ]

                Number a p ->
                    div [ class "question" ]
                        [ label [ for q.key ] [ text <| unescape p ]
                        , input
                            [ id q.key
                            , type_ "number"
                            , value <| Maybe.map String.fromInt >> Maybe.withDefault "" <| a
                            , onInput (InputAnswer s q)
                            ]
                            []
                        ]

                Multichoice a p ops ->
                    div [ class "question" ]
                        [ label [ for q.key ] [ text <| unescape p ]
                        , input
                            [ id q.key
                            , type_ "text"
                            , value <| Maybe.withDefault "" a
                            , onInput (InputAnswer s q)
                            ]
                            []
                        ]

                File a p ->
                    div [ class "question" ]
                        [ label [ for q.key ] [ text <| unescape p ]
                        , input
                            [ id q.key
                            , type_ "file"
                            , value <| Maybe.withDefault "" a
                            , onInput (InputAnswer s q)
                            ]
                            []
                        ]

        submitButton =
            div [ class "button", onClick AskRubric ]
                [ text "Ask Rubric" ]
    in
    div [ id "content" ]
        [ h1 [] [ text "Submit a Building & Structure Consent Application" ]
        , Html.form [] <|
            [ activitySelect, propertySelect ]
                ++ List.indexedMap displayStandards model.standards
                ++ [ submitButton ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch [ selectMapProperty SelectMapProperty, receiveStandards ReceiveStandards ]



-- MAIN


main : Program (List String) Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }



-- HELPERS


addError : String -> Cmd Msg
addError s =
    AddError s
        |> Task.succeed
        |> Task.perform identity


delay : Float -> msg -> Cmd msg
delay time msg =
    Process.sleep time
        |> Task.perform (\_ -> msg)

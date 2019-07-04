port module Main exposing (Model)

import Browser
import Browser.Navigation as Nav
import ElmEscapeHtml exposing (escape, unescape)
import FeatherIcons
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Json.Decode as Decode exposing (Decoder, float, int, nullable, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode
import List.Extra as ListX
import Process
import Task



-- MODEL


type alias Model =
    { selectedProperty : Maybe Property
    , standards : List Standard
    , status : Status
    , errors : List String
    }


type alias Property =
    { fullAddress : String
    , streetNumber : String
    , streetName : String
    , suburb : String
    , postCode : String
    , title : String
    , valuationId : String
    , valuationWufi : Int
    , dpZone : String
    }


type alias Standard =
    { id : String
    , name : String
    , questions : List Question
    }


type alias Question =
    { id : String
    , prompt : String
    , input : String
    , value : Maybe String
    }


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
    | SelectMapProperty Decode.Value
    | ReceiveStandards Decode.Value
    | GenerateStandards


init : () -> ( Model, Cmd Msg )
init flags =
    let
        model =
            { selectedProperty = Nothing
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

        GenerateStandards ->
            case model.selectedProperty of
                Just p ->
                    ( model, generateStandards <| encodeProperty p )

                Nothing ->
                    ( model, addError "You need to select a property first!" )


encodeProperty : Property -> Encode.Value
encodeProperty p =
    Encode.object
        [ ( "full_address", Encode.string p.fullAddress )
        , ( "valuation_wufi", Encode.int p.valuationWufi )
        , ( "dp_zone", Encode.string p.dpZone )
        ]


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
        |> required "dpZone" string


decodeStandards : Decode.Decoder (List Standard)
decodeStandards =
    Decode.list decodeStandard


decodeStandard : Decode.Decoder Standard
decodeStandard =
    Decode.succeed Standard
        |> required "id" string
        |> required "name" string
        |> required "questions" (Decode.list decodeQuestion)


decodeQuestion : Decode.Decoder Question
decodeQuestion =
    Decode.succeed Question
        |> required "id" string
        |> required "prompt" string
        |> required "input" string
        |> optional "value" (nullable string) Nothing



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
        testActivities =
            [ "Activity A"
            , "Activity B"
            , "Activity C"
            ]

        activitySelect =
            div [ class "question" ]
                [ label [ for "activity-select" ]
                    [ text "What do you want to do?" ]
                , input [ id "activity-select", list "activities" ] []
                , datalist [ id "activities" ] (List.map (\a -> option [ value a ] []) testActivities)
                ]

        propertySelect =
            let
                propertyTable =
                    case model.selectedProperty of
                        Just p ->
                            ul [ class "property-table" ]
                                [ li [] [ text <| "Full Address: " ++ p.fullAddress ]
                                , li [] [ text <| "Title: " ++ p.title ]
                                , li [] [ text <| "ValuationID: " ++ p.valuationId ]
                                , li [] [ text <| "ValuationWUFI: " ++ String.fromInt p.valuationWufi ]
                                , li [] [ text <| "DP Zone: " ++ p.dpZone ]
                                ]

                        Nothing ->
                            div [ class "property-table" ]
                                [ text "Please use the map to select a property." ]
            in
            div [ class "question" ]
                [ label [ for "property-select" ]
                    [ text "What is the address of the property?" ]
                , div [ id "map" ] []
                , propertyTable
                ]

        displayStandards i s =
            details [ class "standards", id <| "standards-" ++ String.fromInt i, attribute "open" "true" ]
                [ summary [] [ text s.name ]
                , div [ class "questions" ] <|
                    List.map displayQuestion s.questions
                ]

        displayQuestion q =
            div [ class "question" ]
                [ label [ for q.id ] [ text <| unescape q.prompt ]
                , input [ id q.id, type_ q.input ] []
                ]

        submitButton =
            div [ class "button", onClick GenerateStandards ]
                [ text "Generate Standards" ]
    in
    div [ id "content" ]
        [ h1 [] [ text "Submit an Application" ]
        , Html.form [] <|
            [ activitySelect, propertySelect ]
                ++ List.indexedMap displayStandards model.standards
                ++ [ submitButton ]
        ]



-- SUBSCRIPTIONS


port selectMapProperty : (Decode.Value -> msg) -> Sub msg


port generateStandards : Encode.Value -> Cmd msg


port receiveStandards : (Decode.Value -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch [ selectMapProperty SelectMapProperty, receiveStandards ReceiveStandards ]



-- MAIN


main : Program () Model Msg
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

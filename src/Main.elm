port module Main exposing (Model)

import Browser
import Browser.Events exposing (onKeyPress)
import Browser.Navigation as Nav
import Dict exposing (Dict)
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
    , sections : List Section
    , status : Status
    , applying : Bool
    , application : List ApplicationSection
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
    , specialResidentialArea : Maybe String
    , hazardFaultLineArea : Maybe String
    , imageUrl : String
    }


type alias Section =
    { key : String
    , description : String
    , name : String
    , section : String
    , questions : List Question
    , results : Results
    , status : Status
    }


type alias Question =
    { key : String
    , input : Input
    , unit : Maybe String
    , prerequisites : List Prerequisite
    }


type alias Results =
    { status : Status
    , rules : List Rule
    , standards : List Standard
    , conditions : List Rule
    }


type alias Rule =
    { key : String
    , mattersOfDiscretion : List String
    , activityStatus : Status
    , status : String
    , title : String
    , definition : Maybe String
    }


type alias Standard =
    { key : String
    , engineRule : String
    , status : String
    , value : String
    , title : String
    , definition : Maybe String
    }


type alias Condition =
    { key : String
    , mattersOfDiscretion : List String
    , activityStatus : Status
    , status : String
    , title : String
    , definition : Maybe String
    }


type Input
    = Text (Maybe String) String
    | Number (Maybe Int) String
    | Multichoice (Maybe String) String (List String)
    | File (Maybe String) String


type alias Prerequisite =
    { field : String
    , operator : String
    , value : String
    }


type Status
    = Permitted
    | Controlled
    | DiscretionaryRestricted
    | DiscretionaryUnrestricted
    | NonCompliant
    | Unknown


type alias ApplicationSection =
    { name : String
    , info : Maybe String
    , questions : List ApplicationQuestion
    }


type alias ApplicationQuestion =
    { key : String
    , input : Input
    , question : String
    , help : Maybe String
    }


type Msg
    = NoOp
    | SelectActivity Activity
    | SelectMapProperty Decode.Value
    | ReceiveSections Decode.Value
    | InputAnswer Section Question String
    | AskRubric
    | ToggleApplication


init : List String -> ( Model, Cmd Msg )
init flags =
    let
        model =
            { activities = flags
            , selectedActivity = Nothing
            , selectedProperty = Nothing
            , sections = []
            , status = Unknown
            , applying = False
            , application = []
            }
    in
    ( model, Cmd.none )



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

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
                    ( model, Cmd.none )

        ReceiveSections val ->
            case Decode.decodeValue decodeSections val of
                Ok s ->
                    ( { model | sections = s }, Cmd.none )

                Err err ->
                    let
                        debug =
                            Debug.log "Error decoding section: " <|
                                Decode.errorToString err
                    in
                    ( model, Cmd.none )

        InputAnswer section question answer ->
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

                updateSection s =
                    { s | questions = ListX.updateIf (\q -> q.key == question.key) updateQuestion s.questions }

                newSections =
                    ListX.updateIf (\s -> s.key == section.key) updateSection model.sections
            in
            ( { model | sections = newSections }, Cmd.none )

        AskRubric ->
            case ( model.selectedActivity, model.selectedProperty ) of
                ( Just a, Just p ) ->
                    ( model, askRubric <| encodePayload a p (answerDictionary model.sections) )

                _ ->
                    ( model, Cmd.none )

        ToggleApplication ->
            ( { model | applying = not model.applying, application = createApplication model }, Cmd.none )



-- INTEROP


port selectMapProperty : (Decode.Value -> msg) -> Sub msg


port askRubric : Encode.Value -> Cmd msg


port receiveSections : (Decode.Value -> msg) -> Sub msg


encodePayload : Activity -> Property -> Dict String Input -> Encode.Value
encodePayload activity property answers =
    Encode.object
        [ ( "scenario", encodeProposal activity property )
        , ( "answers", encodeAnswers answers )
        ]


encodeProposal : Activity -> Property -> Encode.Value
encodeProposal a p =
    Encode.object
        [ ( "activity", Encode.string a )
        , ( "address", Encode.string p.fullAddress )
        , ( "valuation_wufi", Encode.int p.valuationWufi )
        , ( "zone", Encode.string p.zone )
        , ( "area_specific_layers", Encode.string (Maybe.withDefault "" p.specialResidentialArea) )
        , ( "hazard_fault_line_area", Encode.string (Maybe.withDefault "" p.hazardFaultLineArea) )
        ]


encodeAnswers : Dict String Input -> Encode.Value
encodeAnswers answers =
    let
        encodeAnswer _ input =
            getInputAnswer input

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
    answers
        |> Dict.map encodeAnswer
        |> Dict.toList
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
        |> optional "specialResidentialArea" (Decode.maybe string) Nothing
        |> optional "hazardFaultLineArea" (Decode.maybe string) Nothing
        |> required "imageUrl" string


decodeSections : Decode.Decoder (List Section)
decodeSections =
    Decode.list decodeSection


decodeSection : Decode.Decoder Section
decodeSection =
    Decode.succeed Section
        |> required "key" string
        |> required "description" string
        |> required "name" string
        |> required "section" string
        |> required "questions" (Decode.list decodeQuestion)
        |> required "results" decodeResults
        |> optional "activityStatus" decodeStatus Unknown


decodeQuestion : Decode.Decoder Question
decodeQuestion =
    Decode.succeed Question
        |> required "key" string
        |> required "input" decodeInput
        |> required "unit" (nullable string)
        |> required "prerequisites" (Decode.list decodePrerequisite)


decodeResults : Decode.Decoder Results
decodeResults =
    Decode.succeed Results
        |> required "activityStatus" decodeStatus
        |> required "rules" (Decode.list decodeRule)
        |> required "standards" (Decode.list decodeStandard)
        |> required "conditions" (Decode.list decodeRule)


decodeRule : Decode.Decoder Rule
decodeRule =
    Decode.succeed Rule
        |> required "key" string
        |> required "matters_of_discretion" (Decode.list string)
        |> required "activityStatus" decodeStatus
        |> required "status" string
        |> required "title" string
        |> required "definition" (nullable string)


decodeStandard : Decode.Decoder Standard
decodeStandard =
    Decode.succeed Standard
        |> required "key" string
        |> required "engine_rule" string
        |> required "status" string
        |> required "value" string
        |> required "title" string
        |> required "definition" (nullable string)


decodeCondition : Decode.Decoder Condition
decodeCondition =
    Decode.succeed Condition
        |> required "key" string
        |> required "matters_of_discretion" (Decode.list string)
        |> required "activityStatus" decodeStatus
        |> required "status" string
        |> required "title" string
        |> required "definition" (nullable string)


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


decodePrerequisite : Decode.Decoder Prerequisite
decodePrerequisite =
    Decode.succeed Prerequisite
        |> required "field" string
        |> required "operator" string
        |> required "value" string


decodeStatus : Decode.Decoder Status
decodeStatus =
    nullable string
        |> Decode.andThen
            (\status ->
                case status of
                    Just "Controlled" ->
                        Decode.succeed Controlled

                    Just "Discretionary Restricted" ->
                        Decode.succeed DiscretionaryRestricted

                    Just "Discretionary Unrestricted" ->
                        Decode.succeed DiscretionaryUnrestricted

                    Just "Non-complying" ->
                        Decode.succeed NonCompliant

                    Just "Permitted" ->
                        Decode.succeed Permitted

                    _ ->
                        Decode.succeed Unknown
            )



-- VIEW


view : Model -> Html Msg
view model =
    let
        hero =
            div [ class "py-5 text-center" ]
                [ img [ class "d-block mx-auto mb-4", src "logo.png", width 72, height 72 ] []
                , h2 [] [ text "Apply for a Resource Consent" ]
                , p [ class "lead" ]
                    [ text
                        """
                        This Proof of Concept tool provides an indication of your proposal's compliance
                        with the District Plan. Results must be verified by a Council Planner. Council
                        accepts no responsibility of liability for the public's use or misuse of this tool.
                        """
                    ]
                ]
    in
    div [ id "home", class "container" ]
        [ hero
        , div [ class "row mb-5" ]
            [ renderSidebar model.sections model.selectedProperty
            , renderContent model
            ]
        ]


renderSidebar : List Section -> Maybe Property -> Html Msg
renderSidebar sections prop =
    let
        sectionGroup index section =
            let
                statusClass s =
                    "list-group-item-" ++ statusToClass s

                sectionItem =
                    a
                        [ class <| "list-group-item list-group-item-action d-flex justify-content-between align-items-center " ++ statusClass section.results.status
                        , href <| "#section-" ++ String.fromInt index
                        ]
                        [ div [] [ h6 [ class "my-0" ] [ text section.name ] ]
                        , div [] [ small [] [ text <| statusToString section.results.status ] ]
                        ]

                item i =
                    a [ class "list-group-item list-group-item-action d-flex justify-content-between align-items-center py-1" ]
                        [ div []
                            [ small [] [ text <| formatKey i.key ]
                            , h6 [ class "my-0" ] [ text <| i.title ]
                            ]
                        , div [] []
                        ]
            in
            div [ class "list-group mb-3" ] <|
                sectionItem
                    :: List.map item section.results.rules
                    ++ List.map item section.results.conditions
                    ++ List.map item section.results.standards

        preapp =
            div [ class "card" ]
                [ div [ class "card-body" ]
                    [ h5 [ class "card-title" ] [ text "Having trouble?" ]
                    , p [ class "card-text" ]
                        [ text "A Council Planner can help you through the process in a meeting." ]
                    , a
                        [ href "https://www.surveygizmo.com/s3/1550552/Resource-Consent-Pre-application-Meeting-Registration"
                        , target "_blank"
                        , class "card-link"
                        ]
                        [ text "Request a Pre-Application Meeting" ]
                    ]
                ]
    in
    div [ class "col-md-4 order-md-2" ]
        [ div [ class "sticky-top py-3 vh-100 d-flex flex-column" ]
            [ h4 [ class "d-flex justify-content-between align-items-center mb-3" ]
                [ span [ class "text-muted" ] [ text "Summary of Compliance" ]
                , span [ class "text-muted badge" ]
                    [ text <| String.fromInt (List.length sections) ]
                ]
            , List.indexedMap sectionGroup sections
                |> ul [ class "list-group overflow-auto mb-3" ]
            , preapp
            ]
        ]


renderContent : Model -> Html Msg
renderContent model =
    let
        continueButton =
            let
                btn switch =
                    div [ class "row" ]
                        [ div [ class "col-md-8" ]
                            [ a
                                [ class "btn btn-primary btn-block btn-lg"
                                , onClick AskRubric
                                , classList [ ( "disabled", switch ) ]
                                , tabindex -1
                                ]
                                [ text "Determine your Compliance" ]
                            ]
                        , div [ class "col-md-4" ]
                            [ a
                                [ href "#home"
                                , class "btn btn-success btn-block btn-lg"
                                , onClick ToggleApplication
                                , classList [ ( "disabled", switch ) ]
                                , tabindex -1
                                ]
                                [ text "Apply" ]
                            ]
                        ]
            in
            case ( model.selectedActivity, model.selectedProperty ) of
                ( Just _, Just _ ) ->
                    [ btn False ]

                ( Just _, Nothing ) ->
                    [ div [ class "text-muted text-center mb-3" ] [ text "You need to select a property before continuing." ]
                    , btn True
                    ]

                ( Nothing, Just _ ) ->
                    [ div [ class "text-muted text-center mb-3" ] [ text "You need to select an activity before continuing." ]
                    , btn True
                    ]

                ( Nothing, Nothing ) ->
                    [ div [ class "text-muted text-center mb-3" ] [ text "You need to select a property and an activity before continuing." ]
                    , btn True
                    ]

        compliance =
            Html.form [] <|
                renderProposal model.activities model.selectedProperty
                    :: List.indexedMap (renderSection <| answerDictionary model.sections) model.sections
                    ++ continueButton

        content =
            if model.applying then
                case ( model.selectedActivity, model.selectedProperty ) of
                    ( Just a, Just p ) ->
                        renderApplicationForm model.application

                    _ ->
                        compliance

            else
                compliance
    in
    div [ class "col-md-8 order-md-1" ] [ content ]


renderProposal : List Activity -> Maybe Property -> Html Msg
renderProposal activities selectedProperty =
    let
        activitySelect =
            div [ class "mb-3" ]
                [ label [ for "activity-select" ]
                    [ text "What do you want to do?" ]
                , select [ id "activity-select", class "form-control", onInput SelectActivity ] <|
                    option [ hidden True, disabled True, selected True ] [ text "Select an activity..." ]
                        :: List.map (\a -> option [ value a ] [ text a ]) activities
                ]

        propertySelect =
            let
                propertyTable =
                    case selectedProperty of
                        Just p ->
                            input [ class "form-control", readonly True, value p.fullAddress ] []

                        Nothing ->
                            input [ class "form-control", readonly True, placeholder "Please use the map to select a property..." ] []
            in
            div [ class "mb-3" ]
                [ label [ for "property-select" ]
                    [ text "What is the address of the property?" ]
                , div [ id "search-widget" ] []
                , div [ id "map" ] []
                , propertyCard
                ]

        propertyCard =
            case selectedProperty of
                Just p ->
                    let
                        row k v =
                            div [ class "row align-items-end" ]
                                [ div [ class "col-md-6 font-weight-bold" ] [ text k ]
                                , div [ class "col-md-6" ] [ text v ]
                                ]

                        maybeRow k maybev =
                            case maybev of
                                Just v ->
                                    div [ class "row align-items-end" ]
                                        [ div [ class "col-md-6 font-weight-bold" ] [ text k ]
                                        , div [ class "col-md-6" ] [ text v ]
                                        ]

                                Nothing ->
                                    div [] []
                    in
                    div [ class "card my-3" ]
                        [ div [ class "row no-gutters" ]
                            [ div [ class "col-md-4" ]
                                [ img [ src p.imageUrl, class "cover" ] [] ]
                            , div [ class "col-md-8" ]
                                [ div [ class "card-body" ]
                                    [ h5 [ class "card-title mb-3" ] [ text p.fullAddress ]
                                    , row "Suburb" p.suburb
                                    , row "PostCode" p.postCode
                                    , row "Title" p.title
                                    , row "Valuation ID" p.valuationId
                                    , row "Zone" p.zone
                                    , maybeRow "Special Residential Area" p.specialResidentialArea
                                    , maybeRow "Hazard (Fault Line) Area" p.hazardFaultLineArea
                                    ]
                                ]
                            ]
                        ]

                Nothing ->
                    div [] []
    in
    div [ id "proposal" ]
        [ h4 [] [ text "Proposal" ]
        , activitySelect
        , propertySelect
        , hr [ class "mb-4" ] []
        ]


renderSection : Dict String Input -> Int -> Section -> Html Msg
renderSection answers index section =
    let
        unique =
            "section-" ++ String.fromInt index

        ( buttonAttrs, modalDialog ) =
            renderModal (unique ++ "-modal") section.name (text placeholder)

        placeholder =
            List.repeat 500 "placeholder"
                |> String.join " "
    in
    div [ class "sections", id unique ]
        [ h4 [ class "d-flex justify-content-between align-items-center mb-3" ]
            [ span [] [ text section.name ] ]
        , div [ class "questions" ] <|
            List.map (renderQuestion answers section) section.questions
        , hr [ class "mb-4" ] []
        , modalDialog
        ]


renderQuestion : Dict String Input -> Section -> Question -> Html Msg
renderQuestion answers section question =
    let
        met { field, operator, value } =
            case ( Dict.get field answers, operator ) of
                ( Just (Text a _), "equal" ) ->
                    a == Just value

                ( Just (Number a _), "equal" ) ->
                    Maybe.map String.fromInt a == Just value

                ( Just (Multichoice a _ _), "equal" ) ->
                    a == Just value

                _ ->
                    False

        input =
            case question.input of
                Text answer prompt ->
                    textInput
                        (InputAnswer section question)
                        (Maybe.withDefault "" answer)
                        question.key
                        (unescape prompt)
                        Nothing

                Number answer prompt ->
                    numberInput
                        (InputAnswer section question)
                        (answer |> Maybe.map String.fromInt >> Maybe.withDefault "")
                        question.key
                        (unescape prompt)
                        question.unit

                Multichoice answer prompt options ->
                    multichoiceInput
                        (InputAnswer section question)
                        answer
                        question.key
                        (unescape prompt)
                        options

                File answer prompt ->
                    textInput
                        (InputAnswer section question)
                        (Maybe.withDefault "" answer)
                        question.key
                        (unescape prompt)
                        Nothing
    in
    if List.map met question.prerequisites |> List.member False then
        div [] []

    else
        input


renderModal : String -> String -> Html Msg -> ( List (Html.Attribute Msg), Html Msg )
renderModal name modalHeader modalContent =
    let
        title =
            name ++ "-title"

        buttonAttrs =
            [ attribute "data-toggle" "modal"
            , attribute "data-target" ("#" ++ name)
            ]

        header =
            div [ class "modal-header" ]
                [ h5 [ class "modal-title", id title ] [ text modalHeader ]
                , button [ type_ "button", class "close", attribute "data-dismiss" "modal", attribute "aria-label" "Close" ]
                    [ span [ attribute "aria-hidden" "true" ] [ text "×" ] ]
                ]

        body =
            div [ class "modal-body" ] [ modalContent ]

        footer =
            div [ class "modal-footer" ]
                [ button [ type_ "button", class "btn btn-secondary", attribute "data-dismiss" "modal" ] [ text "Close" ] ]

        modalDialog =
            div [ class "modal fade", id name, tabindex -1, attribute "role" "dialog", attribute "aria-labelledby" title ]
                [ div [ class "modal-dialog modal-lg modal-dialog-scrollable", attribute "role" "document" ]
                    [ div [ class "modal-content" ] [ header, body, footer ] ]
                ]
    in
    ( buttonAttrs, modalDialog )


renderApplicationForm : List ApplicationSection -> Html Msg
renderApplicationForm sections =
    let
        renderAppSection { name, info, questions } =
            let
                infoCard =
                    case info of
                        Just i ->
                            div [ class "card mb-3" ]
                                [ div [ class "card-body" ]
                                    [ p [ class "card-text" ] [ text i ] ]
                                ]

                        Nothing ->
                            div [] []
            in
            div []
                [ h4 [ class "d-flex justify-content-between align-items-center mb-3" ]
                    [ span [] [ text name ] ]
                , infoCard
                , div [ class "questions" ] (List.map renderAppQuestion questions)
                , hr [ class "mb-4" ] []
                ]

        renderAppQuestion { key, input, question, help } =
            div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ textInput (\_ -> NoOp) "" key question help ]
                ]

        submitButton =
            button [ type_ "button", class "btn btn-success btn-lg btn-block" ]
                [ text "Submit" ]
    in
    div [] <| List.map renderAppSection sections



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    let
        checkKeycode k =
            if k == "Enter" then
                AskRubric

            else
                NoOp
    in
    Sub.batch
        [ onKeyPress (Decode.map checkKeycode keyDecoder)
        , selectMapProperty SelectMapProperty
        , receiveSections ReceiveSections
        ]



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


textInput : (String -> Msg) -> String -> String -> String -> Maybe String -> Html Msg
textInput message answer key prompt help =
    let
        helpDiv =
            case help of
                Just h ->
                    div [ class "small text-muted mb-2" ] [ text h ]

                Nothing ->
                    div [] []
    in
    div [ class "mb-3" ]
        [ label [ for key, class "mb-0" ] [ text prompt ]
        , helpDiv
        , input
            [ id key
            , class "form-control"
            , type_ "text"
            , value answer
            , onInput message
            ]
            []
        ]


numberInput : (String -> Msg) -> String -> String -> String -> Maybe String -> Html Msg
numberInput message answer key prompt unit =
    let
        appendUnit =
            case unit of
                Just u ->
                    div [ class "input-group-append" ]
                        [ span [ class "input-group-text" ] [ text u ] ]

                Nothing ->
                    div [] []
    in
    div [ class "mb-3" ]
        [ label [ for key ] [ text prompt ]
        , div [ class "input-group" ]
            [ input
                [ id key
                , class "form-control"
                , type_ "number"
                , value answer
                , onInput message
                ]
                []
            , appendUnit
            ]
        ]


multichoiceInput : (String -> Msg) -> Maybe String -> String -> String -> List String -> Html Msg
multichoiceInput message answer key prompt options =
    let
        radioButton o =
            div [ class "form-check form-check-inline" ]
                [ input [ type_ "radio", value o, id <| key ++ o, class "form-check-input", onInput message, checked (answer == Just o) ] []
                , label [ for <| key ++ o, class "form-check-label" ] [ text o ]
                ]
    in
    div [ class "mb-3" ]
        [ label [] [ text prompt ]
        , div [] (List.map radioButton options)
        ]


checkboxInput : Msg -> Bool -> String -> String -> Html Msg
checkboxInput message switch key prompt =
    div [ class "mb-3" ]
        [ label [ for key ] [ text prompt ]
        , input
            [ id key
            , class "form-control"
            , type_ "checkbox"
            , checked switch
            , onClick message
            ]
            []
        ]


personalDetails : String -> List (Html Msg)
personalDetails key =
    [ div [ class "row" ]
        [ div [ class "col-md-6" ]
            [ textInput (\_ -> NoOp) "" (key ++ "-fname") "First Name" Nothing ]
        , div [ class "col-md-6" ]
            [ textInput (\_ -> NoOp) "" (key ++ "-lname") "Last Name" Nothing ]
        ]
    , div [ class "row" ]
        [ div [ class "col-md-12" ]
            [ textInput (\_ -> NoOp) "" (key ++ "-address") "Postal Address" Nothing ]
        ]
    , div [ class "row" ]
        [ div [ class "col-md-6" ]
            [ textInput (\_ -> NoOp) "" (key ++ "-phone") "Phone (day)" Nothing ]
        , div [ class "col-md-6" ]
            [ textInput (\_ -> NoOp) "" (key ++ "-mobile") "Mobile" Nothing ]
        ]
    , div [ class "row" ]
        [ div [ class "col-md-12" ] [ textInput (\_ -> NoOp) "" (key ++ "-email") "E-mail" Nothing ]
        ]
    ]


statusToString : Status -> String
statusToString status =
    case status of
        Controlled ->
            "Controlled"

        DiscretionaryRestricted ->
            "Discretionary Restricted"

        DiscretionaryUnrestricted ->
            "Discretionary Unrestricted"

        NonCompliant ->
            "Non-complying"

        Permitted ->
            "Permitted"

        Unknown ->
            "Status Unknown"


statusToClass : Status -> String
statusToClass status =
    case status of
        Controlled ->
            "warning"

        DiscretionaryRestricted ->
            "info"

        DiscretionaryUnrestricted ->
            "info"

        NonCompliant ->
            "danger"

        Permitted ->
            "success"

        Unknown ->
            "light"


formatKey : String -> String
formatKey key =
    String.replace "_" "." key


answerDictionary : List Section -> Dict String Input
answerDictionary sections =
    List.foldl (\s l -> s.questions ++ l) [] sections
        |> List.map (\q -> ( q.key, q.input ))
        |> Dict.fromList


keyDecoder : Decode.Decoder String
keyDecoder =
    Decode.field "key" string



-- APPLICATION


createApplication : Model -> List ApplicationSection
createApplication model =
    let
        personalDetailQuestions key =
            [ ApplicationQuestion (key ++ "-fname") (Text Nothing "") "First Name" Nothing
            , ApplicationQuestion (key ++ "-lname") (Text Nothing "") "Last Name" Nothing
            , ApplicationQuestion (key ++ "-address") (Text Nothing "") "Postal Address" Nothing
            , ApplicationQuestion (key ++ "-phone") (Text Nothing "") "Phone (day)" Nothing
            , ApplicationQuestion (key ++ "-mobile") (Text Nothing "") "Mobile" Nothing
            , ApplicationQuestion (key ++ "-email") (Text Nothing "") "E-mail" Nothing
            ]

        propertyInformation =
            ApplicationSection "Property Information"
                Nothing
                [ ApplicationQuestion "property-image" (Text Nothing "") "Image" Nothing
                , ApplicationQuestion "property-address" (Text Nothing "") "Address" Nothing

                --, ApplicationQuestion "property-wufi" (Text Nothing "") "WUFI" Nothing
                --, ApplicationQuestion "property-zone" (Text Nothing "") "Zone" Nothing
                , ApplicationQuestion "property-legal-description" (Text Nothing "") "Legal Description of the Site for this Application" Nothing
                , ApplicationQuestion "property-aka" (Text Nothing "") "Any Other Commonly Known Names of the Site" Nothing
                , ApplicationQuestion "property-description" (Text Nothing "") "Site Description" <|
                    Just
                        """
                        Describe the site including its natural and physical characteristics and any adjacent
                        uses that may be relevant to the consideration of the application.
                        """
                ]

        consentType =
            ApplicationSection "Consent Type"
                Nothing
                [ ApplicationQuestion "consent-type" (Text Nothing "") "Consent Type" Nothing
                , ApplicationQuestion "consent-type-activity" (Text Nothing "") "Proposed Activity" Nothing
                , ApplicationQuestion "consent-type-activity-status" (Text Nothing "Prefilled") "Overall Activity Status" <|
                    Just
                        """
                        This status is indicative only, and must be verified by a Council Planner.
                        """
                , ApplicationQuestion "consent-type-fast-track" (Text Nothing "") "Fast-track Consent" <|
                    Just
                        """
                        I opt out / do not opt out of the fast track consent process
                        """
                ]

        applicantDetails =
            ApplicationSection "Applicant Details" Nothing (personalDetailQuestions "applicant")

        agentDetails =
            ApplicationSection "Agent Details" Nothing (personalDetailQuestions "agent")

        ownerDetails =
            ApplicationSection "Owner Details" Nothing (personalDetailQuestions "owner")

        occupierDetails =
            ApplicationSection "Occupier Details" Nothing (personalDetailQuestions "occupier")

        descriptionOfProposedActivity =
            ApplicationSection "Description of Proposed Activity"
                Nothing
                [ ApplicationQuestion "activity-description" (Text Nothing "") "Description of Activity" <|
                    Just
                        """
                        Clearly describe the proposal to which this application relates.
                        """
                ]

        otherResourceConsents =
            ApplicationSection "Other Resource Consents"
                Nothing
                [ ApplicationQuestion "other-consents" (Text Nothing "") "Are there any other resource consents required/granted from any consent authority for this activity?" <|
                    Just
                        """
                        Applicant to check with Greater Wellington Regional Council to confirm this.
                        """
                , ApplicationQuestion "other-consents-details" (Text Nothing "") "Detail of other resource consents required" <|
                    Just
                        """
                        A statement specifying all other resource consents that the applicant may require
                        from any consent authority in respect of the activity to which the application relates,
                        and whether or not the applicant has applied for such consents.
                        """
                ]

        supportingInformation =
            ApplicationSection "Supporting Information"
                (Just """
                To satisfy the requirement of Section 88(2) of the Resource Management Act 1991
                and rule 3.2.2 in the District Plan. If all of the required information is not
                provided we may be unable to accept your application and it will be returned to you.
                """)
                [ ApplicationQuestion "supporting-info-consideration" (Text Nothing "") "Matters for consideration for the Assessment of Environmental Effects" <|
                    Just
                        """
                        As determined by your answers to questions about the proposed activity in
                        relation to the standards in the District Plan, below are the matters for
                        consideration for the Assessment of Environmental Effects:

                        [insert from RuBRIC the matters for consideration] 
                        """
                , ApplicationQuestion "supporting-ingo-aee" (Text Nothing "") "Assessment of Environmental Effects" <|
                    Just
                        """
                        The Assessment of Environmental Effects (AEE) is an assessment of any actual
                        or potential effects that the activity may have on the environment, and the ways
                        in which any adverse effects may be mitigated, as per Section 88(6) of the
                        Resource Management Act 1991.
                        """
                , ApplicationQuestion "supporting-info-rma" (Text Nothing "") "Assessment against Part 2 of the RMA Matters" <|
                    Just
                        """
                        Assess the consistency of the effects of your proposal against Part 2 of the Resource Management Act 1991
                        [link on the text 'Resource Management Act 1991'
                        http://legislation.govt.nz/act/public/1991/0069/latest/DLM230265.html?search=qs_act%40bill%40regulation%40deemedreg_resource+management+act+part+2_resel_25_h&p=1]
                        """
                , ApplicationQuestion "supporting-info-planning-docs" (Text Nothing "") "Assessment against Relevant Objectives and Policies and Provisions of other Planning Documents" <|
                    Just
                        """
                        Assess the consistency of the effects of your proposal against objectives and policies from
                        the District Plan AND against any relevant planning documents in section 104(1)(b) of the
                        Resource Management Act 1991. See the guidance for further details [link to the guidance pop up]
                        """
                , ApplicationQuestion "supporting-info-title-records" (Text Nothing "") "Current copies of all Records of Title for the Subject Site" <|
                    Just
                        """
                        A 'current' record of title is one that has been issued by Land Information New Zealand within the last 3 months,
                        including any relevant consent notice(s) registered on the computer register, or any encumbrances or any other registered
                        instruments, such as right of way documents, esplanade instruments, etc.
                        """
                , ApplicationQuestion "supporting-info-plan-scale" (Text Nothing "") "Site Plan Scale" Nothing
                , ApplicationQuestion "supporting-info-plan-existing-detail" (Text Nothing "") "Site Plan Existing Detail" Nothing
                , ApplicationQuestion "supporting-info-plan-proposed-detail" (Text Nothing "") "Site Plan Proposed Detail" Nothing
                , ApplicationQuestion "supporting-info-elevation-drawings" (Text Nothing "") "Elevation Drawings" Nothing
                , ApplicationQuestion "supporting-info-other-info" (Text Nothing "") "Other Information which may be required by the District Plan" Nothing
                , ApplicationQuestion "supporting-info-party-approval" (Text Nothing "") "Written Approvals from Affected Parties" Nothing
                ]

        nationalEnvironmentalStandard =
            ApplicationSection "National Environmental Standard"
                (Just """
                This site may be subject to or covered by the the NES for Assessing and Managing Contaminants
                in Soil to Protect Human Health Regulations 2011. This is determined by reference to the Hazardous
                Activities and Industries List (HAIL) which identifies those activities and industries which are
                more likely to use or store hazardous substances and therefore have a greater probability of site
                contamination. A full list can be found on the Ministry for the Environment's website [link for text 'Ministry
                for the Environment's website' https://www.mfe.govt.nz/land/hazardous-activities-and-industries-list-hail]
                """)
                [ ApplicationQuestion "nes-hail" (Text Nothing "") "Has the piece of land subject to this application been used for (including its present use), or is it more likely than not to have been used for an activity on the Hazardous Activities and Industries List (HAIL)?" <|
                    Just
                        """
                        If 'Yes', and your application involves subdividing or changing the use of the land, sampling
                        or disturbing soil, or removing or replacing a fuel storage system, then the NES may apply and
                        you may need to seek consent for this concurrently in your application.
                        """
                , ApplicationQuestion "nes-assessment" (Text Nothing "") "Assessment against the NES" Nothing
                ]

        siteVisit =
            ApplicationSection "Site Visit"
                (Just """
                In order to assess your application it will generally be necessary for the Council Planner to visit your site.
                This typically involves an outdoor inspection only, and there is no need for you to be home for this purpose.
                """)
                [ ApplicationQuestion "site-visit-security" (Text Nothing "") "Are there any locked gates, security systems or anything else restricting access by Council?" Nothing
                , ApplicationQuestion "site-visit-dogs" (Text Nothing "") "Are there any dogs on the property?" Nothing
                , ApplicationQuestion "site-visit-notice" (Text Nothing "") "Do you require notice prior to the site visit?" Nothing
                , ApplicationQuestion "site-visit-safety" (Text Nothing "") "Are there any other Health and Safety requirements Council staff should be aware of before visiting the site. If so, please describe." Nothing
                ]

        declaration =
            ApplicationSection "Declaration for the Agent of Authorised Agent or Other"
                Nothing
                [ ApplicationQuestion "application-name" (Text Nothing "") "Name of the Person Submitting this Form" Nothing
                , ApplicationQuestion "declaration-declaration" (Text Nothing "") "Declaration" <|
                    Just
                        """
                        I confirm that I have read and understood the notes for the applicant.
                        [link to the guidance pop up on the text 'notes for the applicant']
                        """
                ]

        declarationOnBehalf =
            ApplicationSection "Declaration for the Agent Authorised to Sign on Behalf of the Applicant"
                Nothing
                [ ApplicationQuestion "authorised-declaration-name" (Text Nothing "") "Full Name of Agent" Nothing
                , ApplicationQuestion "authorised-declaration-declaration" (Text Nothing "") "Declaration for Agent" <|
                    Just
                        """
                        As authorised agent for the applicant, I confirm that I have read and understood
                        the notes for the applicant [link to the guidance pop up on the text 'notes for
                        the applicant'] and confirm that I have fully informed the applicant of their/its
                        liability under this application, including for fees and other charges, and that
                        I have the applicant's authority to submit this application on their/its behalf.
                        """
                ]

        fees =
            ApplicationSection "Fees"
                (Just """
                An initial fee must be paid before we can process your application.
                The initial fee due for this non-notified land use consent is: $1650
                """)
                [ ApplicationQuestion "fees-method" (Text Nothing "") "Payment Method" Nothing
                , ApplicationQuestion "fees-declaration" (Text Nothing "") "Declaration for Initial Fee" <|
                    Just
                        """
                        I confirm that I have read and understood the fee payment terms, conditions and
                        declaration for the service of applying for a resource consent [link to guidance
                        on text 'fee payment terms, conditions and declaration']
                        """
                ]

        additionalInvoices =
            ApplicationSection "Additional Invoices" Nothing <|
                [ ApplicationQuestion "additional-invoices-send" (Text Nothing "") "Payment Method" Nothing ]
                    ++ personalDetailQuestions "additional-invoices"
    in
    [ propertyInformation
    , consentType
    , applicantDetails
    , agentDetails
    , ownerDetails
    , occupierDetails
    , descriptionOfProposedActivity
    , otherResourceConsents
    , supportingInformation
    , nationalEnvironmentalStandard
    , siteVisit
    , declaration
    , declarationOnBehalf
    , fees
    , additionalInvoices
    ]

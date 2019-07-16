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


type alias Standard =
    { key : String
    , description : String
    , name : String
    , questions : List Question
    , section : String
    , status : Status
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
                    ( model, Cmd.none )

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

                _ ->
                    ( model, Cmd.none )



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
        , ( "area_specific_layers", Encode.string (Maybe.withDefault "" p.specialResidentialArea) )
        , ( "hazard_fault_line_area", Encode.string (Maybe.withDefault "" p.hazardFaultLineArea) )
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
        |> required "specialResidentialArea" (nullable string)
        |> required "hazardFaultLineArea" (nullable string)
        |> required "imageUrl" string


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
        |> optional "activityStatus" decodeStatus Unknown


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


decodeStatus : Decode.Decoder Status
decodeStatus =
    Decode.string
        |> Decode.andThen
            (\status ->
                case status of
                    "Controlled" ->
                        Decode.succeed Controlled

                    "Discretionary Restricted" ->
                        Decode.succeed DiscretionaryRestricted

                    "Discretionary Unrestricted" ->
                        Decode.succeed DiscretionaryUnrestricted

                    "Non-complying" ->
                        Decode.succeed NonCompliant

                    "Permitted" ->
                        Decode.succeed Permitted

                    unknown ->
                        Decode.fail <| "Unknown status: " ++ unknown
            )



-- VIEW


view : Model -> Html Msg
view model =
    let
        hero =
            div [ class "py-5 text-center" ]
                [ img [ class "d-block mx-auto mb-4", src "logo.png", width 72, height 72 ] []
                , h2 [] [ text "Submit a Resource Consent Application" ]
                , p [ class "lead" ]
                    [ text
                        """
                        This tool is only intended to give an indication of District Plan compliance,
                        and results must be confirmed by a council officer.
                        """
                    ]
                ]
    in
    div [ class "container" ]
        [ hero
        , div [ class "row mb-5" ]
            [ renderSidebar model.standards model.status model.selectedProperty
            , renderContent model
            ]
        ]


renderSidebar : List Standard -> Status -> Maybe Property -> Html Msg
renderSidebar standards status prop =
    let
        listItem i s =
            let
                statusClass =
                    "list-group-item-" ++ statusToClass s.status
            in
            a
                [ class <| "list-group-item list-group-item-action d-flex justify-content-between lh-condensed " ++ statusClass
                , href <| "#standard-" ++ String.fromInt i
                ]
                [ div []
                    [ small [] [ text <| formatKey s.key ]
                    , h6 [ class "my-0" ] [ text s.name ]
                    ]
                , div []
                    [ small [] [ text <| statusToString s.status ]
                    ]
                ]

        scenario =
            a [ class "list-group-item list-group-item-action d-flex justify-content-between lh-condensed", href "#scenario" ]
                [ h6 [ class "my-0" ] [ text "Scenario" ]
                , small [ class "text-muted" ] [ text "Required" ]
                ]

        standardList =
            scenario
                :: List.indexedMap listItem standards
                |> ul [ class "list-group mb-3" ]

        preapp =
            div [ class "card" ]
                [ div [ class "card-body" ]
                    [ h5 [ class "card-title" ] [ text "Having trouble?" ]
                    , p [ class "card-text" ]
                        [ text "A council officer can help you through the process in a meeting." ]
                    , a
                        [ href "https://www.surveygizmo.com/s3/1550552/Resource-Consent-Pre-application-Meeting-Registration"
                        , target "_blank"
                        , class "card-link"
                        ]
                        [ text "Apply for a Pre-Application Meeting" ]
                    ]
                ]
    in
    div [ class "col-md-4 order-md-2" ]
        [ div [ class "sticky-top py-3" ]
            [ h4 [ class "d-flex justify-content-between align-items-center mb-3" ]
                [ span [ class "text-muted" ] [ text "Standards" ]
                , span [ class "text-muted badge" ]
                    [ text <| String.fromInt (List.length standards) ]
                ]
            , standardList
            , preapp
            ]
        ]


renderContent : Model -> Html Msg
renderContent model =
    let
        continueButton =
            case ( model.selectedActivity, model.selectedProperty ) of
                ( Just _, Just _ ) ->
                    [ btn False ]

                ( Just _, Nothing ) ->
                    [ div [ class "text-muted text-center" ] [ text "You need to select a property before continuing." ]
                    , btn True
                    ]

                ( Nothing, Just _ ) ->
                    [ div [ class "text-muted text-center" ] [ text "You need to select an activity before continuing." ]
                    , btn True
                    ]

                ( Nothing, Nothing ) ->
                    [ div [ class "text-muted text-center" ] [ text "You need to select a property and an activity before continuing." ]
                    , btn True
                    ]

        btn off =
            button [ type_ "button", class "btn btn-primary btn-lg btn-block", onClick AskRubric, disabled off ]
                [ text "Continue" ]
    in
    div [ class "col-md-8 order-md-1" ]
        [ Html.form [ attribute "novalidate" "true" ] <|
            renderScenario model.activities model.selectedProperty
                :: List.indexedMap renderStandard model.standards
                ++ continueButton
        ]


renderScenario : List Activity -> Maybe Property -> Html Msg
renderScenario activities selectedProperty =
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
                            div [ class "row" ]
                                [ div [ class "col-md-4 font-weight-bold" ] [ text k ]
                                , div [ class "col-md-8" ] [ text v ]
                                ]

                        maybeRow k maybev =
                            case maybev of
                                Just v ->
                                    div [ class "row" ]
                                        [ div [ class "col-md-4 font-weight-bold" ] [ text k ]
                                        , div [ class "col-md-8" ] [ text v ]
                                        ]

                                Nothing ->
                                    div [] []
                    in
                    div [ class "card my-3" ]
                        [ div [ class "row no-gutters" ]
                            [ div [ class "col-md-4" ]
                                [ img [ src p.imageUrl, style "width" "100%" ] [] ]
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
    div [ id "scenario" ]
        [ h4 [] [ text "Scenario" ]
        , activitySelect
        , propertySelect
        , hr [ class "mb-4" ] []
        ]


renderStandard : Int -> Standard -> Html Msg
renderStandard index standard =
    let
        unique =
            "standard-" ++ String.fromInt index

        ( buttonAttrs, modalDialog ) =
            renderModal (unique ++ "-modal") standard.name (text placeholder)

        placeholder =
            List.repeat 500 "placeholder"
                |> String.join " "
    in
    div [ class "standards", id unique ]
        [ h4 [ class "d-flex justify-content-start align-items-center mb-3" ]
            [ span [] [ text standard.name ]
            , button ([ type_ "button", class "btn mx-2" ] ++ buttonAttrs) [ text "ⓘ" ]
            ]
        , div [ class "questions" ] <|
            List.map (renderQuestion standard) standard.questions
        , hr [ class "mb-4" ] []
        , modalDialog
        ]


renderQuestion : Standard -> Question -> Html Msg
renderQuestion standard question =
    case question.input of
        Text answer prompt ->
            textInput
                (InputAnswer standard question)
                (Maybe.withDefault "" answer)
                question.key
                (unescape prompt)

        Number answer prompt ->
            numberInput
                (InputAnswer standard question)
                (answer |> Maybe.map String.fromInt >> Maybe.withDefault "")
                question.key
                (unescape prompt)
                question.unit

        Multichoice answer prompt options ->
            multichoiceInput
                (InputAnswer standard question)
                answer
                question.key
                (unescape prompt)
                options

        File answer prompt ->
            textInput
                (InputAnswer standard question)
                (Maybe.withDefault "" answer)
                question.key
                (unescape prompt)


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


preAppForm : Html Msg
preAppForm =
    let
        input =
            textInput (\_ -> NoOp) ""

        section title questions =
            div [ class "standards" ]
                [ h4 [ class "d-flex justify-content-start align-items-center mb-3" ]
                    [ span [] [ text title ] ]
                , div [ class "questions" ] questions
                , hr [ class "mb-4" ] []
                ]
    in
    Html.form []
        [ section "Contact Person"
            [ input "name" "Name"
            , input "postalAddress" "Postal Address"
            , input "phone" "Phone (day)"
            , input "mobile" "Mobile"
            , input "email" "E-mail"
            , input "fax" "Fax"
            ]
        , section "Other Advisor(s) If Attending"
            [ input "advisor1name" "Advisor 1 Name"
            , input "advisor1expertise" "Advisor 1 Expertise"
            , input "advisor2name" "Advisor 2 Name"
            , input "advisor2expertise" "Advisor 2 Expertise"
            , input "advisor3name" "Advisor 3 Name"
            , input "advisor3expertise" "Advisor 3 Expertise"
            ]
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


textInput : (String -> Msg) -> String -> String -> String -> Html Msg
textInput message answer key prompt =
    div [ class "mb-3" ]
        [ label [ for key ] [ text prompt ]
        , input
            [ id key
            , class "form-control"
            , type_ "text"
            , value answer
            , onInput message
            ]
            []
        ]


numberInput : (String -> Msg) -> String -> String -> String -> String -> Html Msg
numberInput message answer key prompt unit =
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
            , div [ class "input-group-append" ]
                [ span [ class "input-group-text" ] [ text unit ] ]
            ]
        ]


multichoiceInput : (String -> Msg) -> Maybe String -> String -> String -> List String -> Html Msg
multichoiceInput message answer key prompt options =
    let
        radioButton o =
            div [ class "mb-3" ]
                [ input
                    [ name key
                    , type_ "radio"
                    , value o
                    , id o
                    , class "form-control"
                    , onInput message
                    , checked (answer == Just o)
                    ]
                    []
                , label [ for o ] [ text o ]
                ]
    in
    div [ class "mb-3" ]
        [ label [] [ text prompt ]
        , div [ class "radio-buttons" ] (List.map radioButton options)
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
            "Non-compliant"

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

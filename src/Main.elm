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
    , answeredQuestions : Int
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
            , answeredQuestions = -1
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
                    ( { model | answeredQuestions = List.length model.standards }
                    , askRubric <| encodePayload a p allQuestions
                    )

                _ ->
                    ( model, Cmd.none )



-- INTEROP


port selectMapProperty : (Decode.Value -> msg) -> Sub msg


port askRubric : Encode.Value -> Cmd msg


port receiveStandards : (Decode.Value -> msg) -> Sub msg


encodePayload : Activity -> Property -> List Question -> Encode.Value
encodePayload a p qs =
    Encode.object
        [ ( "scenario", encodeProposal a p )
        , ( "answers", encodeAnswers qs )
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
        |> optional "specialResidentialArea" (Decode.maybe string) Nothing
        |> optional "hazardFaultLineArea" (Decode.maybe string) Nothing
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
            List.indexedMap listItem standards
                |> ul [ class "list-group mb-3" ]

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
        [ div [ class "sticky-top py-3" ]
            [ h4 [ class "d-flex justify-content-between align-items-center mb-3" ]
                [ span [ class "text-muted" ] [ text "District Plan Standards" ]
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
            let
                btn switch =
                    button [ type_ "button", class "btn btn-primary btn-lg btn-block", onClick AskRubric, disabled switch ]
                        [ text "Continue" ]
            in
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

        compliance =
            Html.form [] <|
                renderProposal model.activities model.selectedProperty
                    :: List.indexedMap renderStandard model.standards
                    ++ continueButton

        content =
            -- List.length model.standards == model.answeredQuestions
            if List.length model.standards == model.answeredQuestions then
                -- we didn't get any more questions back from the engine
                case ( model.selectedActivity, model.selectedProperty ) of
                    ( Just a, Just p ) ->
                        renderApplicationForm a p model.standards

                    _ ->
                        compliance

            else
                -- we have more questions to answer
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
        [ h4 [ class "d-flex justify-content-between align-items-center mb-3" ]
            [ span [] [ text standard.name ]
            , button ([ type_ "button", class "btn btn-link" ] ++ buttonAttrs) [ text "Read the Standard" ]
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


renderApplicationForm : Activity -> Property -> List Standard -> Html Msg
renderApplicationForm activity property standards =
    let
        input =
            textInput (\_ -> NoOp) ""

        inputHelp =
            textInputWithHelp (\_ -> NoOp) ""

        info title content =
            div [ class "card mb-3" ]
                [ div [ class "card-body" ]
                    [ h5 [ class "card-title" ] [ text title ]
                    , p [ class "card-text" ] [ text content ]
                    ]
                ]

        section title questions =
            div [ class "standards" ]
                [ h4 [ class "d-flex justify-content-start align-items-center mb-3" ]
                    [ span [] [ text title ] ]
                , div [ class "questions" ] questions
                , hr [ class "mb-4" ] []
                ]
    in
    Html.form []
        [ section "Property Information"
            [ div [ class "row mb-3" ]
                [ div [ class "col-md-4" ] [ img [ src property.imageUrl, class "cover" ] [] ]
                , div [ class "col-md-8" ]
                    [ input "property-address" "Address"
                    , input "property-wufi" "WUFI"
                    , input "property-zone" "Zone"
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "property-legal-description" "Legal description of the site this application relates" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "property-aka" "Any other commonly known name of the site" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "property-description"
                        "Site description"
                        """
                        Describe the site including its natural and physical characteristics and any adjacent
                        uses that may be relevant to the consideration of the application.
                        """
                    ]
                ]
            ]
        , section "Consent Type"
            [ div [ class "row" ]
                [ div [ class "col-md-6" ]
                    [ input "consent-type" "Consent Type" ]
                , div [ class "col-md-6" ]
                    [ input "consent-type-activity" "Proposed Activity" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "consent-type-activity-status"
                        "Overall Activity Status"
                        """
                        This status is indicative only, and must be verified by a Council Planner.
                        """
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "consent-type-fast-track"
                        "Fast-track Consent"
                        """
                        I opt out / do not opt out of the fast track consent process
                        """
                    ]
                ]
            ]
        , section "Applicant Details" (personalDetails "applicant")
        , section "Agent Details" (personalDetails "agent")
        , section "Owner Details" (personalDetails "owner")
        , section "Occupier Details" (personalDetails "occupier")
        , section "Description of Proposed Activity"
            [ div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "activity-description"
                        "Description of Activity"
                        """
                        Clearly describe the proposal to which this application relates.
                        """
                    ]
                ]
            ]
        , section "Other Resource Consents"
            [ div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "other-consents"
                        "Are there any other resource consents required/granted from any consent authority for this activity?"
                        """
                        Applicant to check with Greater Wellington Regional Council to confirm this.
                        """
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "other-consents-details"
                        "Detail of other resource consents required"
                        """
                        A statement specifying all other resource consents that the applicant may require
                        from any consent authority in respect of the activity to which the application relates,
                        and whether or not the applicant has applied for such consents.
                        """
                    ]
                ]
            ]
        , section "Supporting Information"
            [ info "Information which must be submitted with this application"
                """
                To satisfy the requirement of Section 88(2) of the Resource Management Act 1991
                and rule 3.2.2 in the District Plan. If all of the required information is not
                provided we may be unable to accept your application and it will be returned to you.
                """
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "supporting-info-consideration"
                        "Matters for consideration for the Assessment of Environmental Effects"
                        """
                        As determined by your answers to questions about the proposed activity in
                        relation to the standards in the District Plan, below are the matters for
                        consideration for the Assessment of Environmental Effects:

                        [insert from RuBRIC the matters for consideration] 
                        """
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "supporting-info-aee"
                        "Assessment of Environmental Effects"
                        """
                        The Assessment of Environmental Effects (AEE) is an assessment of any actual
                        or potential effects that the activity may have on the environment, and the ways
                        in which any adverse effects may be mitigated, as per Section 88(6) of the
                        Resource Management Act 1991.
                        """
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "supporting-info-rma"
                        "Assessment against Part 2 of the RMA matters"
                        """
                        Assess the consistency of the effects of your proposal against Part 2 of the Resource Management Act 1991
                        [link on the text 'Resource Management Act 1991'
                        http://legislation.govt.nz/act/public/1991/0069/latest/DLM230265.html?search=qs_act%40bill%40regulation%40deemedreg_resource+management+act+part+2_resel_25_h&p=1]
                        """
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "supporting-info-planning-docs"
                        "Assessment against relevant objectives and policies and provisions of other planning documents"
                        """
                        Assess the consistency of the effects of your proposal against objectives and policies from
                        the District Plan AND against any relevant planning documents in section 104(1)(b) of the
                        Resource Management Act 1991. See the guidance for further details [link to the guidance pop up]
                        """
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "supporting-info-title-records"
                        "Current copies of all records of title for the subject site"
                        """
                        A 'current' record of title is one that has been issued by Land Information New Zealand within the last 3 months,
                        including any relevant consent notice(s) registered on the computer register, or any encumbrances or any other registered
                        instruments, such as right of way documents, esplanade instruments, etc.
                        """
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "supporting-info-plan-scale" "Site plan scale" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "supporting-info-plan-existing-detail" "Site plan existing detail" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "supporting-info-plan-proposed-detail" "Site plan proposed detail" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "supporting-info-elevation-drawings" "Elevation drawings" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "supporting-info-other-info" "Other information which may be required by the District Plan" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "supporting-info-party-approval" "Written approvals from affected parties" ]
                ]
            ]
        , section "National Environmental Standard"
            [ info "National Environmental Standard (NES) Assessing and Managing Contaminants in Soil to Protect Human Health"
                """
                This site may be subject to or covered by the the NES for Assessing and Managing Contaminants
                in Soil to Protect Human Health Regulations 2011. This is determined by reference to the Hazardous
                Activities and Industries List (HAIL) which identifies those activities and industries which are
                more likely to use or store hazardous substances and therefore have a greater probability of site
                contamination. A full list can be found on the Ministry for the Environment's website [link for text 'Ministry
                for the Environment's website' https://www.mfe.govt.nz/land/hazardous-activities-and-industries-list-hail]
                """
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "nes-hail"
                        "Has the piece of land subject to this application been used for (including its present use), or is it more likely than not to have been used for an activity on the Hazardous Activities and Industries List (HAIL)?"
                        """
                        If 'Yes', and your application involves subdividing or changing the use of the land, sampling
                        or disturbing soil, or removing or replacing a fuel storage system, then the NES may apply and
                        you may need to seek consent for this concurrently in your application.
                        """
                    ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "nes-assessment" "Assessment against the NES" ]
                ]
            ]
        , section "Site Visit"
            [ info "Site visit requirements"
                """
                In order to assess your application it will generally be necessary for the Council Planner to visit your site.
                This typically involves an outdoor inspection only, and there is no need for you to be home for this purpose.
                """
            , div [ class "row align-items-end" ]
                [ div [ class "col-md-4 " ]
                    [ input "site-visit-security" "Are there any locked gates, security systems or anything else restricting access by Council?" ]
                , div [ class "col-md-4" ]
                    [ input "site-visit-dogs" "Are there any dogs on the property?" ]
                , div [ class "col-md-4" ]
                    [ input "site-visit-notice" "Do you require notice prior to the site visit?" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "site-visit-safety" "Are there any other Health and Safety requirements Council staff should be aware of before visiting the site. If so, please describe." ]
                ]
            ]
        , section "Declaration for the agent or authorised agent or other"
            [ div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "declaration-name" "Name of person submitting this form" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "declaration-declaration"
                        "Declaration"
                        """
                        I confirm that I have read and understood the notes for the applicant.
                        [link to the guidance pop up on the text 'notes for the applicant']
                        """
                    ]
                ]
            ]
        , section "Declaration for the agent authorised to sign on behalf of the applicant"
            [ div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "authorised-declaration-name" "Full name of agent" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "authorised-declaration-declaration"
                        "Declaration for agent"
                        """
                        As authorised agent for the applicant, I confirm that I have read and understood
                        the notes for the applicant [link to the guidance pop up on the text 'notes for
                        the applicant'] and confirm that I have fully informed the applicant of their/its
                        liability under this application, including for fees and other charges, and that
                        I have the applicant's authority to submit this application on their/its behalf.
                        """
                    ]
                ]
            ]
        , section "Fees"
            [ info "Initial Fee"
                """
                An initial fee must be paid before we can process your application.
                The initial fee due for this non-notified land use consent is: $1650
                """
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "fees-method" "Payment method" ]
                ]
            , div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ inputHelp "fees-declaration"
                        "Declaration for initial fee"
                        """
                        I confirm that I have read and understood the fee payment terms, conditions and
                        declaration for the service of applying for a resource consent [link to guidance
                        on text 'fee payment terms, conditions and declaration']
                        """
                    ]
                ]
            ]
        , section "Additional Invoices" <|
            [ div [ class "row" ]
                [ div [ class "col-md-12" ]
                    [ input "additional-invoices-send" "Payment method" ]
                ]
            ]
                ++ personalDetails "additional-invoices"
        , button [ type_ "button", class "btn btn-success btn-lg btn-block" ]
            [ text "Submit" ]
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


textInputWithHelp : (String -> Msg) -> String -> String -> String -> String -> Html Msg
textInputWithHelp message answer key prompt help =
    div [ class "mb-3" ]
        [ label [ for key, class "mb-0" ] [ text prompt ]
        , div [ class "small text-muted mb-2" ] [ text help ]
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


personalDetails : String -> List (Html Msg)
personalDetails key =
    [ div [ class "row" ]
        [ div [ class "col-md-6" ]
            [ textInput (\_ -> NoOp) "" (key ++ "-fname") "First Name" ]
        , div [ class "col-md-6" ]
            [ textInput (\_ -> NoOp) "" (key ++ "-lname") "Last Name" ]
        ]
    , div [ class "row" ]
        [ div [ class "col-md-12" ]
            [ textInput (\_ -> NoOp) "" (key ++ "-address") "Postal Address" ]
        ]
    , div [ class "row" ]
        [ div [ class "col-md-6" ]
            [ textInput (\_ -> NoOp) "" (key ++ "-phone") "Phone (day)" ]
        , div [ class "col-md-6" ]
            [ textInput (\_ -> NoOp) "" (key ++ "-mobile") "Mobile" ]
        ]
    , div [ class "row" ]
        [ div [ class "col-md-12" ] [ textInput (\_ -> NoOp) "" (key ++ "-email") "E-mail" ]
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

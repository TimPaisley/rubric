port module Main exposing (Model)

import Browser
import Browser.Navigation as Nav
import ElmEscapeHtml exposing (escape, unescape)
import FeatherIcons
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Http
import Json.Decode as Decode exposing (Decoder, float, int, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode
import List.Extra as ListX
import RemoteData exposing (RemoteData(..), WebData)



-- MODEL


type alias Model =
    { selectedProperty : Maybe Property
    , questions : WebData (List Question)
    }


type Msg
    = NoOp
    | SelectMapProperty Decode.Value
    | QuestionsResponse (WebData (List Question))
    | Submit


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


type alias Question =
    { key : String
    , prompt : String
    , units : String
    , input : String
    , value : String
    }


init : () -> ( Model, Cmd Msg )
init flags =
    let
        model =
            { selectedProperty = Nothing
            , questions = NotAsked
            }
    in
    ( model, Cmd.none )



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        SelectMapProperty propertyValue ->
            let
                newProperty =
                    case Decode.decodeValue decodeProperty propertyValue of
                        Ok p ->
                            Just p

                        Err err ->
                            let
                                error =
                                    Debug.log "Failed to decode property: " err
                            in
                            Nothing
            in
            ( { model | selectedProperty = newProperty }, Cmd.none )

        QuestionsResponse response ->
            ( { model | questions = response }, Cmd.none )

        Submit ->
            ( { model | questions = Loading }, Cmd.batch [ sendQuestions Encode.null, getQuestions ] )


getQuestions : Cmd Msg
getQuestions =
    Http.get
        { url = "https://opentdb.com/api.php?amount=3"
        , expect = Http.expectJson (RemoteData.fromResult >> QuestionsResponse) decodeQuestions
        }


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


decodeQuestions : Decode.Decoder (List Question)
decodeQuestions =
    Decode.at [ "results" ] <|
        Decode.list decodeTrivia


decodeTrivia : Decode.Decoder Question
decodeTrivia =
    Decode.succeed Question
        |> required "correct_answer" string
        |> required "question" string
        |> hardcoded ""
        |> hardcoded "text"
        |> hardcoded ""


decodeQuestion : Decode.Decoder Question
decodeQuestion =
    Decode.succeed Question
        |> required "key" string
        |> required "prompt" string
        |> required "units" string
        |> required "input" string
        |> required "value" string



-- VIEW


view : Model -> Html Msg
view model =
    div [ id "container" ]
        [ renderSidebar
        , renderContent model
        ]


renderSidebar : Html msg
renderSidebar =
    let
        sections =
            [ "First Section", "Second Section", "Third Section" ]
    in
    div [ id "sidebar" ]
        [ h1 [] [ text "RuBRIC" ]
        , h3 [ class "subtitle" ] [ text "A Proof of Concept" ]
        , div [ class "sections" ]
            (List.map (\s -> div [ class "section" ] [ text s ]) sections)
        ]


renderContent : Model -> Html Msg
renderContent model =
    let
        activitySelect =
            div [ class "question" ]
                [ label [ for "activity-select" ]
                    [ text "What do you want to do?" ]
                , select [ id "activity-select" ]
                    [ option [] [ text "Activity A" ]
                    , option [] [ text "Activity B" ]
                    , option [] [ text "Activity C" ]
                    ]
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

        displayQuestion q =
            div [ class "question" ]
                [ label [ for q.key ] [ text <| unescape q.prompt ]
                , input [ id q.key, type_ q.input ] []
                ]

        submitButton =
            case model.questions of
                Loading ->
                    div [ class "button", onClick Submit ]
                        [ FeatherIcons.loader
                            |> FeatherIcons.withClass "spin"
                            |> FeatherIcons.withSize 15
                            |> FeatherIcons.toHtml []
                        ]

                _ ->
                    div [ class "button", onClick Submit ]
                        [ text "Submit" ]
    in
    div [ id "content" ]
        [ h1 [] [ text "Submit an Application" ]
        , Html.form [ class "questions" ] <|
            [ activitySelect, propertySelect ]
                ++ (List.map displayQuestion <| RemoteData.withDefault [] model.questions)
                ++ [ submitButton ]
        ]



-- SUBSCRIPTIONS


port selectMapProperty : (Decode.Value -> msg) -> Sub msg


port sendQuestions : Encode.Value -> Cmd msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    selectMapProperty SelectMapProperty



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

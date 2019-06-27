port module Main exposing (Model)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick, onInput)
import Http
import Json.Decode as Decode exposing (Decoder, float, int, string)
import Json.Decode.Pipeline exposing (hardcoded, optional, required)
import Json.Encode as Encode
import List.Extra as ListX



-- MODEL


type alias Model =
    { selectedProperty : Maybe Property
    , questions : List Question
    }


type Msg
    = NoOp
    | SelectMapProperty Decode.Value
    | InputAnswer String String
    | Receive Decode.Value
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
            , questions = []
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

        InputAnswer key val ->
            let
                newQuestions =
                    ListX.updateIf
                        (\q -> q.key == key)
                        (\q -> { q | value = val })
                        model.questions
            in
            ( { model | questions = newQuestions }, Cmd.none )

        Receive questionsValue ->
            let
                newQuestions =
                    case Decode.decodeValue decodeQuestions questionsValue of
                        Ok qs ->
                            qs

                        Err err ->
                            let
                                error =
                                    Debug.log "Failed to decode questions: " err
                            in
                            []
            in
            ( { model | questions = newQuestions }, Cmd.none )

        Submit ->
            ( model, submit Encode.null )


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


decodeQuestions : Decode.Decoder (List Question)
decodeQuestions =
    Decode.list decodeQuestion


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
                [ label [ for q.key ] [ text q.prompt ]
                , input [ id q.key, type_ q.input, onInput <| InputAnswer q.key ] []
                ]
    in
    div [ id "content" ]
        [ h1 [] [ text "Submit an Application" ]
        , Html.form [ class "questions" ] <|
            [ activitySelect, propertySelect ]
                ++ List.map displayQuestion model.questions
                ++ [ div [ class "button", onClick Submit ] [ text "Submit" ] ]
        ]



-- SUBSCRIPTIONS


port selectMapProperty : (Decode.Value -> msg) -> Sub msg


port receive : (Decode.Value -> msg) -> Sub msg


port submit : Encode.Value -> Cmd msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.batch
        [ selectMapProperty SelectMapProperty
        , receive Receive
        ]



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

module Main exposing (Model)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import Http
import List.Extra as ListX



-- MODEL


type alias Model =
    { questions : List Question }


type Msg
    = NoOp
    | InputAnswer String String


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
        testQuestions =
            [ { key = "activity"
              , prompt = "What activity do you want to perform?"
              , units = ""
              , input = "text"
              , value = ""
              }
            , { key = "property"
              , prompt = "What is the address of the property?"
              , units = ""
              , input = "text"
              , value = ""
              }
            , { key = "height"
              , prompt = "What is the height of the proposed building?"
              , units = ""
              , input = "number"
              , value = ""
              }
            ]

        model =
            { questions = testQuestions }
    in
    ( model, Cmd.none )



-- UPDATE


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )

        InputAnswer key val ->
            let
                newQuestions =
                    ListX.updateIf
                        (\q -> q.key == key)
                        (\q -> { q | value = val })
                        model.questions
            in
            ( { model | questions = newQuestions }, Cmd.none )



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
        displayQuestion q =
            div [ class "question" ]
                [ label [ for q.key ] [ text q.prompt ]
                , input [ id q.key, type_ q.input, onInput <| InputAnswer q.key ] []
                ]
    in
    div [ id "content" ]
        [ h1 [] [ text "Submit an Application" ]
        , Html.form [ class "questions" ] <|
            List.map displayQuestion model.questions
                ++ [ input [ type_ "submit" ] [ text "Submit" ] ]
        ]



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none



-- MAIN


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

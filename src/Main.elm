port module Main exposing (Model)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import Http
import Json.Decode as Decode
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


type alias Property =
    { address : String
    , wufi : Int
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
        testQuestions =
            [ { key = "test1"
              , prompt = "Test Question 1"
              , units = ""
              , input = "text"
              , value = ""
              }
            , { key = "test2"
              , prompt = "Test Question 2"
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
            { selectedProperty = Nothing
            , questions = testQuestions
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


decodeProperty : Decode.Decoder Property
decodeProperty =
    Decode.map2
        Property
        (Decode.field "address" Decode.string)
        (Decode.field "wufi" Decode.int)



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
                , input [ id "activity-select", type_ "text" ] []
                ]

        propertySelect =
            let
                selectedPropertyLabel =
                    case model.selectedProperty of
                        Just p ->
                            p.address

                        Nothing ->
                            "Please use the map to select a property."
            in
            div [ class "question" ]
                [ label [ for "property-select" ]
                    [ text "What is the address of the property?" ]
                , div [ id "map" ] []
                , input
                    [ id "property-select"
                    , type_ "text"
                    , value selectedPropertyLabel
                    , readonly True
                    ]
                    []
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
                ++ [ input [ type_ "submit" ] [ text "Submit" ] ]
        ]



-- SUBSCRIPTIONS


port selectMapProperty : (Decode.Value -> msg) -> Sub msg


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

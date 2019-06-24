module Main exposing (Model)

import Browser
import Browser.Navigation as Nav
import Html exposing (..)
import Html.Attributes exposing (..)


type alias Model =
    {}


type Msg
    = NoOp


init : () -> ( Model, Cmd Msg )
init flags =
    ( Model, Cmd.none )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NoOp ->
            (model, Cmd.none)


view : Model -> Html msg
view model =
    div [ id "container" ]
        [ h1 [] [ text "RuBRIC" ]
        , h3 [ class "subtitle" ] [ text "A Proof of Concept" ]
        ]


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
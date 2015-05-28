angular
.module 'msApp', [
    'ngRoute'
    'CtrlBoard'
    'tile'
]
.config ($routeProvider, $locationProvider) ->
    $routeProvider
        .when '/:any*', {
            templateUrl : 'Resources/templates/board.html'
            controller  : 'CtrlBoard'
        }
        .when '/', {
            templateUrl : 'Resources/templates/board.html'
            controller  : 'CtrlBoard'
        }

    $locationProvider.html5Mode true
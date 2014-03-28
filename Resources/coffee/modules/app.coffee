msApp = angular
    .module 'msApp', [
        'ngRoute',
        'msGameLogic',
        'msControllerBoard'
    ]

msApp.config(
    ($routeProvider, $locationProvider) ->
        $routeProvider
            .when '/:any*', {
                templateUrl : 'Resources/view/board.html'
                controller  : 'board'
            }
            .when '/', {
                templateUrl : 'Resources/view/board.html'
                controller  : 'board'
            }

        $locationProvider.html5Mode true
    )

msApp = angular
    .module 'msApp', [
        'ngRoute',
        'msControllerBoard',
        'msCollection'
    ]

msApp.config(
    ($routeProvider, $locationProvider) ->
        $routeProvider
            .when '/:any*', {
                templateUrl : 'Resources/templates/board.html'
                controller  : 'board'
            }
            .when '/', {
                templateUrl : 'Resources/templates/board.html'
                controller  : 'board'
            }

        $locationProvider.html5Mode true
    )

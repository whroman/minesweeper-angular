var msApp;

msApp = angular.module('msApp', ['ngRoute', 'msControllerBoard', 'msCollection']);

msApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/:any*', {
    templateUrl: 'Resources/templates/board.html',
    controller: 'board'
  }).when('/', {
    templateUrl: 'Resources/templates/board.html',
    controller: 'board'
  });
  return $locationProvider.html5Mode(true);
});

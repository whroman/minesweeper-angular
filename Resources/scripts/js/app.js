angular.module('msApp', ['ngRoute', 'CtrlBoard']).config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/:any*', {
    templateUrl: 'Resources/templates/board.html',
    controller: 'CtrlBoard'
  }).when('/', {
    templateUrl: 'Resources/templates/board.html',
    controller: 'CtrlBoard'
  });
  return $locationProvider.html5Mode(true);
});

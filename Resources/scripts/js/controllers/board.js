var msBoard;

msBoard = angular.module('msControllerBoard', ['angularLocalStorage', 'ngSlider', 'modelSliders', 'modelModals']);

msBoard.controller('board', function($scope, storage, collection, modelSliders, modelModals) {
  var currentBoard;
  $scope.modals = modelModals.set('Resources/templates/modals/', ['instructions', 'newGame']);
  currentBoard = void 0;
  if (storage.get('tiles') === null) {
    currentBoard = collection.newGame(5, 7, 5);
  } else {
    currentBoard = collection.loadGame(storage.get('tiles'));
  }
  storage.bind($scope, 'tiles');
  $scope.tiles = currentBoard.tiles;
  $scope.info = collection.info.refresh(currentBoard.tiles);
  $scope.sliders = modelSliders.init(5, 15, 8).refresh();
  $scope.checkTile = function(event, x, y) {
    $scope.tiles = collection.checkTile(x, y, event);
    collection.info.refresh($scope.tiles);
    return storage.get('tiles');
  };
  $scope.autoSelect = function(num) {
    $scope.tiles = collection.autoSelect(num);
    return collection.info.refresh(currentBoard.tiles);
  };
  return $scope.newGame = function(sizeX, sizeY, numOfMines) {
    currentBoard = collection.newGame(sizeX, sizeY, numOfMines);
    $scope.tiles = currentBoard.tiles;
    $scope.info = collection.info.refresh(currentBoard.tiles);
    return $scope.modals.reset();
  };
});

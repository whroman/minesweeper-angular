angular.module('CtrlBoard', ['ngSlider', 'CollectTiles', 'ModelSliders', 'ModelModals']).controller('CtrlBoard', function($scope, storage, CollectTiles, ModelSliders, ModelModals) {
  var currentBoard;
  $scope.modals = ModelModals.set('Resources/templates/modals/', ['instructions', 'newGame']);
  $scope.sliders = ModelSliders.init(5, 15, 8);
  currentBoard = CollectTiles.init($scope, $scope.sliders.info);
  $scope.tiles = currentBoard.tiles;
  $scope.info = currentBoard.info;
  $scope.checkTile = function(event, x, y) {
    return $scope.tiles = CollectTiles.checkTile(x, y, event);
  };
  $scope.autoSelect = function(num) {
    return $scope.tiles = CollectTiles.autoSelect(num);
  };
  return $scope.newGame = function(sizeX, sizeY, numOfMines) {
    currentBoard = CollectTiles.newGame(sizeX, sizeY, numOfMines);
    $scope.tiles = currentBoard.tiles;
    return $scope.modals.reset();
  };
});

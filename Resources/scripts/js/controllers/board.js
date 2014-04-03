angular.module('CtrlBoard', ['angularLocalStorage', 'ngSlider', 'CollectTiles', 'ModelSliders', 'ModelModals']).controller('CtrlBoard', function($scope, storage, CollectTiles, ModelSliders, ModelModals) {
  var currentBoard;
  $scope.modals = ModelModals.set('Resources/templates/modals/', ['instructions', 'newGame']);
  $scope.sliders = ModelSliders.init(5, 15, 8);
  currentBoard = CollectTiles.init($scope, $scope.sliders.info);
  $scope.tiles = currentBoard.tiles;
  $scope.info = CollectTiles.info.refresh(currentBoard.tiles);
  $scope.checkTile = function(event, x, y) {
    $scope.tiles = CollectTiles.checkTile(x, y, event);
    return CollectTiles.info.refresh($scope.tiles);
  };
  $scope.autoSelect = function(num) {
    $scope.tiles = CollectTiles.autoSelect(num);
    return CollectTiles.info.refresh(currentBoard.tiles);
  };
  return $scope.newGame = function(sizeX, sizeY, numOfMines) {
    currentBoard = CollectTiles.newGame(sizeX, sizeY, numOfMines);
    $scope.tiles = currentBoard.tiles;
    $scope.info = CollectTiles.info.refresh(currentBoard.tiles);
    return $scope.modals.reset();
  };
});

angular.module('CtrlBoard', ['angularLocalStorage', 'ngSlider', 'CollectTiles', 'ModelSliders', 'ModelModals']).controller('CtrlBoard', function($scope, storage, CollectTiles, ModelSliders, ModelModals) {
  var currentBoard;
  $scope.modals = ModelModals.set('Resources/templates/modals/', ['instructions', 'newGame']);
  currentBoard = void 0;
  if (storage.get('tiles') === null) {
    currentBoard = CollectTiles.newGame(5, 7, 5);
  } else {
    currentBoard = CollectTiles.loadGame(storage.get('tiles'));
  }
  storage.bind($scope, 'tiles');
  $scope.tiles = currentBoard.tiles;
  $scope.info = CollectTiles.info.refresh(currentBoard.tiles);
  $scope.sliders = ModelSliders.init(5, 15, 8).refresh();
  $scope.checkTile = function(event, x, y) {
    $scope.tiles = CollectTiles.checkTile(x, y, event);
    CollectTiles.info.refresh($scope.tiles);
    return storage.get('tiles');
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

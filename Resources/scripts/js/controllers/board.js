angular.module('CtrlBoard', ['ngSlider', 'CollectTiles', 'ModelSliders', 'ModelModals']).controller('CtrlBoard', function($scope, storage, CollectTiles, ModelSliders, ModelModals) {
  var currentBoard, init;
  init = function(boardInstance, info) {
    var board;
    board = void 0;
    if (storage.get('tiles') === null) {
      board = boardInstance.newGame(info.x.val, info.y.val, info.mines.val);
    } else {
      board = boardInstance.loadGame(storage.get('tiles'));
    }
    storage.bind($scope, 'tiles');
    return board;
  };
  $scope.modals = ModelModals.set('Resources/templates/modals/', ['instructions', 'newGame']);
  $scope.sliders = ModelSliders.init(5, 20, 10);
  currentBoard = init(CollectTiles, $scope.sliders.info);
  $scope.tiles = currentBoard.tiles;
  $scope.info = currentBoard.info;
  $scope.autoSelect = function(num) {
    return $scope.tiles = currentBoard.autoSelect(num);
  };
  return $scope.newGame = function(sizeX, sizeY, numOfMines) {
    currentBoard = CollectTiles.newGame(sizeX, sizeY, numOfMines);
    $scope.tiles = currentBoard.tiles;
    $scope.info = currentBoard.info;
    return $scope.modals.reset();
  };
});

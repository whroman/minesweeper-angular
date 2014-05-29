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
  $scope.newGame = function(sizeX, sizeY, numOfMines) {
    currentBoard = CollectTiles.newGame(sizeX, sizeY, numOfMines);
    $scope.tiles = currentBoard.tiles;
    $scope.info = currentBoard.info;
    return $scope.modals.reset();
  };
  $scope.tileClick = function() {
    return console.log('');
  };
  return $scope.$watchCollection(function() {
    var tile, toWatch, _i, _len, _ref;
    toWatch = [];
    _ref = $scope.tiles;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tile = _ref[_i];
      toWatch.push(tile.model.isClear);
      toWatch.push(tile.model.isFlagged);
    }
    return toWatch;
  }, function() {
    return $scope.info.update($scope.tiles);
  });
});

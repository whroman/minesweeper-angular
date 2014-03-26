var minesweeperCtrl;

minesweeperCtrl = angular.module('minesweeperCtrl', ['angularLocalStorage']);

minesweeperCtrl.controller('Board', function($scope, board, storage) {
  var currentBoard;
  currentBoard = void 0;
  if (storage.get('tiles') === null) {
    currentBoard = board.newGame(5, 7, 5);
  } else {
    currentBoard = board.loadGame(storage.get('tiles'));
  }
  storage.bind($scope, 'tiles', currentBoard.tiles);
  $scope.tiles = currentBoard.tiles;
  $scope.info = currentBoard.info.refresh($scope.tiles);
  $scope.overlay = {
    instructions: false,
    newGame: false
  };
  $scope.checkTile = function(event, x, y) {
    $scope.tiles = currentBoard.checkTile(x, y, event);
    return $scope.info.refresh($scope.tiles);
  };
  $scope.autoSelect = function(num) {
    $scope.tiles = currentBoard.autoSelect(num);
    return $scope.info.refresh(currentBoard.tiles);
  };
  $scope.newGame = function(sizeX, sizeY, numOfMines) {
    currentBoard = board.newGame(sizeX, sizeY, numOfMines);
    $scope.tiles = currentBoard.tiles;
    $scope.info = currentBoard.info.refresh(currentBoard.tiles);
    return $scope.overlayReset();
  };
  $scope.toggleOverlay = function(name) {
    if ($scope.info.win === false && $scope.info.loss === false) {
      if ($scope.overlay[name] === true) {
        return $scope.overlay[name] = false;
      } else {
        return $scope.overlay[name] = true;
      }
    }
  };
  return $scope.overlayReset = function() {
    var key, panel, _ref, _results;
    _ref = $scope.overlay;
    _results = [];
    for (key in _ref) {
      panel = _ref[key];
      _results.push($scope.overlay[key] = false);
    }
    return _results;
  };
});
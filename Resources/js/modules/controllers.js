var minesweeperCtrl;

minesweeperCtrl = angular.module('minesweeperCtrl', ['angularLocalStorage', 'ngSlider']);

minesweeperCtrl.controller('Board', function($scope, board, storage, boardInfo) {
  var currentBoard;
  currentBoard = void 0;
  if (storage.get('tiles') === null) {
    currentBoard = board.newGame(5, 7, 5);
  } else {
    currentBoard = board.loadGame(storage.get('tiles'));
  }
  storage.bind($scope, 'tiles');
  $scope.tiles = currentBoard.tiles;
  $scope.info = boardInfo.refresh(currentBoard.tiles);
  $scope.overlay = {
    instructions: false,
    newGame: false
  };
  $scope.newGameInfo = {
    mines: {
      val: void 0,
      options: void 0
    }
  };
  $scope.sliderRefresh = function() {
    var currentVal, newFrom, newTo, newVal;
    currentVal = $scope.newGameInfo.mines.val;
    newVal = Math.floor($scope.newGameInfo.x.val * $scope.newGameInfo.y.val / 3).toString();
    newFrom = Math.floor($scope.newGameInfo.x.val * $scope.newGameInfo.y.val / 4);
    newTo = Math.floor($scope.newGameInfo.x.val * $scope.newGameInfo.y.val / 2);
    $scope.newGameInfo.mines.options = {
      from: newFrom,
      to: newTo,
      step: $scope.newGameInfo.x.options.step
    };
    if (currentVal === void 0 || (currentVal < newFrom && currentVal > newTo)) {
      return $scope.newGameInfo.mines.val = newVal;
    }
  };
  $scope.newGameInfo.x = {
    val: '8',
    options: {
      from: 5,
      to: 15,
      step: 1
    }
  };
  $scope.newGameInfo.y = {
    val: $scope.newGameInfo.x.val,
    options: {
      from: $scope.newGameInfo.x.options.from,
      to: $scope.newGameInfo.x.options.to,
      step: $scope.newGameInfo.x.options.step
    }
  };
  $scope.sliderRefresh();
  $scope.checkTile = function(event, x, y) {
    $scope.tiles = currentBoard.checkTile(x, y, event, boardInfo);
    return boardInfo.refresh($scope.tiles);
  };
  $scope.autoSelect = function(num) {
    $scope.tiles = currentBoard.autoSelect(num);
    return boardInfo.refresh(currentBoard.tiles);
  };
  $scope.newGame = function(sizeX, sizeY, numOfMines) {
    currentBoard = board.newGame(sizeX, sizeY, numOfMines);
    $scope.tiles = currentBoard.tiles;
    $scope.info = boardInfo.refresh(currentBoard.tiles);
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

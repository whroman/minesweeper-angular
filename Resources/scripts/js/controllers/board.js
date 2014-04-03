var msBoard;

msBoard = angular.module('msControllerBoard', ['angularLocalStorage', 'ngSlider', 'msSliderInfo']);

msBoard.controller('board', function($scope, storage, collection, sliderInfo) {
  var currentBoard, modals;
  modals = function(path, fileNames) {
    var fileName, modalInfo, _i, _len;
    modalInfo = {};
    for (_i = 0, _len = fileNames.length; _i < _len; _i++) {
      fileName = fileNames[_i];
      modalInfo[fileName] = {
        path: path + fileName + '.html',
        show: false
      };
    }
    return modalInfo;
  };
  $scope.modals = modals('Resources/templates/modals/', ['instructions', 'newGame']);
  currentBoard = void 0;
  if (storage.get('tiles') === null) {
    currentBoard = collection.newGame(5, 7, 5);
  } else {
    currentBoard = collection.loadGame(storage.get('tiles'));
  }
  storage.bind($scope, 'tiles');
  $scope.tiles = currentBoard.tiles;
  $scope.info = collection.info.refresh(currentBoard.tiles);
  $scope.overlay = {
    instructions: false,
    newGame: false
  };
  $scope.newGameInfo = sliderInfo.init(5, 15, 8);
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
    if (currentVal === void 0 || currentVal < newFrom || currentVal > newTo) {
      return $scope.newGameInfo.mines.val = newVal;
    }
  };
  $scope.sliderRefresh();
  $scope.checkTile = function(event, x, y) {
    $scope.tiles = collection.checkTile(x, y, event);
    collection.info.refresh($scope.tiles);
    return storage.get('tiles');
  };
  $scope.autoSelect = function(num) {
    $scope.tiles = collection.autoSelect(num);
    return collection.info.refresh(currentBoard.tiles);
  };
  $scope.newGame = function(sizeX, sizeY, numOfMines) {
    currentBoard = collection.newGame(sizeX, sizeY, numOfMines);
    $scope.tiles = currentBoard.tiles;
    $scope.info = collection.info.refresh(currentBoard.tiles);
    return $scope.overlayReset();
  };
  $scope.toggleOverlay = function(name) {
    if ($scope.info.win === false && $scope.info.loss === false) {
      if ($scope.modals[name].show === true) {
        return $scope.modals[name].show = false;
      } else {
        return $scope.modals[name].show = true;
      }
    }
  };
  return $scope.overlayReset = function() {
    var key, panel, _ref, _results;
    _ref = $scope.modals;
    _results = [];
    for (key in _ref) {
      panel = _ref[key];
      _results.push($scope.modals[key].show = false);
    }
    return _results;
  };
});

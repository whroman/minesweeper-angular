var msBoard;

msBoard = angular.module('msControllerBoard', ['angularLocalStorage', 'ngSlider', 'msSliderInfo']);

msBoard.controller('board', function($scope, storage, collection, sliderInfo) {
  var currentBoard;
  $scope.modals = {
    path: {},
    show: {},
    set: function(path, fileNames) {
      var fileName, _i, _len;
      for (_i = 0, _len = fileNames.length; _i < _len; _i++) {
        fileName = fileNames[_i];
        this.path[fileName] = path + fileName + '.html';
        this.show[fileName] = false;
      }
      return this;
    },
    toggle: function(name) {
      if ($scope.info.win === false && $scope.info.loss === false) {
        if (this.show[name] === true) {
          this.show[name] = false;
        } else {
          this.show[name] = true;
        }
      }
      return this;
    },
    reset: function() {
      var key, showModal, _ref;
      _ref = this.show;
      for (key in _ref) {
        showModal = _ref[key];
        this.show[key] = false;
      }
      return this;
    }
  };
  $scope.modals.set('Resources/templates/modals/', ['instructions', 'newGame']);
  currentBoard = void 0;
  if (storage.get('tiles') === null) {
    currentBoard = collection.newGame(5, 7, 5);
  } else {
    currentBoard = collection.loadGame(storage.get('tiles'));
  }
  storage.bind($scope, 'tiles');
  $scope.tiles = currentBoard.tiles;
  $scope.info = collection.info.refresh(currentBoard.tiles);
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
  return $scope.newGame = function(sizeX, sizeY, numOfMines) {
    currentBoard = collection.newGame(sizeX, sizeY, numOfMines);
    $scope.tiles = currentBoard.tiles;
    $scope.info = collection.info.refresh(currentBoard.tiles);
    return $scope.modals.reset();
  };
});

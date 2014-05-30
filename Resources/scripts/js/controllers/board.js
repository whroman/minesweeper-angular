angular.module('CtrlBoard', ['ngSlider', 'CollectTiles', 'ModelSliders', 'ModelModals', 'ModelBoardInfo']).controller('CtrlBoard', function($scope, storage, CollectTiles, ModelSliders, ModelModals, ModelBoardInfo) {
  var currentBoard, init, noMineFirstClick, tiles;
  noMineFirstClick = function(tile) {
    if ($scope.info.numOfClears === 0 && tile.model.isMine === true) {
      tile.model.isMine = false;
      currentBoard.randomSafeTile().model.isMine = true;
      currentBoard.tallyMines();
    }
    return tile;
  };
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
  $scope.info = ModelBoardInfo;
  $scope.ui = {
    autoSelect: function(num) {
      return $scope.tiles = currentBoard.autoSelect(num);
    },
    newGame: function(sizeX, sizeY, numOfMines) {
      currentBoard = CollectTiles.newGame(sizeX, sizeY, numOfMines);
      $scope.tiles = currentBoard.tiles;
      $scope.modals.reset();
      return currentBoard;
    },
    tileClick: function(event, tile) {
      if (event.shiftKey === true || event.altKey === true) {
        tile.toggleFlag();
      } else {
        noMineFirstClick(tile);
        tile.clear();
      }
      return tile;
    }
  };
  tiles = {
    watchedAttrs: ['isClear', 'isFlagged'],
    watch: function() {
      var tile, toWatch, watchedAttr, _i, _j, _len, _len1, _ref, _ref1;
      toWatch = [];
      _ref = $scope.tiles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tile = _ref[_i];
        _ref1 = this.watchedAttrs;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          watchedAttr = _ref1[_j];
          toWatch.push(tile.model[watchedAttr]);
        }
      }
      return toWatch;
    },
    onChange: function() {
      $scope.info.update($scope.tiles);
      return $scope.tiles;
    }
  };
  return $scope.$watchCollection(tiles.watch.bind(tiles), tiles.onChange);
});

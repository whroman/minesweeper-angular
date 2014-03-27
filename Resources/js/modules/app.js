var minesweeperApp;

minesweeperApp = angular.module('minesweeperApp', ['minesweeperCtrl', 'ngRoute']);

minesweeperApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/:any*', {
    templateUrl: 'Resources/view/board.html',
    controller: 'Board'
  }).when('/', {
    templateUrl: 'Resources/view/board.html',
    controller: 'Board'
  });
  return $locationProvider.html5Mode(true);
});

minesweeperApp.factory('boardInfo', function() {
  var boardInfo;
  boardInfo = function() {
    var refresh;
    refresh = function(tiles) {
      var key, tile;
      this.loss = false;
      this.win = false;
      this.numOfTiles = 0;
      this.numOfClears = 0;
      this.numOfFlags = 0;
      this.numOfMines = 0;
      for (key in tiles) {
        tile = tiles[key];
        this.numOfTiles++;
        if (tile.isClear === true) {
          this.numOfClears++;
        }
        if (tile.isFlagged === true) {
          this.numOfFlags++;
        }
        if (tile.isMine === true) {
          this.numOfMines++;
        }
        if (tile.isMine === true && tile.isClear === true) {
          this.loss = true;
        }
      }
      if (this.loss === false && this.numOfTiles - this.numOfMines - this.numOfClears === 0) {
        this.win = true;
      }
      return this;
    };
    return {
      refresh: refresh
    };
  };
  return boardInfo();
});

minesweeperApp.service('toggleFlag', function() {
  var toggleFlag;
  return toggleFlag = function(tile) {
    if (tile.isFlagged === true) {
      tile.isFlagged = false;
    } else {
      tile.isFlagged = true;
    }
    return tile;
  };
});

minesweeperApp.factory('board', function(boardInfo, toggleFlag) {
  var board;
  board = function() {
    var adjacentTiles, autoSelect, checkTile, clearNeighbors, clearTile, get, loadGame, newGame, noMineFirstClick, randomSafeTile, tallyAdjacentMines, tiles;
    tiles = {};
    adjacentTiles = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    get = function(x, y) {
      var key;
      key = x + '-' + y;
      return this.tiles[key];
    };
    newGame = function(sizeX, sizeY, numOfMines) {
      var mineNum, tile, x, y, _i, _j, _k, _ref, _ref1;
      this.tiles = {};
      for (y = _i = 0, _ref = sizeY - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
        for (x = _j = 0, _ref1 = sizeX - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          this.tiles[x + '-' + y] = {
            x: x,
            y: y,
            isMine: false,
            isClear: false,
            isFlagged: false,
            adjacentMines: 0
          };
        }
      }
      for (mineNum = _k = 1; 1 <= numOfMines ? _k <= numOfMines : _k >= numOfMines; mineNum = 1 <= numOfMines ? ++_k : --_k) {
        tile = this.randomSafeTile();
        tile.isMine = true;
        this.tallyAdjacentMines(tile);
      }
      return this;
    };
    loadGame = function(savedTiles) {
      this.tiles = savedTiles;
      return this;
    };
    tallyAdjacentMines = function(tile) {
      var adjacentTile, x, y, _i, _len, _results;
      x = tile.x;
      y = tile.y;
      _results = [];
      for (_i = 0, _len = adjacentTiles.length; _i < _len; _i++) {
        adjacentTile = adjacentTiles[_i];
        tile = this.get(x + adjacentTile[0], y + adjacentTile[1]);
        if (tile != null) {
          _results.push(tile.adjacentMines++);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    clearTile = function(tile) {
      this.noMineFirstClick(tile);
      tile.isClear = true;
      tile.isFlagged = false;
      return this.clearNeighbors(tile);
    };
    noMineFirstClick = function(tile) {
      if (boardInfo.numOfClears === 0 && tile.isMine === true) {
        tile.isMine = false;
        return this.randomSafeTile().isMine = true;
      }
    };
    clearNeighbors = function(tile) {
      var adjacentTile, neighbor, _i, _len, _results;
      if (tile.adjacentMines === 0) {
        _results = [];
        for (_i = 0, _len = adjacentTiles.length; _i < _len; _i++) {
          adjacentTile = adjacentTiles[_i];
          neighbor = this.get(tile.x + adjacentTile[0], tile.y + adjacentTile[1]);
          if (neighbor != null) {
            if (neighbor.adjacentMines === 0 && neighbor.isClear === false && neighbor.isMine === false) {
              _results.push(this.clearTile(neighbor));
            } else {
              _results.push(void 0);
            }
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }
    };
    checkTile = function(x, y, event) {
      var tile;
      tile = this.get(x, y);
      if (event.shiftKey === true || event.altKey === true) {
        toggleFlag(tile);
      } else {
        this.clearTile(tile);
      }
      return this.tiles;
    };
    randomSafeTile = function() {
      var availTiles, key, randomTile, tile, _ref;
      availTiles = [];
      _ref = this.tiles;
      for (key in _ref) {
        tile = _ref[key];
        if (tile.isClear === false && tile.isMine === false) {
          availTiles.push(tile);
        }
      }
      return randomTile = availTiles[Math.floor(Math.random() * availTiles.length)];
    };
    autoSelect = function(num) {
      var tile;
      while (num--) {
        tile = this.randomSafeTile();
        this.clearTile(tile);
      }
      return this.tiles;
    };
    return {
      newGame: newGame,
      loadGame: loadGame,
      tiles: tiles,
      checkTile: checkTile,
      clearTile: clearTile,
      autoSelect: autoSelect,
      get: get,
      randomSafeTile: randomSafeTile,
      clearNeighbors: clearNeighbors,
      tallyAdjacentMines: tallyAdjacentMines,
      noMineFirstClick: noMineFirstClick
    };
  };
  return board();
});

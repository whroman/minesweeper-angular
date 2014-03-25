var minesweeperApp;

minesweeperApp = angular.module('minesweeperApp', ['minesweeperCtrl', 'ngRoute']);

minesweeperApp.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: './Resources/view/board.html',
    controller: 'Board'
  });
  return $locationProvider.html5Mode(true);
});

minesweeperApp.factory('board', function() {
  var board;
  board = function() {
    var adjacentTiles, autoSelect, checkTile, clearTile, get, info, loadGame, newGame, randomSafeTile, tallyAdjacentMines, tiles, toggleFlag;
    tiles = {};
    info = {
      numOfTiles: 0,
      numOfMines: 0,
      numOfFlags: 0,
      numOfClears: 0,
      refresh: function(tiles) {
        var key, tile;
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
        }
        return this;
      }
    };
    adjacentTiles = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    get = function(x, y) {
      var key;
      key = x + '-' + y;
      return this.tiles[key];
    };
    newGame = function(sizeX, sizeY, numOfMines) {
      var mineNum, tile, x, y, _i, _j, _k;
      for (y = _i = 0; 0 <= sizeY ? _i <= sizeY : _i >= sizeY; y = 0 <= sizeY ? ++_i : --_i) {
        for (x = _j = 0; 0 <= sizeX ? _j <= sizeX : _j >= sizeX; x = 0 <= sizeX ? ++_j : --_j) {
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
      for (mineNum = _k = 0; 0 <= numOfMines ? _k <= numOfMines : _k >= numOfMines; mineNum = 0 <= numOfMines ? ++_k : --_k) {
        tile = randomSafeTile();
        tile.isMine = true;
        this.tallyAdjacentMines(tile);
      }
      this.info.refresh(this.tiles);
      return this;
    };
    loadGame = function(savedTiles) {
      this.tiles = savedTiles;
      this.info.refresh(this.tiles);
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
      var adjacentTile, neighbor, _i, _len, _results;
      tile.isClear = true;
      tile.isFlagged = false;
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
    };
    toggleFlag = function(tile) {
      var _ref;
      tile.isFlagged = (_ref = tile.isFlagged === true) != null ? _ref : {
        "false": true
      };
      return tile;
    };
    checkTile = function(x, y, event) {
      var tile;
      tile = this.get(x, y);
      if (event.shiftKey === true || event.altKey === true) {
        this.toggleFlag(tile);
      } else {
        this.clearTile(tile);
      }
      return this.tiles;
    };
    randomSafeTile = function() {
      var availTiles, key, randomTile, tile;
      availTiles = [];
      for (key in tiles) {
        tile = tiles[key];
        if (tile.isClear === false && tile.isMine === false) {
          availTiles.push(tile);
        }
      }
      return randomTile = availTiles[Math.floor(Math.random() * availTiles.length)];
    };
    autoSelect = function(num) {
      var tile;
      while (num--) {
        tile = randomSafeTile();
        this.clearTile(tile);
      }
      return tiles;
    };
    return {
      newGame: newGame,
      loadGame: loadGame,
      info: info,
      tiles: tiles,
      checkTile: checkTile,
      toggleFlag: toggleFlag,
      clearTile: clearTile,
      autoSelect: autoSelect,
      get: get,
      tallyAdjacentMines: tallyAdjacentMines
    };
  };
  return board();
});

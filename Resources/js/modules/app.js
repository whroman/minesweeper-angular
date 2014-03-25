var app;

app = angular.module('minesweeperApp', ['minesweeperCtrl', 'ngRoute']);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: './Resources/view/board.html',
    controller: 'Board'
  });
  return $locationProvider.html5Mode(true);
});

app.factory('board', function() {
  var board;
  board = function() {
    var adjacentTiles, checkTile, clearTile, get, info, newGame, resumeGame, tallyAdjacentMines, tiles, toggleFlag;
    tiles = {};
    info = {
      numOfTiles: 0,
      numOfMines: 0,
      numOfFlags: 0,
      numOfClears: 0,
      refresh: function() {
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
    resumeGame = function(savedTiles) {
      tiles = savedTiles;
      return this;
    };
    get = function(x, y) {
      var key;
      key = x + '-' + y;
      return tiles[key];
    };
    newGame = function(sizeX, sizeY, numOfMines) {
      var mineNum, mineX, mineY, x, y, _i, _j, _k;
      for (y = _i = 0; 0 <= sizeY ? _i <= sizeY : _i >= sizeY; y = 0 <= sizeY ? ++_i : --_i) {
        for (x = _j = 0; 0 <= sizeX ? _j <= sizeX : _j >= sizeX; x = 0 <= sizeX ? ++_j : --_j) {
          tiles[x + '-' + y] = {
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
        mineX = Math.floor(Math.random() * sizeX);
        mineY = Math.floor(Math.random() * sizeY);
        get(mineX, mineY).isMine = true;
        tallyAdjacentMines(mineX, mineY);
      }
      info.refresh();
      return this;
    };
    tallyAdjacentMines = function(x, y) {
      var adjacentTile, tile, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = adjacentTiles.length; _i < _len; _i++) {
        adjacentTile = adjacentTiles[_i];
        tile = get(x + adjacentTile[0], y + adjacentTile[1]);
        if (tile !== void 0) {
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
        neighbor = get(tile.x + adjacentTile[0], tile.y + adjacentTile[1]);
        if (neighbor !== void 0) {
          if (neighbor.adjacentMines === 0 && neighbor.isClear === false && neighbor.isMine === false) {
            _results.push(clearTile(neighbor));
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
      if (tile.isFlagged === true) {
        return tile.isFlagged = false;
      } else {
        return tile.isFlagged = true;
      }
    };
    checkTile = function(x, y, event) {
      var tile;
      tile = get(x, y);
      if (event.shiftKey === true || event.altKey === true) {
        return toggleFlag(tile);
      } else {
        return clearTile(tile);
      }
    };
    return {
      newGame: newGame,
      info: info,
      tiles: tiles,
      checkTile: checkTile
    };
  };
  return board();
});

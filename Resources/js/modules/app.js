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

minesweeperApp.factory('board', function() {
  var board;
  board = function() {
    var adjacentTiles, autoSelect, checkTile, clearNeighbors, clearTile, get, info, loadGame, newGame, noMineFirstClick, randomSafeTile, tallyAdjacentMines, tiles, toggleFlag;
    tiles = {};
    info = {
      loss: false,
      win: false,
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
          if (tile.isMine === true && tile.isClear === true) {
            this.loss = true;
          }
        }
        if (this.loss === false && info.numOfTiles - info.numOfMines - info.numOfClears === 0) {
          this.win = true;
        }
        return this;
      }
    };
    adjacentTiles = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    get = function(x, y) {
      var key;
      key = x + '-' + y;
      return tiles[key];
    };
    newGame = function(sizeX, sizeY, numOfMines) {
      var mineNum, tile, x, y, _i, _j, _k;
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
        tile = randomSafeTile();
        tile.isMine = true;
        tallyAdjacentMines(tile);
      }
      this.info.refresh();
      return this;
    };
    loadGame = function(savedTiles) {
      tiles = savedTiles;
      info.refresh();
      return this;
    };
    tallyAdjacentMines = function(tile) {
      var adjacentTile, x, y, _i, _len, _results;
      x = tile.x;
      y = tile.y;
      _results = [];
      for (_i = 0, _len = adjacentTiles.length; _i < _len; _i++) {
        adjacentTile = adjacentTiles[_i];
        tile = get(x + adjacentTile[0], y + adjacentTile[1]);
        if (tile != null) {
          _results.push(tile.adjacentMines++);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    clearTile = function(tile) {
      noMineFirstClick(tile);
      tile.isClear = true;
      tile.isFlagged = false;
      return clearNeighbors(tile);
    };
    noMineFirstClick = function(tile) {
      if (info.numOfClears === 0 && tile.isMine === true) {
        tile.isMine = false;
        return randomSafeTile().isMine = true;
      }
    };
    clearNeighbors = function(tile) {
      var adjacentTile, neighbor, _i, _len, _results;
      if (tile.adjacentMines === 0) {
        _results = [];
        for (_i = 0, _len = adjacentTiles.length; _i < _len; _i++) {
          adjacentTile = adjacentTiles[_i];
          neighbor = get(tile.x + adjacentTile[0], tile.y + adjacentTile[1]);
          if (neighbor != null) {
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
      }
    };
    toggleFlag = function(tile) {
      if (tile.isFlagged === true) {
        tile.isFlagged = false;
      } else {
        tile.isFlagged = true;
      }
      return tile;
    };
    checkTile = function(x, y, event) {
      var tile;
      tile = get(x, y);
      if (event.shiftKey === true || event.altKey === true) {
        toggleFlag(tile);
      } else {
        clearTile(tile);
      }
      info.refresh();
      return tiles;
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
        clearTile(tile);
      }
      info.refresh();
      return tiles;
    };
    return {
      newGame: newGame,
      loadGame: loadGame,
      info: info,
      tiles: tiles,
      checkTile: checkTile,
      autoSelect: autoSelect
    };
  };
  return board();
});

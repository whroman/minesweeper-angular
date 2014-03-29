var msCollection;

msCollection = angular.module('msCollection', ['msModel', 'msModelMethods']);

msCollection.factory('collection', function(model, modelMethods) {
  var collection;
  collection = function() {
    var autoSelect, checkTile, get, info, loadGame, newGame, randomSafeTile, tiles;
    tiles = {};
    newGame = function(sizeX, sizeY, numOfMines) {
      var mineNum, tile, x, y, _i, _j, _k, _ref, _ref1;
      this.tiles = {};
      for (y = _i = 0, _ref = sizeY - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
        for (x = _j = 0, _ref1 = sizeX - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
          this.tiles[x + '-' + y] = modelMethods(model(x, y), {
            get: (function(_this) {
              return function(x, y) {
                return _this.get(x, y);
              };
            })(this),
            randomSafeTile: this.randomSafeTile,
            info: this.info
          });
        }
      }
      for (mineNum = _k = 1; 1 <= numOfMines ? _k <= numOfMines : _k >= numOfMines; mineNum = 1 <= numOfMines ? ++_k : --_k) {
        tile = this.randomSafeTile();
        tile.model.isMine = true;
        tile.tallyAdjacentMines();
      }
      return this;
    };
    loadGame = function(savedTiles) {
      var key, test, tile, _ref;
      this.tiles = savedTiles;
      _ref = this.tiles;
      for (key in _ref) {
        tile = _ref[key];
        test = this.tiles[key];
        this.tiles[key] = modelMethods(this.tiles[key].model, {
          get: (function(_this) {
            return function(x, y) {
              return _this.get(x, y);
            };
          })(this),
          randomSafeTile: this.randomSafeTile,
          info: this.info
        });
      }
      return this;
    };
    info = {
      refresh: function(tiles) {
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
          if (tile.model.isClear === true) {
            this.numOfClears++;
          }
          if (tile.model.isFlagged === true) {
            this.numOfFlags++;
          }
          if (tile.model.isMine === true) {
            this.numOfMines++;
          }
          if (tile.model.isMine === true && tile.model.isClear === true) {
            this.loss = true;
          }
        }
        if (this.loss === false && this.numOfTiles - this.numOfMines - this.numOfClears === 0) {
          this.win = true;
        }
        return this;
      }
    };
    get = function(x, y) {
      var key;
      key = x + '-' + y;
      return this.tiles[key];
    };
    randomSafeTile = function() {
      var availTiles, key, randomTile, tile, _ref;
      availTiles = [];
      _ref = this.tiles;
      for (key in _ref) {
        tile = _ref[key];
        if (tile.model.isClear === false && tile.model.isMine === false) {
          availTiles.push(tile);
        }
      }
      randomTile = availTiles[Math.floor(Math.random() * availTiles.length)];
      return randomTile;
    };
    autoSelect = function(num) {
      var tile;
      while (num--) {
        tile = this.randomSafeTile();
        tile.clear();
      }
      return this.tiles;
    };
    checkTile = function(x, y, event) {
      var tile;
      tile = this.get(x, y);
      if (event.shiftKey === true || event.altKey === true) {
        tile.toggleFlag();
      } else {
        tile.clear();
      }
      return this.tiles;
    };
    return {
      tiles: tiles,
      newGame: newGame,
      loadGame: loadGame,
      info: info,
      randomSafeTile: randomSafeTile,
      get: get,
      autoSelect: autoSelect,
      checkTile: checkTile
    };
  };
  return collection();
});

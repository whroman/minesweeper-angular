angular.module('CollectTiles', ['ModelTile', 'angularLocalStorage']).factory('CollectTiles', function(storage, ModelTile) {
  var add, autoSelect, exposeToModel, get, getAll, loadGame, newGame, randomSafeTile, tallyMines, tiles;
  tiles = [];
  exposeToModel = function() {
    return {
      collection: {
        get: (function(_this) {
          return function(attrs) {
            return _this.get(attrs);
          };
        })(this),
        getAll: (function(_this) {
          return function(attrs) {
            return _this.getAll(attrs);
          };
        })(this)
      }
    };
  };
  get = function(attrs) {
    return this.getAll(attrs)[0];
  };
  getAll = function(attrs) {
    var key, matches, numOfAttrs, numOfMatchedAttrs, tile, val, _i, _j, _len, _len1, _ref, _ref1;
    matches = [];
    if (attrs === void 0) {
      _ref = this.tiles;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tile = _ref[_i];
        matches.push(tile);
      }
    } else {
      _ref1 = this.tiles;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        tile = _ref1[_j];
        numOfAttrs = 0;
        numOfMatchedAttrs = 0;
        for (key in attrs) {
          val = attrs[key];
          numOfAttrs++;
          if (tile.model[key] === val) {
            numOfMatchedAttrs++;
          }
        }
        if (numOfMatchedAttrs === numOfAttrs) {
          matches.push(tile);
        }
      }
    }
    return matches;
  };
  tallyMines = function() {
    var adjacentTile, neighborAttrs, neighborMine, neighborMines, neighborX, neighborY, tile, _i, _j, _len, _len1, _ref, _ref1;
    _ref = this.getAll();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tile = _ref[_i];
      neighborMines = 0;
      _ref1 = tile.adjacentTiles;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        adjacentTile = _ref1[_j];
        neighborX = tile.model.x + adjacentTile[0];
        neighborY = tile.model.y + adjacentTile[1];
        neighborAttrs = {
          isMine: true,
          x: neighborX,
          y: neighborY
        };
        neighborMine = this.get(neighborAttrs);
        if (neighborMine !== void 0) {
          neighborMines++;
        }
      }
      tile.model.adjacentMines = neighborMines;
    }
    return this;
  };
  randomSafeTile = function() {
    var findAttrs, randomTile, safeTiles;
    findAttrs = {
      isClear: false,
      isMine: false
    };
    safeTiles = this.getAll(findAttrs);
    randomTile = safeTiles[Math.floor(Math.random() * safeTiles.length)];
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
  newGame = function(sizeX, sizeY, numOfMines) {
    var attrs, mineNum, tile, x, y, _i, _j, _k, _ref, _ref1;
    this.tiles = [];
    for (y = _i = 0, _ref = sizeY - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      for (x = _j = 0, _ref1 = sizeX - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        attrs = {
          x: x,
          y: y
        };
        this.add(attrs);
      }
    }
    for (mineNum = _k = 1; 1 <= numOfMines ? _k <= numOfMines : _k >= numOfMines; mineNum = 1 <= numOfMines ? ++_k : --_k) {
      tile = this.randomSafeTile();
      tile.model.isMine = true;
    }
    this.tallyMines();
    return this;
  };
  loadGame = function(savedTiles) {
    var tile, _i, _len;
    this.tiles = [];
    for (_i = 0, _len = savedTiles.length; _i < _len; _i++) {
      tile = savedTiles[_i];
      this.add(tile.model);
    }
    return this;
  };
  add = function(model) {
    var tile;
    tile = ModelTile(model).extend(this.exposeToModel());
    return this.tiles.push(tile);
  };
  return {
    tiles: tiles,
    newGame: newGame,
    loadGame: loadGame,
    randomSafeTile: randomSafeTile,
    tallyMines: tallyMines,
    get: get,
    getAll: getAll,
    add: add,
    autoSelect: autoSelect,
    exposeToModel: exposeToModel
  };
});

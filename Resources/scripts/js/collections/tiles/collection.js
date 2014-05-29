angular.module('CollectTiles', ['ModelTile', 'ModelBoardInfo', 'angularLocalStorage']).factory('CollectTiles', function(storage, ModelTile, ModelBoardInfo) {
  var autoSelect, exposeToModel, get, getAll, info, loadGame, newGame, randomSafeTile, tallyMines, tiles;
  tiles = [];
  info = ModelBoardInfo;
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
        })(this),
        infoRefresh: (function(_this) {
          return function() {
            return _this.info.update(_this.tiles);
          };
        })(this),
        info: this.info,
        randomSafeTile: this.randomSafeTile,
        tallyMines: this.tallyMines
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
    var adjacentTile, neighborMine, neighborMines, neighborX, neighborY, tile, _i, _j, _len, _len1, _ref, _ref1;
    _ref = this.getAll();
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tile = _ref[_i];
      neighborMines = 0;
      _ref1 = tile.adjacentTiles;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        adjacentTile = _ref1[_j];
        neighborX = tile.model.x + adjacentTile[0];
        neighborY = tile.model.y + adjacentTile[1];
        neighborMine = this.get({
          isMine: true,
          x: neighborX,
          y: neighborY
        });
        if (neighborMine !== void 0) {
          neighborMines++;
        }
      }
      tile.model.adjacentMines = neighborMines;
    }
    return this;
  };
  randomSafeTile = function() {
    var find, randomTile, safeTiles;
    find = {
      isClear: false,
      isMine: false
    };
    safeTiles = this.getAll(find);
    randomTile = safeTiles[Math.floor(Math.random() * safeTiles.length)];
    return randomTile;
  };
  autoSelect = function(num) {
    var tile;
    while (num--) {
      tile = this.randomSafeTile();
      tile.clear();
    }
    this.info.update(this.tiles);
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
        this.tiles.push(ModelTile(attrs).extend(this.exposeToModel()));
      }
    }
    for (mineNum = _k = 1; 1 <= numOfMines ? _k <= numOfMines : _k >= numOfMines; mineNum = 1 <= numOfMines ? ++_k : --_k) {
      tile = this.randomSafeTile();
      tile.model.isMine = true;
    }
    this.tallyMines();
    this.info.update(this.tiles);
    return this;
  };
  loadGame = function(savedTiles) {
    var loadedTiles, savedTile, tile, _i, _len;
    loadedTiles = [];
    for (_i = 0, _len = savedTiles.length; _i < _len; _i++) {
      tile = savedTiles[_i];
      savedTile = ModelTile(tile.model).extend(this.exposeToModel());
      loadedTiles.push(savedTile);
    }
    this.tiles = loadedTiles;
    this.info.update(this.tiles);
    return this;
  };
  return {
    tiles: tiles,
    newGame: newGame,
    loadGame: loadGame,
    info: info,
    randomSafeTile: randomSafeTile,
    tallyMines: tallyMines,
    get: get,
    getAll: getAll,
    autoSelect: autoSelect,
    exposeToModel: exposeToModel
  };
});

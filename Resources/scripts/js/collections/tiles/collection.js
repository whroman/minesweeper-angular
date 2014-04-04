angular.module('CollectTiles', ['ModelTile', 'angularLocalStorage']).factory('CollectTiles', function(storage, ModelTile) {
  var autoSelect, checkTile, exposeToModel, get, getAll, info, infoRefresh, init, loadGame, newGame, randomSafeTile, tallyMines, tiles;
  tiles = {};
  info = {};
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
        info: this.info,
        randomSafeTile: this.randomSafeTile,
        tallyMines: this.tallyMines
      }
    };
  };
  infoRefresh = function() {
    var key, tile, _ref;
    this.info.loss = false;
    this.info.win = false;
    this.info.numOfTiles = 0;
    this.info.numOfClears = 0;
    this.info.numOfFlags = 0;
    this.info.numOfMines = 0;
    _ref = this.tiles;
    for (key in _ref) {
      tile = _ref[key];
      this.info.numOfTiles++;
      if (tile.model.isClear === true) {
        this.info.numOfClears++;
      }
      if (tile.model.isFlagged === true) {
        this.info.numOfFlags++;
      }
      if (tile.model.isMine === true) {
        this.info.numOfMines++;
      }
      if (tile.model.isMine === true && tile.model.isClear === true) {
        this.info.loss = true;
      }
    }
    if (this.info.loss === false && this.info.numOfTiles - this.info.numOfMines - this.info.numOfClears === 0) {
      this.info.win = true;
    }
    return this.info;
  };
  get = function(attrs) {
    return this.getAll(attrs)[0];
  };
  getAll = function(attrs) {
    var key, matches, numOfAttrs, numOfMatchedAttrs, tile, val, _ref, _ref1;
    matches = [];
    if (attrs === void 0) {
      _ref = this.tiles;
      for (key in _ref) {
        tile = _ref[key];
        matches.push(tile);
      }
    } else {
      _ref1 = this.tiles;
      for (key in _ref1) {
        tile = _ref1[key];
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
    var adjacentTile, neighborMine, neighborMines, tile, _i, _j, _len, _len1, _ref, _ref1, _results;
    _ref = this.getAll();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tile = _ref[_i];
      neighborMines = 0;
      _ref1 = tile.adjacentTiles;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        adjacentTile = _ref1[_j];
        neighborMine = this.get({
          isMine: true,
          x: tile.model.x + adjacentTile[0],
          y: tile.model.y + adjacentTile[1]
        });
        if (neighborMine !== void 0) {
          neighborMines++;
        }
      }
      _results.push(tile.model.adjacentMines = neighborMines);
    }
    return _results;
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
    this.infoRefresh();
    return this.tiles;
  };
  checkTile = function(x, y, event) {
    var tile;
    tile = this.get({
      x: x,
      y: y
    });
    if (event.shiftKey === true || event.altKey === true) {
      tile.toggleFlag();
    } else {
      tile.clear();
    }
    this.infoRefresh();
    return this.tiles;
  };
  newGame = function(sizeX, sizeY, numOfMines) {
    var attrs, mineNum, tile, x, y, _i, _j, _k, _ref, _ref1;
    this.tiles = {};
    for (y = _i = 0, _ref = sizeY - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; y = 0 <= _ref ? ++_i : --_i) {
      for (x = _j = 0, _ref1 = sizeX - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; x = 0 <= _ref1 ? ++_j : --_j) {
        attrs = {
          x: x,
          y: y
        };
        this.tiles[x + '-' + y] = ModelTile(attrs).extend(this.exposeToModel());
      }
    }
    for (mineNum = _k = 1; 1 <= numOfMines ? _k <= numOfMines : _k >= numOfMines; mineNum = 1 <= numOfMines ? ++_k : --_k) {
      tile = this.randomSafeTile();
      tile.model.isMine = true;
    }
    this.tallyMines();
    this.infoRefresh();
    return this;
  };
  loadGame = function(savedTiles) {
    var key, test, tile, _ref;
    this.tiles = savedTiles;
    _ref = this.tiles;
    for (key in _ref) {
      tile = _ref[key];
      test = this.tiles[key];
      this.tiles[key] = ModelTile(this.tiles[key].model).extend(this.exposeToModel());
    }
    this.infoRefresh();
    return this;
  };
  init = function(scope, info) {
    var board;
    board = void 0;
    if (storage.get('tiles') === null) {
      board = this.newGame(info.x.val, info.y.val, info.mines.val);
    } else {
      board = this.loadGame(storage.get('tiles'));
    }
    storage.bind(scope, 'tiles');
    return board;
  };
  return {
    init: init,
    tiles: tiles,
    newGame: newGame,
    loadGame: loadGame,
    info: info,
    infoRefresh: infoRefresh,
    randomSafeTile: randomSafeTile,
    tallyMines: tallyMines,
    get: get,
    getAll: getAll,
    autoSelect: autoSelect,
    checkTile: checkTile,
    exposeToModel: exposeToModel
  };
});

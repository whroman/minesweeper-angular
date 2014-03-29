var msModelMethods;

msModelMethods = angular.module('msModelMethods', []);

msModelMethods.service('modelMethods', function() {
  var modelMethods;
  return modelMethods = function(model, collection) {
    this.adjacentTiles = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    this.toggleFlag = function() {
      if (this.model.isFlagged === true) {
        this.model.isFlagged = false;
      } else {
        this.model.isFlagged = true;
      }
      return this;
    };
    this.clear = function() {
      this.noMineFirstClick();
      this.model.isClear = true;
      this.model.isFlagged = false;
      this.clearNeighbors();
      return this;
    };
    this.noMineFirstClick = function() {
      var adjacentTile, neighbor, _i, _len, _ref, _results;
      if (collection.info.numOfClears === 0 && this.model.isMine === true) {
        this.model.isMine = false;
        this.collection.randomSafeTile().isMine = true;
        _ref = this.adjacentTiles;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          adjacentTile = _ref[_i];
          neighbor = this.collection.get(this.model.x + adjacentTile[0], this.model.y + adjacentTile[1]);
          _results.push(this.tallyAdjacentMines());
        }
        return _results;
      }
    };
    this.clearNeighbors = function() {
      var adjacentTile, neighbor, _i, _len, _ref, _results;
      if (this.model.adjacentMines === 0) {
        _ref = this.adjacentTiles;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          adjacentTile = _ref[_i];
          neighbor = this.collection.get(this.model.x + adjacentTile[0], this.model.y + adjacentTile[1]);
          if (neighbor != null) {
            if (neighbor.model.adjacentMines === 0 && neighbor.model.isClear === false && neighbor.model.isMine === false) {
              _results.push(neighbor.clear());
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
    this.tallyAdjacentMines = function() {
      var adjacentTile, neighbor, _i, _len, _ref, _results;
      _ref = this.adjacentTiles;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        adjacentTile = _ref[_i];
        neighbor = this.collection.get(this.model.x + adjacentTile[0], this.model.y + adjacentTile[1]);
        if (neighbor != null) {
          _results.push(neighbor.model.adjacentMines++);
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };
    return {
      model: model,
      collection: collection,
      clear: this.clear,
      toggleFlag: this.toggleFlag,
      clearNeighbors: this.clearNeighbors,
      tallyAdjacentMines: this.tallyAdjacentMines,
      adjacentTiles: this.adjacentTiles,
      noMineFirstClick: this.noMineFirstClick
    };
  };
});

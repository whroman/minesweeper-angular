angular.module('ModelMethodsTile', []).service('ModelMethodsTile', function() {
  var modelMethods;
  return modelMethods = function() {
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
      var adjacentTile, neighbor, _i, _len, _ref;
      if (this.collection.info.numOfClears === 0 && this.model.isMine === true) {
        this.model.isMine = false;
        this.collection.randomSafeTile().model.isMine = true;
        _ref = this.adjacentTiles;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          adjacentTile = _ref[_i];
          neighbor = this.collection.get({
            x: this.model.x + adjacentTile[0],
            y: this.model.y + adjacentTile[1]
          });
        }
        return this.collection.tallyMines();
      }
    };
    this.clearNeighbors = function() {
      var adjacentTile, neighbor, _i, _len, _ref, _results;
      if (this.model.adjacentMines === 0 && this.model.isMine !== false) {
        _ref = this.adjacentTiles;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          adjacentTile = _ref[_i];
          neighbor = this.collection.get({
            x: this.model.x + adjacentTile[0],
            y: this.model.y + adjacentTile[1]
          });
          if (neighbor != null) {
            if (neighbor.model.isClear === false && neighbor.model.isMine === false) {
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
    return {
      clear: this.clear,
      toggleFlag: this.toggleFlag,
      clearNeighbors: this.clearNeighbors,
      adjacentTiles: this.adjacentTiles,
      noMineFirstClick: this.noMineFirstClick
    };
  };
});

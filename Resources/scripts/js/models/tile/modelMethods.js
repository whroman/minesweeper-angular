angular.module('ModelMethodsTile', []).service('ModelMethodsTile', function() {
  var modelMethods;
  return modelMethods = function() {
    var adjacentTiles, check, clear, clearNeighbors, noMineFirstClick, toggleFlag;
    adjacentTiles = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]];
    toggleFlag = function() {
      if (this.model.isFlagged === true) {
        this.model.isFlagged = false;
      } else {
        this.model.isFlagged = true;
      }
      return this;
    };
    clear = function() {
      this.noMineFirstClick();
      this.model.isClear = true;
      this.model.isFlagged = false;
      this.clearNeighbors();
      return this;
    };
    noMineFirstClick = function() {
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
    clearNeighbors = function() {
      var adjacentTile, neighbor, _i, _len, _ref, _results;
      if (this.model.adjacentMines === 0 && this.model.isMine === false) {
        _ref = this.adjacentTiles;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          adjacentTile = _ref[_i];
          neighbor = this.collection.get({
            x: this.model.x + adjacentTile[0],
            y: this.model.y + adjacentTile[1]
          });
          if (neighbor !== void 0) {
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
    check = function(event) {
      if (event.shiftKey === true || event.altKey === true) {
        return this.toggleFlag();
      } else {
        return this.clear();
      }
    };
    return {
      clear: clear,
      check: check,
      toggleFlag: toggleFlag,
      clearNeighbors: clearNeighbors,
      adjacentTiles: adjacentTiles,
      noMineFirstClick: noMineFirstClick
    };
  };
});

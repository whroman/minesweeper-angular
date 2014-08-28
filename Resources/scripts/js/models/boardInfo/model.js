angular.module('ModelBoardInfo', []).factory('ModelBoardInfo', function() {
  var info;
  info = {
    update: function(tiles) {
      var tile, xTiles, yTiles, _i, _len;
      this.x = 0;
      this.y = 0;
      this.loss = false;
      this.win = false;
      this.numOfTiles = 0;
      this.numOfClears = 0;
      this.numOfFlags = 0;
      this.numOfMines = 0;
      xTiles = [];
      yTiles = [];
      for (_i = 0, _len = tiles.length; _i < _len; _i++) {
        tile = tiles[_i];
        this.numOfTiles++;
        if (xTiles.indexOf(tile.model.x) === -1) {
          xTiles.push(tile.model.x);
        }
        if (yTiles.indexOf(tile.model.y) === -1) {
          yTiles.push(tile.model.y);
        }
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
      this.x = xTiles.length;
      this.y = yTiles.length;
      if (this.loss === false && this.numOfTiles - this.numOfMines - this.numOfClears === 0) {
        this.win = true;
      }
      return this;
    }
  };
  return info;
});

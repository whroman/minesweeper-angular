var msGameInfo;

msGameInfo = angular.module('msGameInfo', []);

msGameInfo.factory('gameInfo', function() {
  var gameInfo;
  gameInfo = function() {
    var refresh;
    refresh = function(tiles) {
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
      if (this.loss === false && this.numOfTiles - this.numOfMines - this.numOfClears === 0) {
        this.win = true;
      }
      return this;
    };
    return {
      refresh: refresh
    };
  };
  return gameInfo();
});

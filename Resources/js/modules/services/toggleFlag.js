var msToggleFlag;

msToggleFlag = angular.module('msToggleFlag', []);

msToggleFlag.service('toggleFlag', function() {
  var toggleFlag;
  return toggleFlag = function(tile) {
    if (tile.isFlagged === true) {
      tile.isFlagged = false;
    } else {
      tile.isFlagged = true;
    }
    return tile;
  };
});

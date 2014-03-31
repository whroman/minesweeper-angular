var msModel;

msModel = angular.module('msModel', []);

msModel.service('model', function() {
  var model;
  return model = function(x, y) {
    return {
      x: x,
      y: y,
      isMine: false,
      isClear: false,
      isFlagged: false,
      adjacentMines: 0
    };
  };
});

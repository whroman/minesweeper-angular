var minesweeperCtrl;

minesweeperCtrl = angular.module('minesweeperCtrl', ['angularLocalStorage']);

minesweeperCtrl.controller('Board', function($scope, board, storage) {
  var currentBoard, tiles;
  currentBoard = void 0;
  tiles = void 0;
  if (storage.get('tiles') === null) {
    currentBoard = board.newGame(5, 7, 5);
  } else {
    currentBoard = board.loadGame(storage.get('tiles'));
    currentBoard.tiles = storage.get('tiles');
  }
  storage.bind($scope, 'tiles', currentBoard.tiles);
  $scope.tiles = currentBoard.tiles;
  $scope.info = currentBoard.info;
  $scope.checkTile = (function(_this) {
    return function(event, x, y) {
      return $scope.tiles = currentBoard.checkTile(x, y, event);
    };
  })(this);
  return $scope.autoSelect = function(num) {
    return $scope.tiles = currentBoard.autoSelect(num);
  };
});

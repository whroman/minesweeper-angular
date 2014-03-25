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
      $scope.tiles = currentBoard.checkTile(x, y, event);
      return currentBoard.info.refresh($scope.tiles);
    };
  })(this);
  return $scope.autoSelect = function(num) {
    $scope.tiles = currentBoard.autoSelect(num);
    return currentBoard.info.refresh($scope.tiles);
  };
});

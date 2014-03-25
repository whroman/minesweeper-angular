var app;

app = angular.module('minesweeperCtrl', []);

app.controller('Board', function($scope, board) {
  var newBoard;
  newBoard = board.newGame(5, 7, 5);
  $scope.tiles = newBoard.tiles;
  $scope.info = newBoard.info;
  return $scope.checkTile = function(event, x, y) {
    newBoard.checkTile(x, y, event);
    return $scope.info.refresh();
  };
});

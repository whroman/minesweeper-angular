var app = angular.module(
    'minesweeperCtrl', 
    [
        'angularLocalStorage'
    ]
);

app
.controller(
    'Board', 
    function($scope, board, storage) {

        var newBoard = board.newGame(5, 7, 5)

        $scope.tiles = newBoard.tiles;
        $scope.info = newBoard.info;

        $scope.checkTile = function(event, x, y) {

            newBoard.checkTile(x, y, event);

            $scope.info.refresh();

        }
    }
);
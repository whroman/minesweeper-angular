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
        var currentBoard = undefined;
        
        currentBoard = board.newGame(5, 7, 5)

        $scope.tiles = currentBoard.tiles;

        $scope.info = currentBoard.info;

        $scope.checkTile = function(event, x, y) {

            currentBoard.checkTile(x, y, event);

            $scope.info.refresh();

        }
    }
);
var app = angular.module('minesweeperCtrl', []);

app
.controller(
    'Board', 
    function($scope, board) {
            
        var newBoard = board.set(5, 7, 5)

        $scope.tiles = newBoard.create();
        $scope.info = newBoard.info();
        $scope.checkTile = function(event, x, y) {

            var tile = newBoard.get(x, y)

            newBoard.checkTile(tile, event);

            $scope.info.refresh();

        }
    }
);
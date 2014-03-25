app = angular.module 'minesweeperCtrl', []

app
.controller 'Board', 
    ($scope, board) ->

        newBoard = board.newGame(5, 7, 5)

        # console.log newBoard.info

        $scope.tiles = newBoard.tiles

        $scope.info = newBoard.info

        $scope.checkTile = (event, x, y) ->
            newBoard.checkTile x, y, event

            $scope.info.refresh()
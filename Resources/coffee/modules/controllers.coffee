minesweeperCtrl = angular.module 'minesweeperCtrl', ['angularLocalStorage']

minesweeperCtrl
.controller 'Board', 
    ($scope, board, storage) ->
        currentBoard = undefined
        tiles = undefined

        if storage.get('tiles') == null
            currentBoard = board.newGame 5, 7, 5
        else
            currentBoard = board.loadGame storage.get('tiles')

        storage.bind $scope, 'tiles', currentBoard.tiles

        $scope.tiles = currentBoard.tiles
        $scope.info = currentBoard.info

        $scope.checkTile = (event, x, y) =>
            $scope.tiles = currentBoard.checkTile x, y, event
            currentBoard.info.refresh $scope.tiles

        $scope.autoSelect = (num) ->
            $scope.tiles = currentBoard.autoSelect num 
            currentBoard.info.refresh $scope.tiles
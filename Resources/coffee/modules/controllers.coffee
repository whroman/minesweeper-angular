minesweeperCtrl = angular.module 'minesweeperCtrl', ['angularLocalStorage']

minesweeperCtrl
.controller 'Board', 
    ($scope, board, storage) ->
        currentBoard = undefined

        if storage.get('tiles') == null
            currentBoard = board.newGame 5, 7, 5
        else
            currentBoard = board.loadGame storage.get('tiles')

        storage.bind $scope, 'tiles', currentBoard.tiles

        $scope.tiles = currentBoard.tiles
        $scope.info = currentBoard.info.refresh $scope.tiles
        
        $scope.overlay = {
            instructions: false
            newGame     : false
        }

        $scope.checkTile = (event, x, y) ->
            $scope.tiles = currentBoard.checkTile x, y, event
            $scope.info.refresh $scope.tiles
            

        $scope.autoSelect = (num) ->
            $scope.tiles = currentBoard.autoSelect num 
            $scope.info.refresh currentBoard.tiles

        $scope.newGame = (sizeX, sizeY, numOfMines) -> 
            currentBoard = board.newGame sizeX, sizeY, numOfMines
            $scope.tiles = currentBoard.tiles
            $scope.info = currentBoard.info.refresh currentBoard.tiles

            $scope.overlayReset()

        $scope.toggleOverlay = (name) ->
            if ($scope.info.win == false && $scope.info.loss == false)
                if ($scope.overlay[name] == true)
                    $scope.overlay[name] = false
                else
                    $scope.overlay[name] = true

        $scope.overlayReset = () ->
            for key, panel of $scope.overlay
                $scope.overlay[key] = false
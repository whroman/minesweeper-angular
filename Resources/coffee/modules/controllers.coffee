minesweeperCtrl = angular.module(
    'minesweeperCtrl', 
    # Dependencies
    ['angularLocalStorage', 'ngSlider']
)

minesweeperCtrl
.controller 'Board', 
    ($scope, board, storage) ->
        currentBoard = undefined

        if storage.get('tiles') == null
            currentBoard = board.newGame 5, 7, 5
        else
            currentBoard = board.loadGame storage.get('tiles')

        storage.bind $scope, 'tiles'

        $scope.tiles = currentBoard.tiles
        $scope.info = currentBoard.info.refresh $scope.tiles
        
        $scope.overlay = {
            instructions: false
            newGame     : false
        }

        $scope.newGameInfo = {
            mines   : {
                val     : undefined,
                options : undefined
            }
        }

        $scope.sliderRefresh = () ->
            currentVal = $scope.newGameInfo.mines.val
            newVal = Math.floor( $scope.newGameInfo.x.val * $scope.newGameInfo.y.val / 3 ).toString()
            newFrom = Math.floor( $scope.newGameInfo.x.val * $scope.newGameInfo.y.val / 4 )
            newTo = Math.floor( $scope.newGameInfo.x.val * $scope.newGameInfo.y.val / 2 )

            $scope.newGameInfo.mines.options = {
                from    : newFrom
                to      : newTo
                step    : $scope.newGameInfo.x.options.step
            }

            if (currentVal == undefined || (currentVal < newFrom && currentVal > newTo))
                $scope.newGameInfo.mines.val = newVal

        $scope.newGameInfo.x    = {
            val : '8'
            options : {
                from    : 5
                to      : 15
                step    : 1
            }
        }

        $scope.newGameInfo.y    = {
            val : $scope.newGameInfo.x.val
            options : {
                from    : $scope.newGameInfo.x.options.from
                to      : $scope.newGameInfo.x.options.to
                step    : $scope.newGameInfo.x.options.step
            }
        }

        $scope.sliderRefresh()


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

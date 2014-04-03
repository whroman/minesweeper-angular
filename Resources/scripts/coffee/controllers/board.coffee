msBoard = angular
    .module 'msControllerBoard',
    # Dependencies
    [
        'angularLocalStorage', 
        'ngSlider',
        'msSliderInfo'
    ]

msBoard
.controller 'board', 
    ($scope, storage, collection, sliderInfo) ->

        $scope.modals = {
            path    : {}
            show    : {}
            set     : (path, fileNames) ->
                for fileName in fileNames
                    this.path[fileName] = path + fileName + '.html'
                    this.show[fileName] = false
                return this
            toggle  : (name) ->
                if ($scope.info.win == false && $scope.info.loss == false)
                    if (this.show[name] == true)
                        this.show[name] = false
                    else
                        this.show[name] = true
                return this

            reset   : () ->
                for key, showModal of this.show
                    this.show[key] = false
                return this
        }

        $scope.modals.set('Resources/templates/modals/', [
            'instructions',
            'newGame'
        ])


        currentBoard = undefined

        if storage.get('tiles') == null
            currentBoard = collection.newGame 5, 7, 5
        else
            currentBoard = collection.loadGame storage.get('tiles')

        storage.bind $scope, 'tiles'

        $scope.tiles = currentBoard.tiles
        $scope.info = collection.info.refresh currentBoard.tiles

        $scope.newGameInfo = sliderInfo.init 5, 15, 8

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

            if (currentVal == undefined || currentVal < newFrom || currentVal > newTo)
                $scope.newGameInfo.mines.val = newVal

        $scope.sliderRefresh()


        $scope.checkTile = (event, x, y) ->
            $scope.tiles = collection.checkTile x, y, event
            collection.info.refresh $scope.tiles
            storage.get('tiles')

        $scope.autoSelect = (num) ->
            $scope.tiles = collection.autoSelect num 
            collection.info.refresh currentBoard.tiles

        $scope.newGame = (sizeX, sizeY, numOfMines) -> 
            currentBoard = collection.newGame sizeX, sizeY, numOfMines
            $scope.tiles = currentBoard.tiles
            $scope.info = collection.info.refresh currentBoard.tiles

            $scope.modals.reset()
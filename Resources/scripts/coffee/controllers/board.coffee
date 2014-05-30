angular
.module 'CtrlBoard',
# Dependencies
[
    'ngSlider',
    'CollectTiles',
    'ModelSliders',
    'ModelModals',
    'ModelBoardInfo'
]

.controller 'CtrlBoard', 
($scope, storage, CollectTiles, ModelSliders, ModelModals, ModelBoardInfo) ->

    noMineFirstClick = (tile) ->
        if $scope.info.numOfClears is 0 and tile.model.isMine is true
            tile.model.isMine = false
            currentBoard.randomSafeTile().model.isMine = true
            currentBoard.tallyMines()

        return tile

    init = (boardInstance, info) ->
        board  = undefined
        if storage.get('tiles') == null
            board = boardInstance.newGame info.x.val, info.y.val, info.mines.val
        else
            board = boardInstance.loadGame storage.get('tiles')

        storage.bind $scope, 'tiles'

        return board

    $scope.modals = ModelModals.set(
        'Resources/templates/modals/', 
        [
            'instructions',
            'newGame'
        ]
    )

    $scope.sliders = ModelSliders.init 5, 20, 10

    currentBoard = init CollectTiles, $scope.sliders.info

    $scope.tiles = currentBoard.tiles
    $scope.info = ModelBoardInfo

    $scope.ui = {
        autoSelect: (num) ->
            $scope.tiles = currentBoard.autoSelect num 

        newGame: (sizeX, sizeY, numOfMines) -> 
            currentBoard = CollectTiles.newGame sizeX, sizeY, numOfMines

            $scope.tiles = currentBoard.tiles

            $scope.modals.reset()

            return currentBoard

        tileClick: (event, tile) ->
            if event.shiftKey is true or event.altKey is true
                tile.toggleFlag()
            else
                noMineFirstClick(tile)
                tile.clear()

            return tile
    }


    # Update game info when change to properties listed below change for any tile
    tiles = {
        watchedAttrs: [
            'isClear',
            'isFlagged'
        ]

        watch: () ->
            toWatch = [];
            for tile in $scope.tiles
                for watchedAttr in this.watchedAttrs
                    toWatch.push tile.model[watchedAttr]
            return toWatch

        onChange: () ->
            $scope.info.update($scope.tiles)
            return $scope.tiles            
    }

    $scope.$watchCollection tiles.watch.bind(tiles), tiles.onChange

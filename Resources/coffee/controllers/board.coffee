angular
.module 'CtrlBoard', [
# Dependencies
    'ngSlider'
    'CollectTiles'
    'ModelSliders'
    'ModelModals'
    'ModelBoardInfo'
    'angularLocalStorage'
]
.controller 'CtrlBoard', (
    $scope,
    storage,
    CollectTiles,
    ModelSliders,
    ModelModals,
    ModelBoardInfo
) ->
    noMineFirstClick = (tile) ->
        if $scope.info.numOfClears is 0 and tile.model.isMine is true
            tile.model.isMine = false
            $scope.tiles.randomSafeTile().model.isMine = true
            $scope.tiles.tallyMines()

        return tile

    save = ->
        storage.set 'tiles', $scope.tiles.all

    $scope.modals = ModelModals.set(
        'Resources/templates/modals/',
        [
            'instructions',
            'newGame'
        ]
    )

    $scope.sliders = ModelSliders.init 5, 20, 10

    # Load or Create game
    savedGame = storage.get 'tiles'

    if savedGame
        $scope.tiles = new CollectTiles savedGame
    else
        $scope.tiles = new CollectTiles(
            $scope.sliders.info.x.val,
            $scope.sliders.info.y.val,
            $scope.sliders.info.mines.val
        )

    save()

    $scope.info = ModelBoardInfo
    $scope.info.update $scope.tiles.all

    $scope.ui = {
        newGame: (sizeX, sizeY, numOfMines) ->
            $scope.tiles = new CollectTiles sizeX, sizeY, numOfMines
            $scope.info.update $scope.tiles.all
            $scope.modals.reset()

        tileClick: (event, tile) ->
            flagKeyWasPressed = (
                event.shiftKey is true or
                event.altKey is true
            )

            if flagKeyWasPressed
                tile.toggleFlag()
            else
                noMineFirstClick(tile)
                tile.clear()
    }

    $scope.$on 'Tile:Clear', ($ev, tile) ->
        $scope.info.update $scope.tiles.all
        save()


    $scope.$on 'Tile:Flag', ($ev, tile) ->
        $scope.info.update $scope.tiles.all
        save()

    window.logScope = () ->
        window.$scope = $scope
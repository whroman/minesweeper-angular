angular
.module 'CtrlBoard',
# Dependencies
[
    'angularLocalStorage', 
    'ngSlider',
    'CollectTiles',
    'ModelSliders',
    'ModelModals'
]

.controller 'CtrlBoard', 
($scope, storage, CollectTiles, ModelSliders, ModelModals) ->

    $scope.modals = ModelModals.set('Resources/templates/modals/', [
        'instructions',
        'newGame'
    ])

    currentBoard = undefined

    if storage.get('tiles') == null
        currentBoard = CollectTiles.newGame 5, 7, 5
    else
        currentBoard = CollectTiles.loadGame storage.get('tiles')

    storage.bind $scope, 'tiles'

    $scope.tiles = currentBoard.tiles
    $scope.info = CollectTiles.info.refresh currentBoard.tiles

    $scope.sliders = ModelSliders
        .init(5, 15, 8)
        .refresh()


    $scope.checkTile = (event, x, y) ->
        $scope.tiles = CollectTiles.checkTile x, y, event
        CollectTiles.info.refresh $scope.tiles
        storage.get('tiles')

    $scope.autoSelect = (num) ->
        $scope.tiles = CollectTiles.autoSelect num 
        CollectTiles.info.refresh currentBoard.tiles

    $scope.newGame = (sizeX, sizeY, numOfMines) -> 
        currentBoard = CollectTiles.newGame sizeX, sizeY, numOfMines
        $scope.tiles = currentBoard.tiles
        $scope.info = CollectTiles.info.refresh currentBoard.tiles

        $scope.modals.reset()

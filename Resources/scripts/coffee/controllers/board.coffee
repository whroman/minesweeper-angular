angular
.module 'CtrlBoard',
# Dependencies
[
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

    $scope.sliders = ModelSliders.init 5, 15, 8

    CollectTiles.init $scope, $scope.sliders.info

    $scope.tiles = CollectTiles.tiles
    $scope.info = CollectTiles.info

    $scope.checkTile = (event, x, y) ->
        CollectTiles.checkTile x, y, event

    $scope.autoSelect = (num) ->
        CollectTiles.autoSelect num 

    $scope.newGame = (sizeX, sizeY, numOfMines) -> 
        CollectTiles.newGame sizeX, sizeY, numOfMines

        $scope.modals.reset()

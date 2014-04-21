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

    $scope.sliders = ModelSliders.init 5, 20, 10

    currentBoard = CollectTiles.init $scope, $scope.sliders.info

    $scope.tiles = currentBoard.tiles
    $scope.info = currentBoard.info

    $scope.autoSelect = (num) ->
        $scope.tiles = currentBoard.autoSelect num 

    $scope.newGame = (sizeX, sizeY, numOfMines) -> 
        currentBoard = CollectTiles.newGame sizeX, sizeY, numOfMines

        $scope.tiles = currentBoard.tiles
        $scope.info = currentBoard.info

        $scope.modals.reset()

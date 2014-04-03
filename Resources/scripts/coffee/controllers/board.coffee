msBoard = angular
    .module 'msControllerBoard',
    # Dependencies
    [
        'angularLocalStorage', 
        'ngSlider',
        'msSliderInfo',
        'modelModals'
    ]

msBoard
.controller 'board', 
    ($scope, storage, collection, slider, modelModals) ->

        $scope.modals = modelModals.set('Resources/templates/modals/', [
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

        $scope.slider = slider
            .init(5, 15, 8)
            .refresh()


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

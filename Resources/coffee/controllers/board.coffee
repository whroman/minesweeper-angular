angular
.module 'CtrlBoard', [
# Dependencies
    'ngSlider'
    'CollectTiles'
    'ModelSliders'
    'ModelModals'
    'angularLocalStorage'
]
.controller 'CtrlBoard', (
    $scope,
    storage,
    CollectTiles,
    ModelSliders,
    ModelModals,
) ->
    # Init modals
    $scope.modals = ModelModals.set(
        'Resources/templates/modals/',
        [
            'instructions',
            'newGame'
        ]
    )

    # Init modal sliders
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

    # Persist `tiles` data and set up event to persists when `tiles` is updated
    save = ->
        storage.set 'tiles', $scope.tiles.all

    save()
    $scope.$on 'Tiles:Updated', ->
        save()

    $scope.$on 'Tiles:NewGame', ->
        save()
        $scope.modals.reset()

    window.logScope = () ->
        window.$scope = $scope
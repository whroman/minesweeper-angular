var minesweeperCtrl = angular.module(
    'minesweeperCtrl', 
    [
        'angularLocalStorage',
    ]
);

minesweeperCtrl
.controller(
    'Board', 
    function($scope, board, storage) {
        var currentBoard = undefined;
        var tiles = undefined;
        
        if (storage.get('tiles') === null) {
            currentBoard = board.newGame(5, 7, 5)

        } else {
            currentBoard = board.loadGame(storage.get('tiles'))
            currentBoard.tiles = storage.get('tiles')
        }

        storage.bind(
            $scope,
            'tiles'
            , currentBoard.tiles
        )

        $scope.tiles = currentBoard.tiles;
        $scope.info = currentBoard.info;

        $scope.checkTile = function(event, x, y) {
            $scope.tiles = currentBoard.checkTile(x, y, event)

            currentBoard.info.refresh();
        }

        $scope.autoSelect = function(num) {
            $scope.tiles = currentBoard.autoSelect(num);

            currentBoard.info.refresh();
        }
    }
);
var app = angular.module(
    'minesweeperApp', 
    // Dependencies
    [
        'minesweeperCtrl',
        'ngRoute',
    ]
);

app.config(
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl : './Resources/view/board.html',
                controller  : 'Board'
            })

        $locationProvider.html5Mode(true);
    }
);

app.factory('board', function() {
    var board = function(){

        var tiles = {};

        var info = {

            numOfTiles  : 0,
            numOfMines  : 0,
            numOfFlags  : 0,
            numOfClears : 0,
            refresh : function() {
                console.log(this)
                this.numOfTiles  = 0;
                this.numOfClears = 0;
                this.numOfFlags  = 0;
                this.numOfMines  = 0;

                for (tile in tiles) {

                    // All Tiles
                    this.numOfTiles++

                    // Cleared Tiles
                    if (tiles[tile].isClear === true) {
                        this.numOfClears++
                    }

                    // Flagged Tiles
                    if (tiles[tile].isFlagged === true) {
                        this.numOfFlags++
                    }

                    // Mined Tiles
                    if (tiles[tile].isMine === true) {
                        this.numOfMines++
                    }
                }

                return this
            }
        }

        var adjacentTiles = [
            [-1, -1], [ 0, -1], [ 1, -1],
            [-1,  0],           [ 1,  0],
            [-1,  1], [ 0,  1], [ 1,  1],
        ]

        function resumeGame(savedTiles) {
            tiles = savedTiles;

            return this
        }

        function get(x, y) {
            var key = x + '-' + y,
                tile = tiles[key];

            return tile
        };

        function newGame(sizeX, sizeY, numOfMines) {
            for (var y = 0; y < sizeY; y++) {

                for (var x = 0; x < sizeX; x++) {
                    this.tiles[x + '-' + y] = {
                        x : x,
                        y : y,
                        isMine  : false,
                        isClear : false,
                        isFlagged   : false,
                        adjacentMines   : 0,
                    };
                }
            }

            for (var mineNum = 0; mineNum < numOfMines; mineNum++) {
                var mineX = Math.floor(Math.random() * sizeX)
                var mineY = Math.floor(Math.random() * sizeY)

                get(mineX, mineY).isMine = true;
                tallyAdjacentMines(mineX, mineY);
            }

            info.refresh()

            return this
        };
        
        function tallyAdjacentMines(x, y) {
            for (var key = 0; key < adjacentTiles.length; key++) {
                var tile = get(
                    x + adjacentTiles[key][0], 
                    y + adjacentTiles[key][1]
                );
                if (tile != undefined) {
                    tile.adjacentMines++
                }
            }
        };

        function clearTile(tile) {


            tile.isClear = true;
            tile.isFlagged = false;


            for (var key = 0; key < adjacentTiles.length; key++) {
                var neighbor = get(
                    tile.x + adjacentTiles[key][0], 
                    tile.y + adjacentTiles[key][1]
                );

                if (neighbor != undefined) {            
                    if (neighbor.adjacentMines == 0 && 
                        neighbor.isClear == false &&
                        neighbor.isMine == false
                    ) {
                        clearTile(neighbor)
                    }
                }
            }
        };

        function toggleFlag(tile) {
            if (tile.isFlagged === true) {
                tile.isFlagged = false;
            } else {
                tile.isFlagged = true;
            }
        };

        function checkTile(x, y, event) {

            var tile = get(x, y)

            if (event.shiftKey === true || event.altKey === true) {
                toggleFlag(tile);
            } else {
                clearTile(tile);
            }
        }

        return {
            newGame : newGame,
            info    : info,
            tiles   : tiles,
            checkTile   : checkTile,
        };

    }

    return board();
});
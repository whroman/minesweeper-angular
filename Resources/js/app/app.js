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

            x   : 0,
            y   : 0,
            numOfTiles  : 0,
            numOfMines  : 0,
            numOfFlags  : 0,
            numOfClears : 0,

            refresh : function() {
                this.numOfTiles  = 0;
                this.numOfClears = 0;
                this.numOfFlags  = 0;
                this.numOfMines  = 0;

                for (key in tiles) {
                    var tile = tiles[key]

                    // All Tiles
                    this.numOfTiles++

                    // Cleared Tiles
                    if (tile.isClear === true) {
                        this.numOfClears++
                    }

                    // Flagged Tiles
                    if (tile.isFlagged === true) {
                        this.numOfFlags++
                    }

                    // Mined Tiles
                    if (tile.isMine === true) {
                        this.numOfMines++
                    }

                    // Largest X (Size of board)
                    if (tile.x > this.x) {
                        this.x = tile.x
                    }

                    // Largest Y (Size of board)
                    if (tile.y > this.y) {
                        this.y = tile.y
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

        function get(x, y) {
            var key = x + '-' + y;
            var tile = tiles[key];

            return tile
        };

        function newGame(sizeX, sizeY, numOfMines) {
            for (var y = 0; y < sizeY; y++) {

                for (var x = 0; x < sizeX; x++) {
                    tiles[x + '-' + y] = {
                        x : x,
                        y : y,
                        isMine  : false,
                        isClear : false,
                        isFlagged   : false,
                        adjacentMines   : 0,
                    };
                }
            }

            info.refresh()

            while (numOfMines--) {
                var tile = randomSafeTile();
                
                tallyAdjacentMines(tile);                
            }

            info.refresh()

            return this
        };

        function loadGame(savedTiles) {
            tiles = savedTiles;
            info.refresh();

            return this;
        };
        
        function tallyAdjacentMines(tile) {
            var x = tile.x;
            var y = tile.y;
            for (var key = 0; key < adjacentTiles.length; key++) {
                
                var neighborTile = get(
                    x + adjacentTiles[key][0], 
                    y + adjacentTiles[key][1]
                );
                
                if (neighborTile != undefined) {
                    neighborTile.adjacentMines++
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

            return tiles

        };

        function randomSafeTile() {
            var availTiles = [];

            for (key in tiles) {
                var tile = tiles[key];

                if (tile.isClear === false && tile.isMine === false) {
                    availTiles.push(tile);
                }

            }

            var randomTile = availTiles[ Math.floor(Math.random() * availTiles.length) ];

            return randomTile;

        }

        function autoSelect(num) {
            while (num--) {
                var tile = randomSafeTile();
                clearTile(tile);
            }

            return tiles
        } 

        return {
            newGame     : newGame,
            loadGame    : loadGame, 
            info        : info,
            tiles       : tiles,
            checkTile   : checkTile,
            autoSelect  : autoSelect
        };

    }

    return board();
});
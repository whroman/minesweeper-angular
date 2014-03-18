var app = angular.module('minesweeperApp', [
    'minesweeperCtrl',
    'ngRoute'
]);

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

        var boardInfo = {};

        var check = [
            [-1, -1], [ 0, -1], [ 1, -1],
            [-1,  0],           [ 1,  0],
            [-1,  1], [ 0,  1], [ 1,  1],
        ]

        function set(x, y, numOfMines) {
            boardInfo = {
                x   : x,
                y   : y,
                tiles   : x * y,
                mines   : numOfMines,
                flagged : 0,
                cleared : 0,
                refresh : function() {
                    var count = 0;
                    for (tile in tiles) {

                        if (tiles[tile].isClear === true) {
                            count++
                        }
                    }
                    this.cleared = count

                    return count
                }
            }
            return this
        };

        function get(x, y) {
            var key = x + '-' + y,
                tile = tiles[key];

            return tile
        };

        function create() {
            for (var x = 0; x < this.info().x; x++) {

                for (var y = 0; y < this.info().y; y++) {
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

            for (var mineNum = 0; mineNum < info().mines; mineNum++) {
                var mineX = Math.floor(Math.random() * info().x)
                var mineY = Math.floor(Math.random() * info().y)

                get(mineX, mineY).isMine = true;
                tallyAdjacentMines(mineX, mineY);
            }

            return tiles
        };
        
        function tallyAdjacentMines(x, y) {
            for (var key = 0; key < check.length; key++) {
                var tile = get(
                    x + check[key][0], 
                    y + check[key][1]
                );
                if (tile != undefined) {
                    tile.adjacentMines++
                }
            }
        };

        function info() {
            return boardInfo
        };

        function clearTile(tile) {


            tile.isClear = true;


            boardInfo.cleared++;

            for (var key = 0; key < check.length; key++) {
                var neighbor = get(
                    tile.x + check[key][0], 
                    tile.y + check[key][1]
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
                boardInfo.flagged--;
            } else {
                tile.isFlagged = true;
                boardInfo.flagged++;
            }
        };

        function checkTile(tile, event) {
            if (event.shiftKey === true || event.altKey === true) {
                toggleFlag(tile);
            } else {
                clearTile(tile);
            }
        }

        return {
            set : set,
            get : get,
            create  : create,
            info    : info,
            tiles   : tiles,
            checkTile   : checkTile,
        };

    }

    return board();
});
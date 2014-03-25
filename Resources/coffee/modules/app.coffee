app = angular.module 'minesweeperApp', ['minesweeperCtrl', 'ngRoute']

app.config ($routeProvider, $locationProvider) ->
    $routeProvider
        .when '/', {
            templateUrl : './Resources/view/board.html'
            controller  : 'Board'
        }

    $locationProvider.html5Mode true;

app.factory 'board', () ->
    board = () ->

        tiles = {}

        info = {
            numOfTiles  : 0
            numOfMines  : 0
            numOfFlags  : 0
            numOfClears : 0
            refresh : () ->

                this.numOfTiles  = 0
                this.numOfClears = 0
                this.numOfFlags  = 0
                this.numOfMines  = 0

                for key, tile of tiles

                    # All Tiles
                    this.numOfTiles++

                    # Cleared Tiles
                    if tile.isClear == true
                        this.numOfClears++

                    # Flagged Tiles
                    if tile.isFlagged == true
                        this.numOfFlags++

                    # Mined Tiles
                    if tile.isMine == true
                        this.numOfMines++

                return this
        }

        adjacentTiles = [
            [-1, -1], [ 0, -1], [ 1, -1],
            [-1,  0],           [ 1,  0],
            [-1,  1], [ 0,  1], [ 1,  1],
        ]

        resumeGame = (savedTiles) ->
            tiles = savedTiles
            return this

        get = (x, y) ->
            key = x + '-' + y
            return tiles[key]

        newGame = (sizeX, sizeY, numOfMines) ->
            for y in [0..sizeY]
                for x in [0..sizeX]
    
                    tiles[x + '-' + y] = {
                        x : x
                        y : y
                        isMine  : false
                        isClear : false
                        isFlagged   : false
                        adjacentMines   : 0
                    }

            for mineNum in [0..numOfMines]
                mineX = Math.floor Math.random() * sizeX
                mineY = Math.floor Math.random() * sizeY

                get(mineX, mineY).isMine = true

                tallyAdjacentMines mineX, mineY

            info.refresh()

            return this
        
        tallyAdjacentMines = (x, y) ->
            for adjacentTile in adjacentTiles
                tile = get x + adjacentTile[0], y + adjacentTile[1]
                tile.adjacentMines++ if tile != undefined

        clearTile = (tile) ->
            tile.isClear = true
            tile.isFlagged = false


            for adjacentTile in adjacentTiles

                neighbor = get tile.x + adjacentTile[0], tile.y + adjacentTile[1]

                if neighbor != undefined       
                    if neighbor.adjacentMines == 0 && neighbor.isClear == false && neighbor.isMine == false
                        clearTile(neighbor)


        toggleFlag = (tile) ->
            if tile.isFlagged == true
                tile.isFlagged = false
            else
                tile.isFlagged = true

        checkTile = (x, y, event) ->
            tile = get x, y

            if event.shiftKey == true || event.altKey == true
                toggleFlag tile
            else
                clearTile tile

        return {
            newGame : newGame
            info    : info
            tiles   : tiles
            checkTile   : checkTile
        }

    return board()
minesweeperApp = angular.module 'minesweeperApp', ['minesweeperCtrl', 'ngRoute']

minesweeperApp.config(
    ($routeProvider, $locationProvider) ->
        $routeProvider.when '/', {
                templateUrl : './Resources/view/board.html'
                controller  : 'Board'
            }

        $locationProvider.html5Mode true
    )

minesweeperApp.factory 'board', () ->
    board = () ->

        tiles = {}

        info = {
            numOfTiles  : 0
            numOfMines  : 0
            numOfFlags  : 0
            numOfClears : 0
            refresh : (tiles) ->
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

        get = (x, y) ->
            key = x + '-' + y
            return this.tiles[key]

        newGame = (sizeX, sizeY, numOfMines) ->
            for y in [0..sizeY]
                for x in [0..sizeX]
                    this.tiles[x + '-' + y] = {
                        x : x
                        y : y
                        isMine      : false
                        isClear     : false
                        isFlagged   : false
                        adjacentMines   : 0
                    }

            for mineNum in [0..numOfMines]
                tile = randomSafeTile()

                tile.isMine = true

                this.tallyAdjacentMines tile

            this.info.refresh this.tiles

            return this

        loadGame = (savedTiles) ->
            this.tiles = savedTiles
            this.info.refresh this.tiles

            return this
        
        tallyAdjacentMines = (tile) ->
            x = tile.x
            y = tile.y
            for adjacentTile in adjacentTiles
                tile = this.get x + adjacentTile[0], y + adjacentTile[1]

                tile.adjacentMines++ if tile?

        clearTile = (tile) ->

            tile.isClear = true
            tile.isFlagged = false


            for adjacentTile in adjacentTiles

                neighbor = this.get tile.x + adjacentTile[0], tile.y + adjacentTile[1]

                if neighbor?
                    if neighbor.adjacentMines == 0 && neighbor.isClear == false && neighbor.isMine == false
                        this.clearTile neighbor


        toggleFlag = (tile) ->
            tile.isFlagged = tile.isFlagged == true ? false : true

            return tile

        checkTile = (x, y, event) ->

            tile = this.get x, y

            if event.shiftKey == true || event.altKey == true
                this.toggleFlag tile
            else
                this.clearTile tile

            return this.tiles

        randomSafeTile = () ->
            availTiles = [];

            for key, tile of tiles
                if tile.isClear == false && tile.isMine == false
                    availTiles.push tile

            randomTile = availTiles[ Math.floor( Math.random() * availTiles.length) ]

        autoSelect = (num) ->
            while num--
                tile = randomSafeTile()
                this.clearTile tile 

            return tiles

        return {
            newGame     : newGame
            loadGame    : loadGame
            info        : info
            tiles       : tiles
            checkTile   : checkTile
            toggleFlag  : toggleFlag
            clearTile   : clearTile
            autoSelect  : autoSelect
            get         : get
            tallyAdjacentMines  : tallyAdjacentMines
        }

    return board()
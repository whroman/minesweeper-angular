minesweeperApp = angular.module 'minesweeperApp', ['minesweeperCtrl', 'ngRoute']

minesweeperApp.config(
    ($routeProvider, $locationProvider) ->
        $routeProvider
            .when '/:any*', {
                templateUrl : 'Resources/view/board.html'
                controller  : 'Board'
            }
            .when '/', {
                templateUrl : 'Resources/view/board.html'
                controller  : 'Board'
            }

        $locationProvider.html5Mode true
    )

minesweeperApp.factory 'boardInfo', () ->
    boardInfo = () ->
        refresh =(tiles) ->
            this.loss    = false
            this.win     = false
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

                # Check Game Loss
                if tile.isMine == true && tile.isClear == true
                    this.loss = true

            # Check Game Win
            if this.loss == false && this.numOfTiles - this.numOfMines - this.numOfClears == 0
                this.win = true


            return this

        return {
            refresh     : refresh
        }
    return boardInfo()

minesweeperApp.service 'toggleFlag', () ->
    toggleFlag = (tile) ->
        if (tile.isFlagged == true)
            tile.isFlagged = false
        else
            tile.isFlagged = true

        return tile


minesweeperApp.factory 'board', (boardInfo, toggleFlag) ->
    board = () ->
        tiles = {}

        adjacentTiles = [
            [-1, -1], [ 0, -1], [ 1, -1],
            [-1,  0],           [ 1,  0],
            [-1,  1], [ 0,  1], [ 1,  1],
        ]

        get = (x, y) ->
            key = x + '-' + y
            return this.tiles[key]

        newGame = (sizeX, sizeY, numOfMines) ->
            for y in [0..sizeY - 1]
                for x in [0..sizeX - 1]
                    this.tiles[x + '-' + y] = {
                        x : x
                        y : y
                        isMine      : false
                        isClear     : false
                        isFlagged   : false
                        adjacentMines   : 0
                    }

            for mineNum in [1..numOfMines]
                tile = this.randomSafeTile()
                tile.isMine = true
                this.tallyAdjacentMines tile

            return this

        loadGame = (savedTiles) ->
            this.tiles = savedTiles
            
            return this
        
        tallyAdjacentMines = (tile) ->
            x = tile.x
            y = tile.y
            for adjacentTile in adjacentTiles
                tile = this.get x + adjacentTile[0], y + adjacentTile[1]

                tile.adjacentMines++ if tile?

        clearTile = (tile) ->

            this.noMineFirstClick tile

            tile.isClear = true
            tile.isFlagged = false

            this.clearNeighbors tile

        noMineFirstClick = (tile) ->
            if boardInfo.numOfClears == 0 && tile.isMine == true
                tile.isMine = false
                this.randomSafeTile().isMine = true

        clearNeighbors = (tile) ->
            if tile.adjacentMines == 0
                for adjacentTile in adjacentTiles

                    neighbor = this.get tile.x + adjacentTile[0], tile.y + adjacentTile[1]

                    if neighbor?
                        if neighbor.adjacentMines == 0 && neighbor.isClear == false && neighbor.isMine == false
                            this.clearTile neighbor

        checkTile = (x, y, event) ->

            tile = this.get x, y

            if event.shiftKey == true || event.altKey == true
                toggleFlag tile
            else
                this.clearTile tile
            
            return this.tiles

        randomSafeTile = () ->
            availTiles = []

            for key, tile of this.tiles
                if tile.isClear == false && tile.isMine == false
                    availTiles.push tile

            randomTile = availTiles[ Math.floor( Math.random() * availTiles.length) ]

        autoSelect = (num) ->
            while num--
                tile = this.randomSafeTile()
                this.clearTile tile 
            
            return this.tiles

        return {
            newGame     : newGame
            loadGame    : loadGame
            tiles       : tiles
            checkTile   : checkTile
            clearTile   : clearTile
            autoSelect  : autoSelect
            get         : get
            randomSafeTile  : randomSafeTile
            clearNeighbors  : clearNeighbors
            tallyAdjacentMines  : tallyAdjacentMines
            noMineFirstClick    : noMineFirstClick
        }

    return board()
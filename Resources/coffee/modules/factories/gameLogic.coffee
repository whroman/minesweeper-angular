msGameLogic = angular
    .module 'msGameLogic', 
    # Dependencies
    ['msGameInfo', 'msToggleFlag']

msGameLogic.factory 'gameLogic', (gameInfo, toggleFlag) ->
    game = () ->
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
            this.tiles = {}
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
            if gameInfo.numOfClears == 0 && tile.isMine == true
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

    return game()
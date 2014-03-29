msCollection = angular
    .module 'msCollection', [
    # Dependencies
        'msModel',
        'msModelMethods'
    ]

msCollection.factory 'collection', (model, modelMethods) ->
    collection = () ->
        tiles = {}

        newGame = (sizeX, sizeY, numOfMines) ->
            this.tiles = {}
            for y in [0..sizeY - 1]
                for x in [0..sizeX - 1]
                    this.tiles[x + '-' + y] = modelMethods(
                        model( x, y ), {
                            get     : (x, y) =>
                                this.get(x, y)
                            randomSafeTile  : this.randomSafeTile
                            info    : this.info
                        }
                    )

            for mineNum in [1..numOfMines]
                tile = this.randomSafeTile()
                tile.model.isMine = true
                tile.tallyAdjacentMines()

            return this

        loadGame = (savedTiles) ->
            this.tiles = savedTiles

            for key, tile of this.tiles
                test = this.tiles[key]


                this.tiles[key] = modelMethods(
                    this.tiles[key].model, {
                        get     : (x, y) =>
                            this.get(x, y)
                        randomSafeTile  : this.randomSafeTile
                        info    : this.info
                    }
                )

            #     this.tiles[key].override(savedTiles[key])

            return this

        info = {
            refresh     : (tiles) ->
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
                    if tile.model.isClear == true
                        this.numOfClears++

                    # Flagged Tiles
                    if tile.model.isFlagged == true
                        this.numOfFlags++

                    # Mined Tiles
                    if tile.model.isMine == true
                        this.numOfMines++

                    # Check Game Loss
                    if tile.model.isMine == true && tile.model.isClear == true
                        this.loss = true

                # Check Game Win
                if this.loss == false && this.numOfTiles - this.numOfMines - this.numOfClears == 0
                    this.win = true


                return this
            }

        get = (x, y) ->
            key = x + '-' + y
            return this.tiles[key]

        randomSafeTile = () ->
            availTiles = []

            for key, tile of this.tiles
                if tile.model.isClear == false && tile.model.isMine == false
                    availTiles.push tile

            randomTile = availTiles[ Math.floor( Math.random() * availTiles.length) ]

            return randomTile

        autoSelect = (num) ->
            while num--
                tile = this.randomSafeTile()
                tile.clear()
            
            return this.tiles


        checkTile = (x, y, event) ->
            tile = this.get x, y

            if event.shiftKey == true || event.altKey == true
                tile.toggleFlag()
            else
                tile.clear()

            return this.tiles

        return {
            tiles       : tiles
            newGame     : newGame
            loadGame    : loadGame
            info        : info
            randomSafeTile  : randomSafeTile
            get         : get
            autoSelect  : autoSelect
            checkTile   : checkTile
        }

    return collection()
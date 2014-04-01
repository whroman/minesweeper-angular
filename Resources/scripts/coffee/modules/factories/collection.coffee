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
                            get     : (attrs) =>
                                this.get(attrs)
                            getAll     : (attrs) =>
                                this.getAll(attrs)
                            randomSafeTile  : this.randomSafeTile
                            info    : this.info
                            tallyMines  : this.tallyMines
                        }
                    )

            for mineNum in [1..numOfMines]
                tile = this.randomSafeTile()
                tile.model.isMine = true
            
            this.tallyMines()

            return this

        loadGame = (savedTiles) ->
            this.tiles = savedTiles

            for key, tile of this.tiles
                test = this.tiles[key]


                this.tiles[key] = modelMethods(
                    this.tiles[key].model, {
                        get     : (attrs) =>
                            this.get(attrs)
                        getAll     : (attrs) =>
                            this.getAll(attrs)
                        randomSafeTile  : this.randomSafeTile
                        info    : this.info
                        tallyMines  : this.tallyMines
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

        get = (attrs) ->
            return this.getAll(attrs)[0]

        getAll = (attrs) ->
            matches = []
            if attrs is undefined
                for key, tile of this.tiles
                    matches.push(tile)
            else 
                for key, tile of this.tiles
                    numOfAttrs = 0
                    numOfMatchedAttrs = 0
                    for key, val of attrs
                        numOfAttrs++
                        if tile.model[key] == val
                            numOfMatchedAttrs++

                    if numOfMatchedAttrs == numOfAttrs
                        matches.push(tile)

            return matches

        tallyMines = () ->
            for tile in this.getAll()
                neighborMines = 0
                for adjacentTile in tile.adjacentTiles
                    neighborMine = this.get({
                        isMine  : true
                        x       : tile.model.x + adjacentTile[0] 
                        y       : tile.model.y + adjacentTile[1]
                    }) 
                    if neighborMine isnt undefined
                        neighborMines++
                tile.model.adjacentMines = neighborMines

        randomSafeTile = () ->
            find = {
                isClear : false
                isMine  : false
            }
            safeTiles = this.getAll(find)


            randomTile = safeTiles[ Math.floor( Math.random() * safeTiles.length) ]

            return randomTile


        autoSelect = (num) ->
            while num--
                tile = this.randomSafeTile()
                tile.clear()
            
            return this.tiles


        checkTile = (x, y, event) ->
            tile = this.get({
                x : x, 
                y : y
            })

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
            tallyMines  : tallyMines
            get         : get
            getAll      : getAll
            autoSelect  : autoSelect
            checkTile   : checkTile
        }

    return collection()
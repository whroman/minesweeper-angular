angular
.module 'CollectTiles', [
# Dependencies
    'ModelTile',
    'angularLocalStorage'
]

.factory 'CollectTiles', (
    storage,
    ModelTile
) ->

    tiles = []

    exposeToModel = () ->
        return {
            collection  : {
                get     : (attrs) =>
                    this.get(attrs)
                getAll  : (attrs) =>
                    this.getAll(attrs)
            }
        }

    get = (attrs) ->
        return this.getAll(attrs)[0]

    getAll = (attrs) ->
        matches = []
        if attrs is undefined
            for tile in this.tiles
                matches.push(tile)
        else 
            for tile in this.tiles
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
                neighborX = tile.model.x + adjacentTile[0] 
                neighborY = tile.model.y + adjacentTile[1]
                neighborAttrs = {
                    isMine  : true
                    x       : neighborX
                    y       : neighborY
                }
                neighborMine = this.get(neighborAttrs)
                if neighborMine isnt undefined
                    neighborMines++
            tile.model.adjacentMines = neighborMines

        return this

    randomSafeTile = () ->
        findAttrs = {
            isClear : false
            isMine  : false
        }
        safeTiles = this.getAll findAttrs

        randomTile = safeTiles[ Math.floor( Math.random() * safeTiles.length) ]

        return randomTile


    autoSelect = (num) ->
        while num--
            tile = this.randomSafeTile()
            console.log tile
            tile.clear()

        return this.tiles

    newGame = (sizeX, sizeY, numOfMines) ->
        this.tiles = []
        for y in [0..sizeY - 1]
            for x in [0..sizeX - 1]
                attrs = {
                    x   : x
                    y   : y
                }
                this.add(attrs)

        for mineNum in [1..numOfMines]
            tile = this.randomSafeTile()
            tile.model.isMine = true
        
        this.tallyMines()

        return this

    loadGame = (savedTiles) ->
        this.tiles = []
        for tile in savedTiles
            this.add(tile.model)

        return this

    add = (model) ->
        tile = new ModelTile model
        @tiles.push(tile)

    clearNeighbors = (tile) ->
        if tile.model.adjacentMines is 0 and tile.model.isMine is false
            console.log @
            for adjacentTile in tile.adjacentTiles
                neighbor = @get(
                    x : tile.model.x + adjacentTile[0]
                    y : tile.model.y + adjacentTile[1]
                )

                if neighbor isnt undefined
                    if neighbor.model.isClear is false and neighbor.model.isMine is false
                        neighbor.clear()

    return {
        tiles       : tiles
        newGame     : newGame
        loadGame    : loadGame
        randomSafeTile  : randomSafeTile
        tallyMines  : tallyMines
        get         : get
        getAll      : getAll
        add         : add
        autoSelect  : autoSelect
        exposeToModel  : exposeToModel
        clearNeighbors: clearNeighbors
    }
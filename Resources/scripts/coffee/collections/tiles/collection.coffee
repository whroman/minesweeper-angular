angular
.module 'CollectTiles', [
# Dependencies
    'ModelTile',
    'ModelBoardInfo',
    'angularLocalStorage'
]

.factory 'CollectTiles', (storage, ModelTile, ModelBoardInfo) ->
    tiles = []
    info = ModelBoardInfo

    exposeToModel = () ->
        return {
            collection  : {
                get     : (attrs) =>
                    this.get(attrs)
                getAll  : (attrs) =>
                    this.getAll(attrs)
                info    : this.info
                randomSafeTile  : this.randomSafeTile
                tallyMines  : this.tallyMines
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
                neighborMine = this.get({
                    isMine  : true
                    x       : neighborX
                    y       : neighborY
                })
                if neighborMine isnt undefined
                    neighborMines++
            tile.model.adjacentMines = neighborMines

        return this

    randomSafeTile = () ->
        find = {
            isClear : false
            isMine  : false
        }
        safeTiles = this.getAll find

        randomTile = safeTiles[ Math.floor( Math.random() * safeTiles.length) ]

        return randomTile


    autoSelect = (num) ->
        while num--
            tile = this.randomSafeTile()
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

                this.tiles.push(
                    ModelTile(attrs).extend(this.exposeToModel())
                )

        for mineNum in [1..numOfMines]
            tile = this.randomSafeTile()
            tile.model.isMine = true
        
        this.tallyMines()

        return this

    loadGame = (savedTiles) ->
        loadedTiles = []
        for tile in savedTiles
            savedTile = ModelTile(tile.model).extend(this.exposeToModel())
            loadedTiles.push(savedTile)

        this.tiles = loadedTiles

        return this

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
        exposeToModel  : exposeToModel
    }
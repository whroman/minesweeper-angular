angular
.module 'CollectTiles', [
# Dependencies
    'ModelTile',
    'angularLocalStorage'
]

.factory 'CollectTiles', (storage, ModelTile) ->
    tiles = {}
    info = {}

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

    infoRefresh     = () ->
            this.info.loss    = false
            this.info.win     = false
            this.info.numOfTiles  = 0
            this.info.numOfClears = 0
            this.info.numOfFlags  = 0
            this.info.numOfMines  = 0

            for key, tile of this.tiles

                # All Tiles
                this.info.numOfTiles++

                # Cleared Tiles
                if tile.model.isClear == true
                    this.info.numOfClears++

                # Flagged Tiles
                if tile.model.isFlagged == true
                    this.info.numOfFlags++

                # Mined Tiles
                if tile.model.isMine == true
                    this.info.numOfMines++

                # Check Game Loss
                if tile.model.isMine == true && tile.model.isClear == true
                    this.info.loss = true

            # Check Game Win
            if this.info.loss == false && this.info.numOfTiles - this.info.numOfMines - this.info.numOfClears == 0
                this.info.win = true


            return this.info

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
        safeTiles = this.getAll find

        randomTile = safeTiles[ Math.floor( Math.random() * safeTiles.length) ]

        return randomTile


    autoSelect = (num) ->
        while num--
            tile = this.randomSafeTile()
            tile.clear()

        this.infoRefresh()
        
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

        this.infoRefresh()

        return this.tiles

    newGame = (sizeX, sizeY, numOfMines) ->
        this.tiles = {}
        for y in [0..sizeY - 1]
            for x in [0..sizeX - 1]
                attrs = {
                    x   : x
                    y   : y
                }

                this.tiles[x + '-' + y] = ModelTile(attrs)
                    .extend(this.exposeToModel())

        for mineNum in [1..numOfMines]
            tile = this.randomSafeTile()
            tile.model.isMine = true
        
        this.tallyMines()

        this.infoRefresh()

        return this

    loadGame = (savedTiles) ->
        this.tiles = savedTiles

        for key, tile of this.tiles
            test = this.tiles[key]

            this.tiles[key] = ModelTile(this.tiles[key].model)
                .extend(this.exposeToModel())

        this.infoRefresh()

        return this

    init = (scope, info) ->
        board  = undefined
        if storage.get('tiles') == null
            board = this.newGame info.x.val, info.y.val, info.mines.val
        else
            board = this.loadGame storage.get('tiles')

        storage.bind scope, 'tiles'

        return board


    return {
        init        : init
        tiles       : tiles
        newGame     : newGame
        loadGame    : loadGame
        info        : info
        infoRefresh : infoRefresh
        randomSafeTile  : randomSafeTile
        tallyMines  : tallyMines
        get         : get
        getAll      : getAll
        autoSelect  : autoSelect
        checkTile   : checkTile
        exposeToModel  : exposeToModel
    }
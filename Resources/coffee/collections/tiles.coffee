angular
.module 'CollectTiles', [
# Dependencies
    'ModelTile',
]

.factory 'CollectTiles', (
    ModelTile,
    $rootScope
) ->
    class CollectTiles
        constructor : (widthOrSavedGame, height, numOfMines) ->

            # Extend ModelTile so that it can execute some collection logic
            collection = @
            @model = class Model extends ModelTile
                clear: ->
                    super()
                    collection.clearNeighbors @
                    collection.update()

                toggleFlag: ->
                    super()
                    collection.update()

                click: ($event) ->
                    collection.noMineFirstClick @
                    super $event


            # Load or Create new game
            if Array.isArray widthOrSavedGame
                @loadGame widthOrSavedGame

                @x = Math.max.apply @, @all.map (tile) ->
                    tile.model.x

                @y = Math.max.apply @, @all.map (tile) ->
                    tile.model.y

                # Offset by 1 to account for 0 index
                @x = @x--
                @y = @y--


                @numOfMines = 0
                for tile in @all
                    if tile.model.isMine is true
                        @numOfMines++

            else
                @newGame widthOrSavedGame, height, numOfMines
                @x = widthOrSavedGame
                @y = height
                @numOfMines = numOfMines

            @

        add : (model) ->
            tile = new @model model
            @all.push tile
            tile

        update : ->
            this.loss    = false
            this.win     = false
            this.numOfClears = 0
            this.numOfFlags  = 0

            for tile in @all
                # Cleared Tiles
                if tile.model.isClear == true
                    this.numOfClears++

                # Flagged Tiles
                if tile.model.isFlagged == true
                    this.numOfFlags++

                # Check Game Loss
                if tile.model.isMine == true && tile.model.isClear == true
                    this.loss = true

            # Check Game Win
            if this.loss == false && @all.length - this.numOfMines - this.numOfClears == 0
                this.win = true

            $rootScope.$broadcast 'Tiles:Updated'

            @


        get : (attrs) ->
            return @getAll(attrs)[0]

        getAll : (attrs) ->
            matches = []
            if attrs is undefined
                for tile in @all
                    matches.push tile
            else
                for tile in @all
                    numOfAttrs = 0
                    numOfMatchedAttrs = 0
                    for key, val of attrs
                        numOfAttrs++
                        if tile.model[key] is val
                            numOfMatchedAttrs++

                    if numOfMatchedAttrs is numOfAttrs
                        matches.push tile

            return matches

        tallyMines : () ->
            for tile in @getAll()
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

            @

        randomSafeTile : () ->
            findAttrs =
                isClear : false
                isMine  : false

            safeTiles = @getAll findAttrs
            randomIndex = Math.floor Math.random() * safeTiles.length
            return safeTiles[ randomIndex ]

        autoSelect : (num) ->
            while num--
                @randomSafeTile().clear()

            @all

        newGame : (sizeX, sizeY, numOfMines) ->
            @reset()
            for y in [0..sizeY - 1]
                for x in [0..sizeX - 1]
                    attrs = {
                        x   : x
                        y   : y
                    }
                    @add attrs

            for mineNum in [1..numOfMines]
                tile = @randomSafeTile()
                tile.model.isMine = true

            @tallyMines()
            @update()
            $rootScope.$broadcast 'Tiles:NewGame'
            @

        loadGame : (savedTiles) ->
            @reset()
            for tile in savedTiles
                @add tile.model
            @update()

        reset : ->
            @all = []
            @

        noMineFirstClick: (tile) ->
            if @numOfClears is 0 and tile.model.isMine is true
                tile.model.isMine = false
                @randomSafeTile().model.isMine = true
                @tallyMines()

            return tile

        clearNeighbors : (tile) ->
            shouldClearNeighbors = tile.model.adjacentMines is 0 and tile.model.isMine is false
            if shouldClearNeighbors
                for adjacentTile in tile.adjacentTiles
                    neighbor = @get(
                        x : tile.model.x + adjacentTile[0]
                        y : tile.model.y + adjacentTile[1]
                    )

                    shouldClearNeighbor = (
                        neighbor and
                        neighbor.model.isClear is false and
                        neighbor.model.isMine is false
                    )

                    if shouldClearNeighbor
                        neighbor.clear()

            @
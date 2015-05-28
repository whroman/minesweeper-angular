angular
.module 'CollectTiles', [
# Dependencies
    'ModelTile',
]

.factory 'CollectTiles', (
    ModelTile
) ->
    class CollectTiles
        constructor : (widthOrSavedGame, height, numOfMines) ->

            # Extend ModelTile so that it can execute some collection logic
            collection = @
            @model = class Model extends ModelTile
                clear: ->
                    super()
                    collection.clearNeighbors @

            # Load or Create new game
            if Array.isArray widthOrSavedGame
                @loadGame widthOrSavedGame
            else
                @newGame widthOrSavedGame, height, numOfMines

            @

        add : (model) ->
            tile = new @model model
            @all.push tile
            tile

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

        loadGame : (savedTiles) ->
            @reset()
            for tile in savedTiles
                @add tile.model
            @

        reset : ->
            @all = []
            @

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
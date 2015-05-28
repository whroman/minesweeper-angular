angular
.module 'ModelTile', [
# Dependencies
]
.factory 'ModelTile', (
    $rootScope
) ->
    class ModelTile
        constructor: (attrs) ->
            @model =
                x : undefined
                y : undefined
                uid : undefined
                isMine : false
                isClear : false
                isFlagged : false
                adjacentMines : 0

            @adjacentTiles = [
                [-1, -1], [ 0, -1], [ 1, -1],
                [-1,  0],           [ 1,  0],
                [-1,  1], [ 0,  1], [ 1,  1],
            ]

            @set attrs

        set: (attrs) ->
            for key, attr of attrs
                @model[key] = attr
            @

        toggleFlag: ->
            if @model.isFlagged is true
                @model.isFlagged = false
            else
                @model.isFlagged = true
            @

        clear: ->
            @model.isClear = true
            @model.isFlagged = false
            $rootScope.$emit 'Tile:Clear', @
            @
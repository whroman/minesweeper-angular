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
                @model.uid = String(attrs.x) + '-' + String(attrs.y)
            @

        toggleFlag: ->
            @model.isFlagged = !@model.isFlagged
            $rootScope.$broadcast 'Tile:Flag', @
            @

        clear: ->
            @model.isClear = true
            @model.isFlagged = false
            @collection.clearNeighbors(@)

            $rootScope.$broadcast 'Tile:Clear', @
            @
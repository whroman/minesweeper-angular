msToggleFlag = angular
    .module 'msToggleFlag', 
    # Dependencies
    []

msToggleFlag.service 'toggleFlag', () ->
    toggleFlag = (tile) ->
        if (tile.isFlagged == true)
            tile.isFlagged = false
        else
            tile.isFlagged = true

        return tile
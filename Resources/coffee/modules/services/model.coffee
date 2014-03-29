msModel = angular
    .module 'msModel', [
    # Dependencies
    ]

msModel.service 'model', () ->
    model = (x, y) ->
        return {
            x : x
            y : y
            isMine      : false
            isClear     : false
            isFlagged   : false
            adjacentMines   : 0
        }
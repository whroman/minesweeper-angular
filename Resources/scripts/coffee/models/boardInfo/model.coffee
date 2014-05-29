angular
.module 'ModelBoardInfo', [
# Dependencies
]

.factory 'ModelBoardInfo', () ->

    info = {
        update: (tiles) ->
            this.loss    = false
            this.win     = false
            this.numOfTiles  = 0
            this.numOfClears = 0
            this.numOfFlags  = 0
            this.numOfMines  = 0

            for tile in tiles

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

    return info
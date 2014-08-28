angular
.module 'ModelBoardInfo', [
# Dependencies
]

.factory 'ModelBoardInfo', () ->

    info = {
        update: (tiles) ->
            this.x = 0
            this.y = 0
            this.loss    = false
            this.win     = false
            this.numOfTiles  = 0
            this.numOfClears = 0
            this.numOfFlags  = 0
            this.numOfMines  = 0

            xTiles = []
            yTiles = []

            for tile in tiles

                # All Tiles
                this.numOfTiles++

                # X Tiles
                if xTiles.indexOf(tile.model.x) == -1
                    xTiles.push(tile.model.x)

                # Y Tiles
                if yTiles.indexOf(tile.model.y) == -1
                    yTiles.push(tile.model.y)

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

            this.x = xTiles.length
            this.y = yTiles.length

            # Check Game Win
            if this.loss == false && this.numOfTiles - this.numOfMines - this.numOfClears == 0
                this.win = true


            return this
        
    }

    return info
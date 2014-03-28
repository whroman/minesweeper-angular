msGameInfo = angular
    .module 'msGameInfo', 
    # Dependencies
    []

msGameInfo.factory 'gameInfo', () ->
    gameInfo = () ->
        refresh =(tiles) ->
            this.loss    = false
            this.win     = false
            this.numOfTiles  = 0
            this.numOfClears = 0
            this.numOfFlags  = 0
            this.numOfMines  = 0

            for key, tile of tiles

                # All Tiles
                this.numOfTiles++

                # Cleared Tiles
                if tile.isClear == true
                    this.numOfClears++

                # Flagged Tiles
                if tile.isFlagged == true
                    this.numOfFlags++

                # Mined Tiles
                if tile.isMine == true
                    this.numOfMines++

                # Check Game Loss
                if tile.isMine == true && tile.isClear == true
                    this.loss = true

            # Check Game Win
            if this.loss == false && this.numOfTiles - this.numOfMines - this.numOfClears == 0
                this.win = true


            return this

        return {
            refresh     : refresh
        }
    return gameInfo()

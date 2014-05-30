angular
.module 'ModelMethodsTile', [
# Dependencies

] 

.service 'ModelMethodsTile', () ->
    modelMethods = () ->
        adjacentTiles = [
            [-1, -1], [ 0, -1], [ 1, -1],
            [-1,  0],           [ 1,  0],
            [-1,  1], [ 0,  1], [ 1,  1],
        ]

        toggleFlag = () ->
            if (this.model.isFlagged is true)
                this.model.isFlagged = false
            else
                this.model.isFlagged = true

            return this

        clear = () ->
            this.model.isClear = true
            this.model.isFlagged = false
            this.clearNeighbors()

            return this                  

        clearNeighbors = () ->
            if this.model.adjacentMines is 0 and this.model.isMine is false
                for adjacentTile in this.adjacentTiles
                    neighbor = this.collection.get(
                        x : this.model.x + adjacentTile[0], 
                        y : this.model.y + adjacentTile[1]
                    )
                    if neighbor != undefined
                        if neighbor.model.isClear is false and neighbor.model.isMine is false
                            neighbor.clear()

        return {
            clear           : clear
            toggleFlag      : toggleFlag
            clearNeighbors  : clearNeighbors
            adjacentTiles   : adjacentTiles
        }
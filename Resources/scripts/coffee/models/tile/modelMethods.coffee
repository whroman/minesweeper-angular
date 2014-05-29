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
            console.log(this)
            if (this.model.isFlagged is true)
                this.model.isFlagged = false
            else
                this.model.isFlagged = true

            return this

        clear = () ->
            this.noMineFirstClick()
            this.model.isClear = true
            this.model.isFlagged = false
            this.clearNeighbors()

            return this

        noMineFirstClick = () ->
            if this.collection.info.numOfClears is 0 and this.model.isMine is true
                this.model.isMine = false
                this.collection.randomSafeTile().model.isMine = true
                for adjacentTile in this.adjacentTiles
                    neighbor = this.collection.get({
                        x : this.model.x + adjacentTile[0], 
                        y : this.model.y + adjacentTile[1]
                    })
                
                this.collection.tallyMines()                    

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

        check = (event) ->
            if event.shiftKey is true || event.altKey is true
                this.toggleFlag()
            else
                this.clear()

            this.collection.infoRefresh()

        return {
            clear           : clear
            check           : check
            toggleFlag      : toggleFlag
            clearNeighbors  : clearNeighbors
            adjacentTiles   : adjacentTiles
            noMineFirstClick: noMineFirstClick
        }
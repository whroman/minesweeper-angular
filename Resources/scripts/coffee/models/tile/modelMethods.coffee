angular
.module 'ModelMethodsTile', [
# Dependencies

] 

.service 'ModelMethodsTile', () ->
    modelMethods = () ->
        this.adjacentTiles = [
            [-1, -1], [ 0, -1], [ 1, -1],
            [-1,  0],           [ 1,  0],
            [-1,  1], [ 0,  1], [ 1,  1],
        ]

        this.toggleFlag = () ->
            if (this.model.isFlagged is true)
                this.model.isFlagged = false
            else
                this.model.isFlagged = true

            return this

        this.clear = () ->
            this.noMineFirstClick()
            this.model.isClear = true
            this.model.isFlagged = false
            this.clearNeighbors()

            return this

        this.noMineFirstClick = () ->
            if this.collection.info.numOfClears is 0 and this.model.isMine is true
                this.model.isMine = false
                this.collection.randomSafeTile().model.isMine = true
                for adjacentTile in this.adjacentTiles
                    neighbor = this.collection.get({
                        x : this.model.x + adjacentTile[0], 
                        y : this.model.y + adjacentTile[1]
                    })
                
                this.collection.tallyMines()                    

        this.clearNeighbors = () ->
            if this.model.adjacentMines == 0 and this.model.isMine == false
                for adjacentTile in this.adjacentTiles
                    neighbor = this.collection.get(
                        x : this.model.x + adjacentTile[0], 
                        y : this.model.y + adjacentTile[1]
                    )
                    if neighbor != undefined
                        if neighbor.model.isClear == false and neighbor.model.isMine == false
                            neighbor.clear()

        this.check = (event) ->
            if event.shiftKey == true || event.altKey == true
                this.toggleFlag()
            else
                this.clear()

            this.collection.infoRefresh()

        return {
            clear       : this.clear
            check       : this.check
            toggleFlag      : this.toggleFlag
            clearNeighbors  : this.clearNeighbors
            adjacentTiles   : this.adjacentTiles
            noMineFirstClick   : this.noMineFirstClick
        }
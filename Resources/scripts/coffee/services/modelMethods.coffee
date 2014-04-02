msModelMethods = angular
    .module 'msModelMethods', [
    # Dependencies
    ] 

msModelMethods.service 'modelMethods', () ->
    modelMethods = (model, collection) ->

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
            if collection.info.numOfClears is 0 and this.model.isMine is true
                this.model.isMine = false
                this.collection.randomSafeTile().model.isMine = true
                for adjacentTile in this.adjacentTiles
                    neighbor = this.collection.get({
                        x : this.model.x + adjacentTile[0], 
                        y : this.model.y + adjacentTile[1]
                    })
                
                this.collection.tallyMines()                    

        this.clearNeighbors = () ->
            if this.model.adjacentMines == 0
                for adjacentTile in this.adjacentTiles
                    neighbor = this.collection.get(
                        x : this.model.x + adjacentTile[0], 
                        y : this.model.y + adjacentTile[1]
                    )
                    if neighbor?
                        if neighbor.model.isClear is false and neighbor.model.isMine is false
                            neighbor.clear()

        return {
            model   : model
            collection  : collection
            clear       : this.clear
            toggleFlag      : this.toggleFlag
            clearNeighbors  : this.clearNeighbors
            adjacentTiles   : this.adjacentTiles
            noMineFirstClick   : this.noMineFirstClick
        }
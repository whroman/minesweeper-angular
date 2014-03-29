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
            if (this.model.isFlagged == true)
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
            if collection.info.numOfClears == 0 && this.model.isMine == true
                this.model.isMine = false
                this.collection.randomSafeTile().isMine = true
                for adjacentTile in this.adjacentTiles
                    neighbor = this.collection.get this.model.x + adjacentTile[0], this.model.y + adjacentTile[1]
                    this.tallyAdjacentMines()                    

        this.clearNeighbors = () ->
            if this.model.adjacentMines == 0
                for adjacentTile in this.adjacentTiles
                    neighbor = this.collection.get(
                        this.model.x + adjacentTile[0], this.model.y + adjacentTile[1]
                    )
                    if neighbor?
                        if neighbor.model.adjacentMines == 0 && neighbor.model.isClear == false && neighbor.model.isMine == false
                            neighbor.clear()


        this.tallyAdjacentMines = () ->
            for adjacentTile in this.adjacentTiles
                neighbor = this.collection.get this.model.x + adjacentTile[0], this.model.y + adjacentTile[1]
                neighbor.model.adjacentMines++ if neighbor?

        return {
            model   : model
            collection  : collection
            clear       : this.clear
            toggleFlag      : this.toggleFlag
            clearNeighbors  : this.clearNeighbors
            tallyAdjacentMines  : this.tallyAdjacentMines
            adjacentTiles   : this.adjacentTiles
            noMineFirstClick   : this.noMineFirstClick
        }
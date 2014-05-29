angular
.module 'ModelTile', [
# Dependencies
    'ModelMethodsTile'
]

.service 'ModelTile', (ModelMethodsTile) ->
    model = (newAttrs) ->
        model = {
            x   : undefined
            y   : undefined
            uid : undefined
            isMine      : false
            isClear     : false
            isFlagged   : false
            adjacentMines   : 0
        }

        getSchema = () ->
            return schema

        set = (attrs) ->
            for key, attr of attrs
                getSchema().model[key] = attr
            getSchema().model.uid = getSchema().model.x.toString() + getSchema().model.y.toString()
            return getSchema()

        extend = (methods) ->
            for key, method of methods
                getSchema()[key] = method
            return getSchema()


        schema = {
            model   : model
            set     : set
            extend  : extend
            getSchema   : getSchema
        }

        return set(newAttrs).extend(ModelMethodsTile())

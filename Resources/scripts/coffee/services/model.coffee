angular
.module 'msModel', [
# Dependencies
    'msModelMethods'
]

.service 'model', (modelMethods) ->
    model = (newAttrs) ->
        this.model = {
                x   : undefined
                y   : undefined
                isMine      : false
                isClear     : false
                isFlagged   : false
                adjacentMines   : 0
            }

        this.getSchema = () ->
            return schema

        this.set = (attrs) ->
            for key, attr of attrs
                getSchema().model[key] = attr
            return getSchema()

        this.extend = (methods) ->
            for key, method of methods
                getSchema()[key] = method
            return getSchema()


        this.schema = {
            model   : this.model
            set     : this.set
            extend  : this.extend
            getSchema   : this.getSchema
        }

        return this.set(newAttrs).extend(modelMethods())

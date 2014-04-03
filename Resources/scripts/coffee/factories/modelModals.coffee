angular
.module 'modelModals', [
# Dependencies
]

.factory 'modelModals', () ->
    return {
        path    : {}
        show    : {}
        set     : (path, fileNames) ->
            for fileName in fileNames
                this.path[fileName] = path + fileName + '.html'
                this.show[fileName] = false
            return this
        toggle  : (name) ->
            if (this.show[name] == true)
                this.show[name] = false
            else
                this.show[name] = true
            return this

        reset   : () ->
            for key, showModal of this.show
                this.show[key] = false
            return this
    }
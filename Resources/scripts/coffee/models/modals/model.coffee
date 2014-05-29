angular
.module 'ModelModals', [
# Dependencies
]

.factory 'ModelModals', () ->
    return {
        # `path`
        # Type: Object
        # Values: 
        #   > Type: String
        #   > File paths of ng-view templates
        #   > Defined by concat'd `path` and items of `filesNames` in `set` method
        # Keys:
        #   > Defined by `fileNames` arg of `set` method
        #   > Same Key should be used in `show` Object to access Modal's show/hide state as a Boolean
        path    : {}
        
        # `show`
        # Type: Object
        # Values: 
        #   > Type: Boolean
        #   > IF true: corresponding template in `path` Object should be shown
        #   > IF false: corresponding template in `path` Object should NOT be shown
        # Keys:
        #   > Defined by `fileNames` arg of `set` method
        #   > Same Key should be used in `path` Object to access Modal's template
        show    : {}

        # `set(path, fileNames)`
        # arg: `path`
        #   > type: String
        #   > Name of Modal, which has been `set` in module, to be displayed
        # arg: `fileNames`
        #   > type: Array of Strings
        #   > Contains names of files, presumed to be ng-view templates
        #   > Each String in Array will serve as a key when accessing desired Modal in `path` and `show` Objects
        # return: ModelModals Object
        set     : (path, fileNames) ->
            for fileName in fileNames
                this.path[fileName] = path + fileName + '.html'
                this.show[fileName] = false
            return this

        # `toggle(name)`
        # arg: `name`
        #   > type: String
        #   > Name of Modal to be displayed
        #   > All other Modals will be closed
        # return: ModelModals Object
        toggle  : (name) ->
            if (this.show[name] == true)
                this.show[name] = false
            else
                this.show[name] = true
            return this

        # `reset()`
        # Closes all open modals
        # return: ModelModals Object
        reset   : () ->
            for key, showModal of this.show
                this.show[key] = false
            return this
    }
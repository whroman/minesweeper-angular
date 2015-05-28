angular
.module 'ModelSliders', [
# Dependencies

]

.factory 'ModelSliders', () ->

    slider = () ->

        info = {}

        init = (min, max, initial) ->
            schema = () ->
                return  {
                    val : initial.toString()
                    options : {
                        from    : min
                        to      : max
                        step    : 1
                    }
                }

            info.x    = schema()

            info.y    = schema()

            info.mines = {
                val     : undefined
                options : undefined
            }

            return this.refresh()

        refresh = () ->
            currentVal = info.mines.val
            newVal = Math.floor( info.x.val * info.y.val / 4 ).toString()
            newFrom = Math.floor( info.x.val * info.y.val / 5 )
            newTo = Math.floor( info.x.val * info.y.val / 2 )

            info.mines.options = {
                from    : newFrom
                to      : newTo
                step    : info.x.options.step
            }

            if (currentVal == undefined || (parseFloat(currentVal) < newFrom || parseFloat(currentVal) > newTo))
                info.mines.val = newVal

            return this

        return {
            info    : info
            init    : init
            refresh : refresh
        }

    return slider()

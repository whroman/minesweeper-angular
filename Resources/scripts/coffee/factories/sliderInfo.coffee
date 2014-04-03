msSliderInfo = angular
    .module 'msSliderInfo', [
    # Dependencies

    ]

msSliderInfo.factory 'sliderInfo', () ->

    slider = () ->

        sliderInfo = {}

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

            sliderInfo.x    = schema()

            sliderInfo.y    = schema()

            sliderInfo.mines = {
                val     : undefined
                options : undefined
            }

            return sliderInfo

        refresh = () ->
            currentVal = sliderInfo.mines.val
            newVal = Math.floor( sliderInfo.x.val * sliderInfo.y.val / 3 ).toString()
            newFrom = Math.floor( sliderInfo.x.val * sliderInfo.y.val / 4 )
            newTo = Math.floor( sliderInfo.x.val * sliderInfo.y.val / 2 )

            sliderInfo.mines.options = {
                from    : newFrom
                to      : newTo
                step    : sliderInfo.x.options.step
            }

            if (currentVal == undefined || (currentVal < newFrom && currentVal > newTo))
                sliderInfo.mines.val = newVal

            return sliderInfo

        return {
            init    : init
            refresh : refresh
        }

    return slider()

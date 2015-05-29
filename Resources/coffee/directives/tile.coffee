angular
.module 'tile', []

.directive 'tile', (
    $parse,
    $rootScope
) ->
    return {
        template: [
            '<li>'
                '<span>{{text}}</span>'
            '</li>'
        ].join('')
        restrict: 'A'
        replace: true
        $scope:
            tile: '=tile'
            ngClass: '=ngClass'
        link: ($scope, $el, attrs) ->
            isClear = $scope.tile.model.isClear is true

            tileIsFlagged = ->
                $scope.tile.model.isClear isnt true and
                $scope.tile.model.isFlagged is true

            tileIsMine = ->
                $scope.tile.model.isClear is true and
                $scope.tile.model.isMine is true

            tileAdjacentMines = ->
                $scope.tile.model.isClear == true and $scope.tile.model.isMine == false


            updateText = ->
                if tileIsFlagged()
                    $scope.text = '?'
                else if tileIsMine()
                    $scope.text = 'X'
                else if tileAdjacentMines()
                    $scope.text = String $scope.tile.model.adjacentMines

            if $scope.tile.model.x is 0
                $el.addClass 'nth'

            updateClasses = ->
                elClasses = {
                    flagged : tileIsFlagged()
                    clear   : $scope.tile.model.isClear is true
                    mine    : tileIsMine()
                    zero    : $scope.tile.model.adjacentMines is 0 and $scope.tile.model.isClear is true
                }
                for elClass, shouldAttach of elClasses
                    if shouldAttach
                        $el.addClass elClass
                    else
                        $el.removeClass elClass

            update = ->
                updateText()
                updateClasses()

            update()

            onClick = ($event) ->
                $scope.tile.click $event
                update()

            $el.bind 'click', ($event) ->
                $scope.tile.click $event
                if !$scope.$$phase then $scope.$apply()

            $rootScope.$on 'Tiles:Updated', ->
                update()
    }
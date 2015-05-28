angular
.module 'tile', []

.directive 'tile', ($parse) ->
    return {
        link: ($scope, el, attrs) ->
            console.log 'adsf'
        template: "{{text}}"
        restrict: 'A'
        $scope:
            tile: '=tile'
            ngClass: '=ngClass'
        link: ($scope, $el, attrs) ->
            isClear = $scope.tile.model.isClear is true

            tileIsFlagged = (
                $scope.tile.model.isClear isnt true and
                $scope.tile.model.isFlagged is true
            )

            tileIsMine = (
                $scope.tile.model.isClear is true and
                $scope.tile.model.isMine is true
            )

            tileAdjacentMines = (
                $scope.tile.model.isClear == true &&
                $scope.tile.model.isMine == false
            )

            if tileIsFlagged
                $scope.text = '?'
            else if tileIsMine
                $scope.text = 'X'
            else if tileAdjacentMines
                $scope.text = $scope.tile.model.adjacentMines


            if $scope.tile.model.x is 0
                $el.addClass 'nth'

            updateClasses = ->
                elClasses = {
                    flagged : $scope.tile.model.isFlagged is true
                    clear   : $scope.tile.model.isClear is true
                    mine    : $scope.tile.model.isMine is true and $scope.tile.model.isClear is true
                    zero    : $scope.tile.model.adjacentMines is 0 and $scope.tile.model.isClear is true
                }
                for elClass, shouldAttach of elClasses
                    console.log 'key, val'
                    console.log elClass, shouldAttach
                    if (shouldAttach)
                        $el.addClass elClass
                    else
                        $el.removeClass elClass

            onClick = ($event) ->
                flagKeyIsSet = (
                    $event &&
                    (
                        $event.shiftKey is true or
                        $event.altKey is true
                    )
                )

                if flagKeyIsSet
                    $scope.tile.toggleFlag()
                else
                    console.log 's'
                    # noMineFirstClick $scope.tile
                    $scope.tile.clear()


            $el.bind 'click', onClick


    }


# angular
# .module('focusWhen', [])
# .directive('focusWhen', function($timeout, $parse) {
#   return {
#     link: function ($scope, element, attrs) {
#       var model = $parse(attrs.focusWhen);
#       $scope.$watch(model, function(value) {
#         if (value === true) {
#           // $timeout in place to give elements time to render
#           $timeout(function() {
#             element[0].focus();
#           });
#         }
#       });

#       element.bind('blur', function() {
#          $scope.$apply(model.assign($scope, false));
#       });
#     }
#   };
# });
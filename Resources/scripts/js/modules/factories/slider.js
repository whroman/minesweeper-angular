var msSliderInfo;

msSliderInfo = angular.module('msSliderInfo', []);

msSliderInfo.factory('sliderInfo', function() {
  var slider;
  slider = function(min, max, initial) {
    var reset, schema, sliderInfo;
    sliderInfo = {};
    schema = {
      val: initial.toString,
      options: {
        from: min,
        to: max,
        step: 1
      }
    };
    sliderInfo.x = schema;
    sliderInfo.y = schema;
    sliderInfo.mines = void 0;
    reset = function() {
      var currentVal, newFrom, newTo, newVal;
      currentVal = $scope.newGameInfo.mines.val;
      newVal = Math.floor($scope.newGameInfo.x.val * $scope.newGameInfo.y.val / 3).toString();
      newFrom = Math.floor($scope.newGameInfo.x.val * $scope.newGameInfo.y.val / 4);
      newTo = Math.floor($scope.newGameInfo.x.val * $scope.newGameInfo.y.val / 2);
      sliderInfo.mines.options = {
        from: newFrom,
        to: newTo,
        step: sliderInfo.x.options.step
      };
      if (currentVal === void 0 || (currentVal < newFrom && currentVal > newTo)) {
        return sliderInfo.mines.val = newVal;
      }
    };
    return {
      sliderInfo: sliderInfo,
      reset: reset
    };
  };
  return slider();
});

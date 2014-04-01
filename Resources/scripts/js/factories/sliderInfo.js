var msSliderInfo;

msSliderInfo = angular.module('msSliderInfo', []);

msSliderInfo.factory('sliderInfo', function() {
  var slider;
  slider = function() {
    var init, refresh, sliderInfo;
    sliderInfo = {};
    init = function(min, max, initial) {
      var schema;
      schema = {
        val: initial.toString(),
        options: {
          from: min,
          to: max,
          step: 1
        }
      };
      sliderInfo.x = schema;
      sliderInfo.y = schema;
      sliderInfo.mines = {
        val: void 0,
        options: void 0
      };
      return sliderInfo;
    };
    refresh = function() {
      var currentVal, newFrom, newTo, newVal;
      currentVal = sliderInfo.mines.val;
      newVal = Math.floor(sliderInfo.x.val * sliderInfo.y.val / 3).toString();
      newFrom = Math.floor(sliderInfo.x.val * sliderInfo.y.val / 4);
      newTo = Math.floor(sliderInfo.x.val * sliderInfo.y.val / 2);
      sliderInfo.mines.options = {
        from: newFrom,
        to: newTo,
        step: sliderInfo.x.options.step
      };
      if (currentVal === void 0 || (currentVal < newFrom && currentVal > newTo)) {
        sliderInfo.mines.val = newVal;
      }
      return sliderInfo;
    };
    return {
      init: init,
      refresh: refresh
    };
  };
  return slider();
});

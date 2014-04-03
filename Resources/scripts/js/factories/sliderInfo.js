var msSliderInfo;

msSliderInfo = angular.module('msSliderInfo', []);

msSliderInfo.factory('slider', function() {
  var slider;
  slider = function() {
    var info, init, refresh;
    info = {};
    init = function(min, max, initial) {
      var schema;
      schema = function() {
        return {
          val: initial.toString(),
          options: {
            from: min,
            to: max,
            step: 1
          }
        };
      };
      info.x = schema();
      info.y = schema();
      info.mines = {
        val: void 0,
        options: void 0
      };
      return this;
    };
    refresh = function() {
      var currentVal, newFrom, newTo, newVal;
      currentVal = info.mines.val;
      newVal = Math.floor(info.x.val * info.y.val / 3).toString();
      newFrom = Math.floor(info.x.val * info.y.val / 4);
      newTo = Math.floor(info.x.val * info.y.val / 2);
      info.mines.options = {
        from: newFrom,
        to: newTo,
        step: info.x.options.step
      };
      if (currentVal === void 0 || (currentVal < newFrom && currentVal > newTo)) {
        info.mines.val = newVal;
      }
      return this;
    };
    return {
      info: info,
      init: init,
      refresh: refresh
    };
  };
  return slider();
});

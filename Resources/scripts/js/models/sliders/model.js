angular.module('ModelSliders', []).factory('ModelSliders', function() {
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
      return this.refresh();
    };
    refresh = function() {
      var currentVal, newFrom, newTo, newVal;
      currentVal = info.mines.val;
      newVal = Math.floor(info.x.val * info.y.val / 4).toString();
      newFrom = Math.floor(info.x.val * info.y.val / 5);
      newTo = Math.floor(info.x.val * info.y.val / 2);
      info.mines.options = {
        from: newFrom,
        to: newTo,
        step: info.x.options.step
      };
      if (currentVal === void 0 || (parseFloat(currentVal) < newFrom || parseFloat(currentVal) > newTo)) {
        info.mines.val = newVal;
      }
      console.log(this, newVal, newFrom, currentVal, newTo, parseFloat(currentVal));
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

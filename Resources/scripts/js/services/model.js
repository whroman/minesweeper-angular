angular.module('msModel', ['msModelMethods']).service('model', function(modelMethods) {
  var model;
  return model = function(newAttrs) {
    this.model = {
      x: void 0,
      y: void 0,
      isMine: false,
      isClear: false,
      isFlagged: false,
      adjacentMines: 0
    };
    this.getSchema = function() {
      return schema;
    };
    this.set = function(attrs) {
      var attr, key;
      for (key in attrs) {
        attr = attrs[key];
        getSchema().model[key] = attr;
      }
      return getSchema();
    };
    this.extend = function(methods) {
      var key, method;
      for (key in methods) {
        method = methods[key];
        getSchema()[key] = method;
      }
      return getSchema();
    };
    this.schema = {
      model: this.model,
      set: this.set,
      extend: this.extend,
      getSchema: this.getSchema
    };
    return this.set(newAttrs).extend(modelMethods());
  };
});

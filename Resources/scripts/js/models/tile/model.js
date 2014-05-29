angular.module('ModelTile', ['ModelMethodsTile']).service('ModelTile', function(ModelMethodsTile) {
  var model;
  return model = function(newAttrs) {
    var bootstrappedTile, extend, getSchema, schema, set;
    model = {
      x: void 0,
      y: void 0,
      uid: void 0,
      isMine: false,
      isClear: false,
      isFlagged: false,
      adjacentMines: 0
    };
    getSchema = function() {
      return schema;
    };
    set = function(attrs) {
      var attr, key;
      for (key in attrs) {
        attr = attrs[key];
        getSchema().model[key] = attr;
      }
      getSchema().model.uid = getSchema().model.x.toString() + getSchema().model.y.toString();
      return getSchema();
    };
    extend = function(methods) {
      var key, method;
      for (key in methods) {
        method = methods[key];
        getSchema()[key] = method;
      }
      return getSchema();
    };
    schema = {
      model: model,
      set: set,
      extend: extend,
      getSchema: getSchema
    };
    bootstrappedTile = set(newAttrs).extend(ModelMethodsTile());
    return bootstrappedTile;
  };
});

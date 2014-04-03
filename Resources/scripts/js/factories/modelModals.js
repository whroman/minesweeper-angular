angular.module('modelModals', []).factory('modelModals', function() {
  return {
    path: {},
    show: {},
    set: function(path, fileNames) {
      var fileName, _i, _len;
      for (_i = 0, _len = fileNames.length; _i < _len; _i++) {
        fileName = fileNames[_i];
        this.path[fileName] = path + fileName + '.html';
        this.show[fileName] = false;
      }
      return this;
    },
    toggle: function(name) {
      if (this.show[name] === true) {
        this.show[name] = false;
      } else {
        this.show[name] = true;
      }
      return this;
    },
    reset: function() {
      var key, showModal, _ref;
      _ref = this.show;
      for (key in _ref) {
        showModal = _ref[key];
        this.show[key] = false;
      }
      return this;
    }
  };
});

var path = require('./paths.js');

var options = {};

options.css = {
    keepSpecialComments : 0,
    removeEmpty : true,
};

options.scss    = {
    style   : 'compressed',
    sourcemap : true
};

options.coffee  = {
    bare    : true,
};

options.gulpSrc = {
    cwd     : path.cwd,
};

options.gulpNoRead = {
    cwd     : path.cwd,
    read    : false
};

options.htmlReplace = {
    js  : path.js.compile
};

module.exports = options;
var path = require('./paths.js');

var options = {};

options.gulpSrc = {
    cwd     : path.cwd,
};

options.gulpNoRead = {
    cwd     : path.cwd,
    read    : false
};

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

options.uglify = {
    mangle: false
};

options.htmlReplace = {
    js  : path.js.compile
};

options.connect = {
    root    : [path.cwd],
    port    : '8888'
}

module.exports = options;
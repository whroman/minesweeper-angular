var path = require('./paths.js');

var options = {};

options.gulpSrc = {
    cwd     : path.cwd,
};

options.gulpNoRead = {
    cwd     : path.cwd,
    read    : false
};

options.scss    = {
    style   : 'compressed',
    sourcemap : true
};

options.coffee  = {
    bare    : true,
};

options.uglify = {
    mangle: false,
    outSourceMap: true,
    basePath: './Resources'
};

options.connect = {
    root    : [path.cwd],
    port    : '8888'
}

module.exports = options;
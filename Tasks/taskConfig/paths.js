var batchPaths = require('./batchPaths.js');

var path = {
    cwd     : '../',
    root    : 'Resources/'
}

path.bower = path.root + 'bower_components/';
path.build = path.root + 'build/';

path.scss = {
    watch   : path.root + 'scss/**/*.scss',
    src     : [path.root + 'scss/index.scss'],
    buildName   : 'build.scss'
}

path.js = {
    compiled    : path.root + 'scripts/js/',
    build       : path.build + 'build.js',
}


path.js.compile = batchPaths
    .suffix('.js')
    .prefix(path.bower)
    .add([
        'angular/angular.min',
        'angular-route/angular-route.min',
        'angular-sanitize/angular-sanitize.min',
        'angular-cookies/angular-cookies.min',
        'angularLocalStorage/src/angularLocalStorage',
        'jquery/dist/jquery.min',
        'ng-slider/dist/ng-slider.min'
    ])
    .prefix(path.js.compiled)
    .add([
        'collections/tiles/collection',
        'models/sliders/model',
        'models/modals/model',
        'models/tile/model',
        'models/tile/modelMethods',
        'controllers/board',
        'app'
    ])
    .all()

path.coffee = {
    src     : [path.root + 'scripts/coffee/**/*.coffee'],
    dest    : path.js.compiled,
}

path.html = {
    dev     : 'dev.html',
    index   : 'index.html'
}

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



module.exports = {
    path: path,
    options : options
}
var path = {
    cwd     : '../',
    root    : 'Resources/'
}

path.bower = path.root + 'bower_components/';
path.build = path.root + 'build/';

path.scss = {
    watch   : path.root + 'scss/**/*.scss',
    src     : [path.root + 'scss/index.scss'],
    build   : 'build.scss'
}

path.js = {
    compiled: path.root + 'scripts/js/',
    build   : path.build + 'build.js',
}   


path.js.compile = [
    path.bower + 'angular/angular.min.js',
    path.bower + 'angular-route/angular-route.min.js',
    path.bower + 'angular-sanitize/angular-sanitize.min.js',
    path.bower + 'angular-cookies/angular-cookies.min.js',
    path.bower + 'angularLocalStorage/src/angularLocalStorage.js',
    path.bower + 'jquery/dist/jquery.min.js',
    path.bower + 'ng-slider/dist/ng-slider.min.js',
    path.js.compiled + 'collections/tiles/collection.js',
    path.js.compiled + 'models/sliders/model.js',
    path.js.compiled + 'models/modals/model.js',
    path.js.compiled + 'models/tile/model.js',
    path.js.compiled + 'models/tile/modelMethods.js',
    path.js.compiled + 'models/boardInfo/model.js',
    path.js.compiled + 'controllers/board.js',
    path.js.compiled + 'app.js'
];

path.coffee = {
    src     : [path.root + 'scripts/coffee/**/*.coffee'],
    dest    : path.js.compiled,
}

path.html = {
    dev     : 'dev.html',
    index   : 'index.html'
}

module.exports = path;
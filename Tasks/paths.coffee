require 'coffee-script/register'

path =
    root    : './Resources/'

path.bower = path.root + 'bower_components/'
path.build = path.root + 'build/'

path.scss =
    watch   : path.root + 'scss/**/*.scss'
    src     : [path.root + 'scss/app.scss']
    build   : 'build.scss'

path.coffee =
    src     : [path.root + 'scripts/coffee/**/*.coffee']
    dest    : path.root + 'scripts/js/'

path.js =
    build   : path.build + 'build.js'

    libs: [
        path.bower + 'angular/angular.min.js'
        path.bower + 'angular-route/angular-route.min.js'
        path.bower + 'angular-sanitize/angular-sanitize.min.js'
        path.bower + 'angular-cookies/angular-cookies.min.js'
        path.bower + 'angularLocalStorage/src/angularLocalStorage.js'
        path.bower + 'jquery/dist/jquery.min.js'
        path.bower + 'ng-slider/dist/ng-slider.min.js'
    ]

    src: [
        path.coffee.dest + 'app.js'
        path.coffee.dest + 'controllers/board.js'
        path.coffee.dest + 'collections/tiles/collection.js'
        path.coffee.dest + 'models/sliders/model.js'
        path.coffee.dest + 'models/modals/model.js'
        path.coffee.dest + 'models/tile/model.js'
        path.coffee.dest + 'models/tile/modelMethods.js'
        path.coffee.dest + 'models/boardInfo/model.js'
    ]

path.js.all = path.js.libs.concat path.js.src

module.exports = path
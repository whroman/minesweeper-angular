require 'coffee-script/register'

path =
    root    : './Resources/'

path.bower = path.root + 'bower_components/'
path.build = path.root + 'build/'

path.scss =
    watch   : path.root + 'scss/**/*.scss'
    src     : [path.root + 'scss/app.scss']
    build   : 'build.scss'

path.coffee = {}
path.coffee.src = [path.root + 'coffee/**/*.coffee']
path.coffee.dest = path.build + 'js/'

path.js =
    build   : path.build + 'build.js'

    libs: [
        'angular/angular.min.js'
        'angular-route/angular-route.min.js'
        'angular-sanitize/angular-sanitize.min.js'
        'angular-cookies/angular-cookies.min.js'
        'angularLocalStorage/src/angularLocalStorage.js'
        'jquery/dist/jquery.min.js'
        'ng-slider/dist/ng-slider.min.js'
    ].map (file) -> path.bower + file

path.js.all = path.js.libs.concat(path.coffee.dest + '**/*.js')

module.exports = path
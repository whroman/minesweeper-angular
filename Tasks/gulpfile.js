var gulp    = require('gulp')
var util    = require('gulp-util')
var sass    = require('gulp-ruby-sass')
var rename  = require('gulp-rename')
var coffee  = require('gulp-coffee')
var connect = require('gulp-connect')
var concat  = require('gulp-concat')
var uglify  = require('gulp-uglify')
var processhtml  = require('gulp-processhtml')
var htmlreplace  = require('gulp-html-replace')
var clean   = require('gulp-clean')

var config = {
    scss    : {
        style   : 'compressed',
    },
    coffee  : {
        bare    : true,
    },
}

var path = {
    root    : '../Resources/'
}

path.build = path.root + 'build/';

path.scss = {
    src     : [path.root + 'stylesheets/scss/init.scss'],
    watch   : path.root + 'stylesheets/scss/**/*.scss',
    dest    : {
        dirname     : path.build,
        basename    : 'build',
        extname     : '.css',
    },
}

path.js = {
    watch   : path.root + 'scripts/js/**/*.js',
    modules : path.root + 'scripts/js/modules/',
    lib     : path.root + 'scripts/js/lib/',
    build   : path.build + 'build.js',
}

path.js.compile = [
    path.js.lib + 'angular.min.js',
    path.js.lib + 'jquery.min.js',
    path.js.lib + 'angular-route.min.js',
    path.js.lib + 'angular-sanitize.js',
    path.js.lib + 'angular-cookies.min.js',
    path.js.lib + 'angularLocalStorage.js',
    path.js.lib + 'ng-slider.min.js',

    
    path.js.modules + 'factories/sliderInfo.js',
    path.js.modules + 'factories/collection.js',
    path.js.modules + 'services/model.js',
    path.js.modules + 'services/modelMethods.js',
    path.js.modules + 'controllers/board.js',
    path.js.modules + 'app.js',
]

path.coffee = {
    src   : [path.root + 'scripts/coffee/modules/**/*.coffee'],
    dest    : path.js.modules,
}

path.html = {
    dev     : '../dev.html',
    index   : '../index.html'
}

gulp.task(
    'sass', 
    function() {
        gulp
        .src(
            path.scss.src
        )
        .pipe(
            sass( config.scss )
        )
        .pipe(
            rename( path.scss.dest )
        )
        .pipe(
            gulp.dest('./')
        )
        .pipe(
            connect.reload()
        )
    }
);


gulp.task(
    'coffee',
    function() {
        gulp
        .src(
            path.coffee.src
        )
        .pipe(
            coffee(
                config.coffee
            ).on('error', util.log)
        )
        .pipe(
            gulp.dest(
                path.coffee.dest
            )
        )
    }
);

gulp.task(
    'compile-js',
    function() {
        gulp
        .src(
            path.js.compile
        )
        .pipe(
            concat(path.js.build)
        )
        .pipe(
            uglify({
                mangle: false
            })
        )
        .pipe(
            gulp.dest('./')
        )
    }
)

gulp.task(
    'clean-js', 
    function() {
        gulp
        .src(
            path.js.modules, 
            {
                read: false
            }
        )
        .pipe(
            clean({
                force: true
            })
        )
    }
)

gulp.task(
    'connect', 
    connect.server({
        root    : ['../'],
        port    : '8888'
    })
);

gulp.task(
    'watch', 
    function() {
        gulp.watch(
            path.scss.watch, ['sass']
        )
        gulp.watch(
            path.coffee.src, ['coffee', 'compile-js']
        )
        gulp.watch(
            path.html.dev, ['html']
        )
    }
);

gulp.task(
    'html',
    function() {
        gulp
        .src(
            path.html.index
        )
        .pipe(
            htmlreplace({
                js: path.js.compile
            })
        )
        .pipe(
            rename(path.html.dev)
        )
        .pipe(
            gulp.dest('./')
        )
    }
)

gulp.task(
    'default', 
    ['coffee', 'compile-js', 'sass', 'html', 'watch', 'connect']
); 

gulp.task(
    'dev', 
    ['default']
); 
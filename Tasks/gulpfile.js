var gulp    = require('gulp')
var util    = require('gulp-util')
var sass    = require('gulp-ruby-sass')
var cssmin    = require('gulp-minify-css')
var rename  = require('gulp-rename')
var coffee  = require('gulp-coffee')
var connect = require('gulp-connect')
var concat  = require('gulp-concat')
var uglify  = require('gulp-uglify')
var processhtml  = require('gulp-processhtml')
var htmlreplace  = require('gulp-html-replace')
var clean   = require('gulp-clean')

var options = {
    css     : {
        keepSpecialComments : 0,
        removeEmpty : true,
    },
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

path.css = {
    lib         : path.root + 'stylesheets/lib/',
    compiled    : path.root + 'stylesheets/css/',
    build       : path.build + 'build.css',
}

path.css.compile = [
    path.css.lib + 'ng-slider.min.css',
    path.css.compiled + 'base.css',
    path.css.compiled + 'board.css',
    path.css.compiled + 'dashboard.css',
    path.css.compiled + 'overlay.css',
]

path.scss = {
    src     : [path.root + 'stylesheets/scss/**/*.scss'],
    dest    : path.css.compiled
}

path.js = {
    lib         : path.root + 'scripts/lib/',
    compiled    : path.root + 'scripts/js/',
    build       : path.build + 'build.js',
}

path.js.compile = [
    path.js.lib + 'angular.min.js',
    path.js.lib + 'jquery.min.js',
    path.js.lib + 'angular-route.min.js',
    path.js.lib + 'angular-sanitize.js',
    path.js.lib + 'angular-cookies.min.js',
    path.js.lib + 'angularLocalStorage.js',
    path.js.lib + 'ng-slider.min.js',
    
    path.js.compiled + 'factories/sliderInfo.js',
    path.js.compiled + 'factories/collection.js',
    path.js.compiled + 'services/model.js',
    path.js.compiled + 'services/modelMethods.js',
    path.js.compiled + 'controllers/board.js',
    path.js.compiled + 'app.js',
]

path.coffee = {
    src     : [path.root + 'scripts/coffee/**/*.coffee'],
    dest    : path.js.compiled,
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
            sass( options.scss )
        )
        .pipe(
            gulp.dest(path.scss.dest)
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
                options.coffee
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
    'compile-css',
    function() {
        gulp
        .src(
            path.css.compile
        )
        .pipe(
            concat(path.css.build)
        )
        .pipe(
            cssmin(options.css)
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
            path.js.compiled, 
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
    'html',
    function() {
        gulp
        .src(
            path.html.index
        )
        .pipe(
            htmlreplace({
                js  : path.js.compile,
                css : path.css.compile
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
            path.scss.src, ['sass', 'compile-css']
        )
        gulp.watch(
            path.coffee.src, ['coffee', 'compile-js']
        )
        gulp.watch(
            path.html.index, ['html']
        )
    }
);

gulp.task(
    'default', 
    ['coffee', 'compile-js', 'sass', 'compile-css', 'html', 'watch', 'connect']
); 

gulp.task(
    'dev', 
    ['default']
); 
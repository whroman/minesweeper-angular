var gulp    = require('gulp')
var util    = require('gulp-util')
var sass    = require('gulp-ruby-sass')
var rename  = require('gulp-rename')
var coffee  = require('gulp-coffee')
var connect = require('gulp-connect')
var concat  = require('gulp-concat')
var uglify  = require('gulp-uglify')
var processhtml  = require('gulp-processhtml')

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
    src     : [path.root + 'scss/init.scss'],
    watch   : path.root + 'scss/**/*.scss',
    dest    : {
        dirname     : path.build,
        basename    : 'build',
        extname     : '.css',
    },
}

path.js = {
    watch   : path.root + 'js/**/*.js',
    modules : path.root + 'js/modules/',
    lib     : path.root + 'js/lib/',
    build    : path.build + 'build.js',
}

path.js.compile = [
    path.js.lib + 'angular.min.js',
    path.js.lib + 'angular-route.min.js',
    path.js.lib + 'angular-cookies.min.js',
    path.js.lib + 'angularLocalStorage.js',
    
    path.js.modules + 'app.js',
    path.js.modules + 'controllers.js',
]

path.coffee = {
    src   : [path.root + 'coffee/modules/**/*.coffee'],
    dest    : path.js.modules,
}

path.html = {
    src     : ['../dev.html'],
    build   : '../index.html'
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
        .pipe(
            connect.reload()
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
        .pipe(
            connect.reload()
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
            path.coffee.src, ['coffee']
        )
        gulp.watch(
            path.js.watch, ['compile-js']
        )
        gulp.watch(
            path.html.src, ['html']
        )
    }
);

gulp.task(
    'html', 
    function() {
        gulp
        .src(
            path.html.src
        )
        .pipe(
            processhtml(path.html.build)
        )
        .pipe(
            gulp.dest('./')
        )
    }
); 

gulp.task(
    'default', 
    ['sass', 'coffee', 'compile-js', 'html', 'watch', 'connect']
); 

gulp.task(
    'dev', 
    ['default']
); 
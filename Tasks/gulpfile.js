var gulp    = require('gulp')
var util    = require('gulp-util')
var sass    = require('gulp-ruby-sass')
var cssmin    = require('gulp-minify-css')
var rename  = require('gulp-rename')
var coffee  = require('gulp-coffee')
var connect = require('gulp-connect')
var concat  = require('gulp-concat')
var uglify  = require('gulp-uglify')
var htmlreplace  = require('gulp-html-replace')
var clean   = require('gulp-clean')
var bower = require('gulp-bower')

var config = require('./taskConfig/paths.js')

var path = config.path;
var options = config.options;

gulp.task(
    'sass', 
    function() {
        console.log(options.gulpSrc)
        return gulp
        .src(
            path.scss.src, options.gulpSrc
        )
        .pipe(
            sass( options.scss )
        )
        .pipe(
            gulp.dest( path.cwd + path.scss.dest )
        )
        .pipe(
            connect.reload()
        )
    }
);


gulp.task(
    'coffee',
    function() {
        return gulp
        .src(
            path.coffee.src, options.gulpSrc
        )
        .pipe(
            coffee(
                options.coffee
            ).on('error', util.log)
        )
        .pipe(
            gulp.dest( path.cwd + path.coffee.dest )
        )
    }
);

gulp.task(
    'build-js',
    function() {
        return gulp
        .src(
            path.js.compile, options.gulpSrc
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
            gulp.dest( path.cwd )
        )
    }
)

gulp.task(
    'build-css',
    function() {
        return gulp
        .src(
            path.css.compile, options.gulpSrc
        )
        .pipe(
            concat(path.css.build)
        )
        .pipe(
            cssmin(options.css)
        )
        .pipe(
            gulp.dest( path.cwd )
        )
    }
)

gulp.task(
    'clean-js', 
    function() {
        return gulp
        .src(
            path.js.compiled, options.gulpNoRead
        )
        .pipe(
            clean({
                force: true
            })
        )
    }
)

gulp.task(
    'clean-css', 
    function() {
        return gulp
        .src(
            path.css.compiled, options.gulpNoRead
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
        return gulp
        .src(
            path.html.index, options.gulpSrc
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
            gulp.dest(path.cwd)
        )
    }
)

gulp.task(
    'connect', 
    connect.server({
        root    : [path.cwd],
        port    : '8888'
    })
);


gulp.task(
    'watch', 
    function() {
        console.log(options.gulpSrc)
        gulp.watch(
            path.scss.src, options.gulpNoRead, ['sass', 'build-css']
        )
        gulp.watch(
            path.coffee.src, options.gulpNoRead, ['coffee', 'build-js']
        )
        gulp.watch(
            path.html.index, ['html']
        )
    }
);

gulp.task(
    'bower',
    function() {
        bower()
    }
);

gulp.task(
    'compile',
    ['coffee', 'build-js', 'sass', 'build-css']
);

gulp.task(
    'clean',
    ['clean-js', 'clean-css']
);

gulp.task(
    'dev', 
    ['compile', 'html', 'watch', 'connect']
);

gulp.task(
    'default', 
    ['dev']
); 
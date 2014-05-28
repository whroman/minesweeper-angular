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
var bower = require('gulp-bower')

var config = require('./taskConfig/paths.js')

var path = config.path;
var options = config.options;

gulp.task(
    'sass', 
    function() {
        return gulp
        .src(path.scss.src, options.gulpSrc)
        .pipe(rename('build.scss'))
        .pipe(sass(options.scss).on('error', util.log))
        .pipe(gulp.dest(path.cwd + path.build))
        .pipe(connect.reload())
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
    'html',
    function() {
        return gulp
        .src(
            path.html.index, options.gulpSrc
        )
        .pipe(
            htmlreplace(options.htmlReplace)
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
        gulp.watch(
            path.scss.src, options.gulpNoRead, ['sass']
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
    ['coffee', 'build-js', 'sass']
);

gulp.task(
    'dev', 
    ['compile', 'html', 'watch', 'connect']
);

gulp.task(
    'default', 
    ['dev']
); 
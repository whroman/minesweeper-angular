var gulp = require('gulp');

// Loads all gulp plugins located in package.json
// > Call plugins using `gp.<camelizedPluginName>
var gp = require('gulp-load-plugins')();

// Load configurations for gulp files
var config = require('./config');
var path = config.path;
var options = config.options;

gulp.task(
    'sass', 
    function() {
        return gulp
        .src(path.scss.src, options.gulpSrc)
        .pipe(gp.rename('build.scss'))
        .pipe(gp.rubySass(options.scss).on('error', gp.util.log))
        .pipe(gulp.dest(path.cwd + path.build))
        .pipe(gp.connect.reload())
    }
);


gulp.task(
    'coffee',
    function() {
        var coffee = gulp
            .src(path.coffee.src, options.gulpSrc)
            .pipe(gp.coffee(options.coffee).on('error', gp.util.log))
            .pipe(gulp.dest(path.cwd + path.coffee.dest))

        return coffee;
    }
);

gulp.task(
    'build-js',
    ['coffee'],
    function() {
        var js = gulp
            .src(path.js.all, options.gulpSrc)
            .pipe(gp.uglifyjs('build.js', options.uglify))
            .pipe(gulp.dest(path.cwd + path.build))

        return js;
    }
)

gulp.task(
    'connect', 
    gp.connect.server(options.connect)
);


gulp.task(
    'watch', 
    function() {
        gulp.watch(
            path.scss.watch, options.gulpNoRead, ['sass']
        )
        gulp.watch(
            path.coffee.src, options.gulpNoRead, ['coffee', 'build-js']
        )
    }
);

gulp.task(
    'build',
    ['coffee', 'build-js', 'sass']
);

gulp.task(
    'dev', 
    ['build', 'watch', 'connect']
);

gulp.task(
    'default', 
    ['dev']
); 
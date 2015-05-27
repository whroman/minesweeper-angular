require 'coffee-script/register'

gulp = require 'gulp'

# Loads all gulp plugins located in package.json
# > Call plugins using `gp.<camelizedPluginName>
gp = do require 'gulp-load-plugins'

# Load configurations for gulp files
config = require './config'
paths = config.paths
options = config.options

gulp.task 'sass', ->
    gulp.src paths.scss.src, options.gulpSrc
        .pipe gp.rename 'build.scss'
        .pipe(
            gp.rubySass options.scss
                .on 'error', gp.util.log
        )
        .pipe gulp.dest(paths.cwd + paths.build)
        .pipe gp.connect.reload()


gulp.task 'coffee', ->
    gulp.src paths.coffee.src, options.gulpSrc
        .pipe(
            gp.coffee options.coffee
                .on 'error', gp.util.log
        )
        .pipe gulp.dest(paths.cwd + paths.coffee.dest)

gulp.task 'build-js', ['coffee'], ->
    gulp.src paths.js.all, options.gulpSrc
        .pipe gp.uglifyjs 'build.js', options.uglify
        .pipe gulp.dest(paths.cwd + paths.build)

gulp.task 'connect', gp.connect.server options.connect


gulp.task 'watch', ->
    gulp.watch paths.scss.watch, options.gulpNoRead, ['sass']

    gulp.watch paths.coffee.src, options.gulpNoRead, ['coffee', 'build-js']

gulp.task 'build', [
    'coffee'
    'build-js'
    'sass'
]

gulp.task 'dev', [
    'build'
    'watch'
    'connect'
]

gulp.task 'default', ['dev']
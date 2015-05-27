require 'coffee-script/register'

gulp = require 'gulp'

# Loads all gulp plugins located in package.json
# > Call plugins using `gp.<camelizedPluginName>
gp = do require 'gulp-load-plugins'

# Load configurations for gulp files
Tasks = require './Tasks'
paths = Tasks.paths
options = Tasks.options

gulp.task 'sass', ->
    gulp.src paths.scss.src
        .pipe gp.rename 'build.scss'
        .pipe(
            gp.rubySass options.scss
                .on 'error', gp.util.log
        )
        .pipe gulp.dest paths.build
        .pipe gp.connect.reload()


gulp.task 'coffee', ->
    gulp.src paths.coffee.src
        .pipe(
            gp.coffee options.coffee
                .on 'error', gp.util.log
        )
        .pipe gulp.dest paths.coffee.dest

gulp.task 'build-js', ['coffee'], ->
    gulp.src paths.js.all
        .pipe gp.uglifyjs 'build.js', options.uglify
        .pipe gulp.dest paths.build

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
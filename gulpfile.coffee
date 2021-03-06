require 'coffee-script/register'

gulp = require 'gulp'
del = require 'del'
vinylPaths = require 'vinyl-paths'

# Loads all gulp plugins located in package.json
# > Call plugins using `gp.<camelizedPluginName>
gp = do require 'gulp-load-plugins'

# Load configurations for gulp files
Tasks = require './Tasks'
paths = Tasks.paths
options = Tasks.options

gulp.task 'sass', ->
    gulp.src paths.scss.src
        .pipe gp.sourcemaps.init()
            .pipe gp.rename 'build.scss'
            .pipe(
                gp.sass options.scss
                    .on 'error', gp.sass.logError
            )
        .pipe gp.sourcemaps.write('./sass-maps')
        .pipe gulp.dest paths.build

gulp.task 'js:clean', (cb) ->
    del paths.coffee.dest, cb
    # gulp.src paths.js.all
    #     .pipe vinylPaths del

gulp.task 'js:coffee', ['js:clean'], ->
    gulp.src paths.coffee.src
        .pipe gp.sourcemaps.init()
            .pipe(gp.coffee(options.coffee)
                .on 'error', (error) ->
                    console.log error
            )
            .pipe gp.uglify options.uglify
        .pipe gp.sourcemaps.write()
        .pipe gulp.dest paths.coffee.dest

gulp.task 'js:build', ['js:coffee'], ->
    gulp.src paths.js.all
        .pipe gp.sourcemaps.init(loadMaps : true)
            .pipe gp.concat 'build.js'
        .pipe gp.sourcemaps.write('./maps')
        .pipe gulp.dest paths.build

gulp.task 'server', ->
    gp.liveServer.static '.', 8888
        .start()


gulp.task 'watch', ->
    gulp.watch paths.scss.watch, options.gulpNoRead, ['sass']

    gulp.watch paths.coffee.src, options.gulpNoRead, ['js:coffee', 'js:build']

gulp.task 'build', [
    'js:coffee'
    'js:build'
    'sass'
]

gulp.task 'dev', [
    'build'
    'watch'
    'server'
]

gulp.task 'default', ['dev']
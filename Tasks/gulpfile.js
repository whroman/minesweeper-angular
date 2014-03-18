var gulp    = require('gulp');
var sass    = require('gulp-ruby-sass');
var rename  = require('gulp-rename');
var connect = require('gulp-connect');



var root = '../Resources/';
var build = root + 'build/'

var scss = {
    init    : root + 'scss/init.scss',
    watch   : root + 'scss/**/*.scss',
    build   : {
        dirname     : build,
        basename    : 'build',
        extname     : '.css'        
    }
}

gulp.task(
    'sass', 
    function() {
        gulp
            .src(
                [
                    scss.init
                ]
            )
            .pipe(
                sass({
                    style   : 'compressed'
                })
            )
            .pipe(
                rename( scss.build )
            )
            .pipe(
                gulp.dest('./')
            )
            .pipe(connect.reload())
    }
);

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
            scss.watch, ['sass']
        );
    }
);

gulp.task(
    'default', 
    ['sass', 'watch', 'connect']
); 
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
var bower = require('gulp-bower')

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

function setPaths(path, format, files) {
    filePaths = [];

    for (var i = 0; i < files.length; i++) {
        filePaths.push(path + files[i] + format)
    }

    return filePaths;
}

var path = {
    root    : '../Resources/'
}

path.bower = path.root + 'bower_components/';
path.build = path.root + 'build/';

path.css = {
    lib         : path.root + 'stylesheets/lib/',
    compiled    : path.root + 'stylesheets/css/',
    build       : path.build + 'build.css',
}

path.css.compile = [
    path.bower + 'ng-slider/dist/css/ng-slider.min.css',
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
    compiled    : path.root + 'scripts/js/',
    build       : path.build + 'build.js',
}


path.js.compile = setPaths(
    path.bower, '.js', [
        'angular/angular.min',
        'angular-route/angular-route.min',
        'angular-sanitize/angular-sanitize.min',
        'angular-cookies/angular-cookies.min',
        'angularLocalStorage/src/angularLocalStorage',
        'jquery/dist/jquery.min',
        'ng-slider/dist/ng-slider.min'
    ]
).concat(setPaths(
    path.js.compiled, '.js', [
        'collections/tiles/collection',
        'models/sliders/model',
        'models/modals/model',
        'models/tile/model',
        'models/tile/modelMethods',
        'controllers/board',
        'app'
    ]
))

path.css.inject = path.css.compile
path.js.inject = path.js.compile

for (var i = 0; i < path.css.inject; i++) {
    path.css.inject[i].replace("../", "./")
}

for (var i = 0; i < path.js.inject; i++) {
    path.js.inject[i].replace("../", "./")
}

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
        return gulp
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
        return gulp
        .src(path.coffee.src)
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
    'build-js',
    function() {
        return gulp
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
    'build-css',
    function() {
        return gulp
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
        return gulp
        .src(
            path.js.compiled, {
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
    'clean-css', 
    function() {
        return gulp
        .src(
            path.css.compiled, {
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
        return gulp
        .src(
            path.html.index
        )
        .pipe(
            htmlreplace({
                js  : path.js.inject,
                css : path.css.inject
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
            path.scss.src, ['sass', 'build-css']
        )
        gulp.watch(
            path.coffee.src, ['coffee', 'build-js']
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
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

function setPaths(path, format, files) {
    filePaths = [];

    for (var i = 0; i < files.length; i++) {
        filePaths.push(path + files[i] + format)
    }

    return filePaths;
}

var path = {
    cwd     : '../',
    root    : 'Resources/'
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

path.coffee = {
    src     : [path.root + 'scripts/coffee/**/*.coffee'],
    dest    : path.js.compiled,
}

path.html = {
    dev     : 'dev.html',
    index   : 'index.html'
}

var options = {};

options.css = {
    keepSpecialComments : 0,
    removeEmpty : true,
};

options.scss    = {
    style   : 'compressed',
};

options.coffee  = {
    bare    : true,
};

options.gulpSrc = {
    cwd     : path.cwd,
};

options.gulpNoRead = {
    cwd     : path.cwd,
    read    : false
};

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
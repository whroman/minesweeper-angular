paths = require './paths.coffee'

options =
    gulpSrc:
        cwd : paths.cwd

    gulpNoRead:
        cwd : paths.cwd
        read : false

    scss:
        style : 'compressed'
        sourcemap : true

    coffee :
        bare : true

    uglify:
        mangle : false
        outSourceMap : true
        basePath : './Resources'

    connect:
        root : [paths.cwd]
        port : '8888'

module.exports = options
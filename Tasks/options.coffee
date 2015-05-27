paths = require './paths.coffee'

options =
    gulpNoRead:
        read : false

    scss:
        style : 'compressed'
        sourcemap : true
        noCache : true

    coffee :
        bare : true

    uglify:
        mangle : false
        outSourceMap : true
        basePath : './Resources'

    connect:
        port : '8888'

module.exports = options
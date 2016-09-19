module.exports = function (gulp, plugin, PATH) {
    
    return function () {
        return gulp.src([
            PATH.engineSrc + '/**/core.js',
            PATH.engineSrc + '/**/*.js'
        ])
            .pipe(plugin.newer(PATH.scripts + '/build/engine.js'))
            .pipe(plugin.concat('engine.js'))
            .pipe(gulp.dest(PATH.scripts + '/build/'));
    }

};
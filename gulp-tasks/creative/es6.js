module.exports = function (gulp, plugin, PATH) {
    
    return function() {

        var init = plugin.browserify({entries: PATH.scripts + '/init.js', extensions: ['.js'], debug: true})
            .transform('babelify', {presets: ['es2015']})
            .bundle()
            .pipe(plugin.source('init.build.js'))
            .pipe(gulp.dest(PATH.scripts));

        return init;

    }

};
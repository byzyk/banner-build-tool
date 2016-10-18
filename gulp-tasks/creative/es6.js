module.exports = function (gulp, plugin, PATH) {
    
    return function () {

        var init = plugin.browserify({entries: PATH.scripts + '/init.js', extensions: ['.js'], debug: true})
            .transform('babelify', {presets: ['es2015']})
            .bundle()
            .pipe(plugin.source('init.js'))
            .pipe(gulp.dest(plugin.path.join(PATH.build, 'scripts')));

        return init;

    };

};
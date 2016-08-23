module.exports = function (gulp, plugin, PATH) {
    
    return function() {
        return plugin.browserify({entries: PATH.appViews + '/App.jsx', extensions: ['.jsx'], debug: true})
            .transform('babelify', {presets: ['es2015', 'react']})
            .bundle()
            .pipe(plugin.source('app.js'))
            .pipe(gulp.dest(PATH.appScripts));
    }

};
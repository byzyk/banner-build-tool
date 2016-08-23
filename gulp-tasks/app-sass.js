module.exports = function (gulp, plugin, PATH) {
    
    return function () {
        var f = plugin.filter(['**/*.css']);
        return gulp.src(PATH.appSass + '/main.scss')
            .pipe(plugin.sass())
            .pipe(gulp.dest(PATH.appStyles))
            .pipe(f)
            .pipe(plugin.browserSync.stream());
    }

};
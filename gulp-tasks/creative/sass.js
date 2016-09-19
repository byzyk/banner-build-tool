module.exports = function (gulp, plugin, PATH) {
    
    return function () {
        var f = plugin.filter(['**/*.css']);
        return gulp.src(PATH.banners + '/*/banner.scss', {base: './'})
            .pipe(plugin.sass())
            .pipe(gulp.dest('.'))
            .pipe(f)
            .pipe(plugin.browserSync.stream());
    }

};
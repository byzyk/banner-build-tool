module.exports = function (gulp, plugin, PATH) {
    
    return function () {
        var f = plugin.filter(['**/*.css']);
        return gulp.src(PATH.banners + '/EN_300x250/banner.scss')
            .pipe(plugin.sass())
            .pipe(gulp.dest(PATH.banners + '/EN_300x250'))
            .pipe(f)
            .pipe(plugin.browserSync.stream());
    }

};
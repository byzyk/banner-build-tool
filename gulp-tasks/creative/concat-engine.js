module.exports = function (gulp, plugin, PATH) {

    return function () {

        var banners = plugin.getBanners();
        var engine = banners.map(function(banner) {
            return gulp.src([
                PATH.engineSrc + '/**/core.js',
                PATH.engineSrc + '/**/*.js',
                PATH.banners + '/' + banner + '/scripts/*.js'
            ])
                .pipe(plugin.newer(PATH.banners + '/' + banner + '/engine.js'))
                .pipe(plugin.concat('engine.js'))
                .pipe(gulp.dest(PATH.banners + '/' + banner + '/'));
        });

        return plugin.merge(engine);

    }

};
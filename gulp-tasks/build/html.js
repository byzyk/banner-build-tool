module.exports = function (gulp, plugin, PATH) {

    return function () {

        let banners = plugin.getBanners();
        let html = banners.map(function (banner) {
            return gulp.src([
                    plugin.path.join(PATH.banners, banner, '/index.html')
                ])
                .pipe(gulp.dest(plugin.path.join(PATH.build, 'banners', banner)))
                .pipe(plugin.processhtml())
                .pipe(gulp.dest(plugin.path.join(PATH.build, 'banners', banner)));
        });

        return plugin.merge(html);

    };

};
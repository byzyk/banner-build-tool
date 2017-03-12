module.exports = function (gulp, plugin, PATH) {

    return function () {

        let banners = plugin.getBanners();
        let zip = banners.map(function (banner) {
            return gulp.src([
                    plugin.path.join(PATH.build, 'banners', banner, '*')
                ])
                .pipe(plugin.zip(banner + '.zip'))
                .pipe(gulp.dest(plugin.path.join(PATH.build, 'zip')));
        });

        return plugin.merge(zip);

    };

};
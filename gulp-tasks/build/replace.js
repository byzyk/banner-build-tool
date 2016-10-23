module.exports = function (gulp, plugin, PATH) {

    return function () {

        var banners = plugin.getBanners();

        var replace = banners.map(function (banner) {
            return gulp.src([
                plugin.path.join(PATH.build, 'banners', banner, 'index.html')
            ])
                .pipe(plugin.replace('../images/', ''))
                .pipe(gulp.dest(plugin.path.join(PATH.build, 'banners', banner)));
        });

        return plugin.merge(replace);

    };

};
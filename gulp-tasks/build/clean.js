module.exports = function (gulp, plugin, PATH) {

    return function () {

        var banners = plugin.getBanners();

        var clean = banners.map(function (banner) {
            return gulp.src([
                plugin.path.join(PATH.build, 'banners', banner, 'banner.css'),
                plugin.path.join(PATH.build, 'banners', banner, 'init.js')
            ], {read: false})
                .pipe(plugin.clean());
        });

        return plugin.merge(clean);

    };

};
module.exports = function (gulp, plugin, PATH) {

    return function () {

        let banners = plugin.getBanners();

        let images = banners.map(function (banner) {
            return gulp.src([
                plugin.path.join(PATH.banners, banner, 'images/*')
            ])
                .pipe(plugin.imagemin({verbose: true}))
                .pipe(gulp.dest(plugin.path.join(PATH.build, 'banners', banner)));
        });

        return plugin.merge(images);

    };

};
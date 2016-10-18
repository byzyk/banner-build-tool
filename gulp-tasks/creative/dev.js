module.exports = function (gulp, plugin, PATH) {
    
    return function () {
        gulp.watch([
            plugin.path.join(PATH.styles + '/main.scss'),
            plugin.path.join(PATH.banners + '/*/styles/banner.scss')
        ], ['creative-sass']);

        gulp.watch([
            plugin.path.join(PATH.scripts + '/**/*.js'),
            plugin.path.join(PATH.banners + '/*/scripts/*.js')
        ], ['creative-es6']);

        gulp.watch([
                plugin.path.join(PATH.banners, '/**/*'),
                plugin.path.join(PATH.build, '/scripts/init.js'),
                plugin.path.join('!' + PATH.banners, '/**/*.{css,scss}')
            ])
            .on('change', plugin.browserSync.reload);
    }

};
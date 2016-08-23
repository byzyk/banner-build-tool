module.exports = function (gulp, plugin, PATH) {
    
    return function () {
        gulp.watch([PATH.styles + '/main.scss', PATH.banners + '/EN_300x250/banner.scss'], ['creative-sass']);
        gulp.watch([PATH.banners + '/**/*', '!*.css']).on('change', plugin.browserSync.reload);
    }

};
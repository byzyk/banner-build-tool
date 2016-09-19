module.exports = function (gulp, plugin, PATH) {
    
    return function () {
        gulp.watch([PATH.styles + '/main.scss', PATH.banners + '/*/banner.scss'], ['creative-sass']);
        
        gulp.watch([PATH.banners + '/**/*', '!'+PATH.banners +  '/**/*.{css,scss}'])
            .on('change', plugin.browserSync.reload);
        
        // gulp.watch([PATH.styles + '/main.scss', PATH.banners + '/*/banner.scss'], ['creative-engine']);
    }

};
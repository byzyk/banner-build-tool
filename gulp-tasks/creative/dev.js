module.exports = function (gulp, plugin, PATH) {
    
    return function () {
        gulp.watch([PATH.styles + '/main.scss', PATH.banners + '/*/banner.scss'], ['creative-sass']);
        
        gulp.watch([PATH.engineSrc + '/**/*.js'], ['creative-engine']);

        gulp.watch([
            PATH.banners + '/**/*',
            PATH.scripts + '/build/engine.js',
            '!'+PATH.banners +  '/**/*.{css,scss}'
        ])
            .on('change', plugin.browserSync.reload);
    }

};
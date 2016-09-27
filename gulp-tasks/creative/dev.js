module.exports = function (gulp, plugin, PATH) {
    
    return function () {
        gulp.watch([
            PATH.styles + '/main.scss',
            PATH.banners + '/*/styles/banner.scss',
            PATH.scripts + '/init.js'
        ], ['creative-sass']);
        
        // gulp.watch([
        //     PATH.engineSrc + '/**/*.js',
        //     PATH.banners + '/*/scripts/*.js'
        // ], ['creative-concat-engine']);

        gulp.watch([
            PATH.scripts + '/init.js',
            PATH.engineSrc + '/**/*.js',
            PATH.banners + '/*/scripts/*.js'
        ], ['creative-es6']);

        gulp.watch([
                PATH.banners + '/**/*',
                PATH.scripts + '/init.build.js',
                '!'+PATH.banners +  '/**/*.{css,scss}'
            ])
            .on('change', plugin.browserSync.reload);
    }

};
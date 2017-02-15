module.exports = function (gulp, plugin, PATH) {
    
    return function () {
        gulp.watch(PATH.appSass + '/main.scss', ['app-sass']);
        gulp.watch(PATH.appJs + '/**/*.{js,jsx}', ['app-es6']);
        gulp.watch([PATH.appStatic + '/**/*', '!'+PATH.appStatic+'/styles/**/*']).on('change', plugin.browserSync.reload);
    }

};
module.exports = function (gulp, plugin, PATH) {
    
    return function () {

         let banners = plugin.getBanners();
         let concat = banners.map(function(banner) {
             return gulp.src([
                     plugin.path.join(PATH.banners, banner, '/scripts/*.js'),
                     plugin.path.join(PATH.build, '/scripts/init.js')
                 ])
                 .pipe(plugin.concat('init.js'))
                 .pipe(plugin.uglify())
                 .pipe(gulp.dest(plugin.path.join(PATH.build, 'banners', banner)));
         });
        
         return plugin.merge(concat);

    };

};
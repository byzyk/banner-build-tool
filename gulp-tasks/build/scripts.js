module.exports = function (gulp, plugin, PATH) {
    
    return function () {

         var banners = plugin.getBanners();
         var concat = banners.map(function(banner) {
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
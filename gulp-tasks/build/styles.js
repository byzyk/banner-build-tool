module.exports = function (gulp, plugin, PATH) {
    
    return function () {

         var banners = plugin.getBanners();
         var styles = banners.map(function(banner) {
             return gulp.src([
                     plugin.path.join(PATH.banners, banner, '/styles/banner.css')
                ])
                 .pipe(plugin.cssmin())
                 .pipe(gulp.dest(plugin.path.join(PATH.build, 'banners', banner)));
         });
        
         return plugin.merge(styles);

    };

};
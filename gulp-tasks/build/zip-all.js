module.exports = function (gulp, plugin, PATH) {

    return function () {

        return gulp.src([
                plugin.path.join(PATH.build, 'zip', '*')
            ])
            .pipe(plugin.zip(plugin.option.campaign + '.zip'))
            .pipe(gulp.dest(plugin.path.join(PATH.build, 'campaign')))out;

    };

};
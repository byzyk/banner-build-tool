module.exports = function (gulp, plugin, PATH) {

    return function () {

        let banners = plugin.getBanners();

        let pageres = new plugin.pageres({
                delay: 2,
                format: 'jpg',
                script: plugin.path.join(PATH.gulpTasks, 'build', 'backup-seek.js'),
                selector: '#Banner'
            });

        banners.map(function (banner) {
            let size = banner.split('_')[1];
            pageres.src('http://localhost:1337/build/banners/' + banner, [size], {
                filename: banner + '/backup',
            });
        });

        pageres
            .dest(plugin.path.join(PATH.build, 'banners'))
            .on('warning', (err) => console.log('error', err))
            .run()
            .then( () => console.log('backup done') );

        return pageres;

    };

};
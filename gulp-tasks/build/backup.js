module.exports = function (gulp, plugin, PATH) {

    return function () {

        var banners = plugin.getBanners();

        var pageres = new plugin.pageres({
                delay: 5,
                filename: 'BACKUP',
                format: 'jpg',
                script: plugin.path.join(PATH.gulpTasks, 'build', 'backup-seek.js'),
                selector: '#Banner'
            })
                .src('http://localhost:1337/build/banners/' + 'EN_300x250', ['300x250'])
                .dest(plugin.path.join(PATH.build, 'banners', 'EN_300x250'))
                .on('warning', (err) => console.log('error', err))
                .run()
                .then( () => console.log('backup done') );
        return pageres;

        // var backup = banners.map(function (banner) {
        //     var size = banner.split('_')[1];
        //     var pageres = new plugin.pageres({
        //             delay: 1,
        //             filename: 'BACKUP',
        //             format: 'jpg'
        //         })
        //         .src('http://localhost:1337/build/banners/' + banner, [size], {})
        //         .dest(plugin.path.join(PATH.build, 'banners', banner))
        //         .run()
        //         .then( () => console.log('backup done', banner) );
        //     return pageres;
        // });
        //
        // return plugin.merge(backup);

    };

};
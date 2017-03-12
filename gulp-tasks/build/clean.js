module.exports = function (gulp, plugin, PATH) {

    return function () {

        return plugin.del([
            plugin.path.join(PATH.build, 'banners/*/banner.css'),
            plugin.path.join(PATH.build, 'banners/*/init.js')
        ]);

    };

};
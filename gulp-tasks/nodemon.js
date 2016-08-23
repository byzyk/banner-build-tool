module.exports = function (gulp, plugin, PATH) {
    
    return function (cb) {
        var started = false;
        return plugin.nodemon({
            script: PATH.appServer + '/index.js',
            ignore: [
                PATH.appStatic
            ]
        }).on('start', function () {
            if (!started) {
                cb();
                started = true;
            }
        });
    }

};
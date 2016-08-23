module.exports = function (gulp, plugin, PATH) {
    
    return function() {
        plugin.browserSync.init(null, {
            proxy: "localhost:1337",
            browser: "google chrome",
            port: 1338,
            open: false,
            notify: false
        });
    }

};
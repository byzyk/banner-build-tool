var fs = require('fs');

module.exports = function (app, creativeRoot) {

    app.get('/api/get_creative_list', function (req, res) {
        fs.readdir(creativeRoot + '/source/banners/' , function (err, files) {
            if (err) {
                console.log(err);
                res.end();
                return;
            }
            _removeDot(files);
            res.send(files);
            res.end();
        });
    });

    function _removeDot(a) {
        a.forEach(function (el, i, arr) {
            if (el === '.DS_Store') arr.remove(i);
        });
    }

    Array.prototype.remove = function(from, to) {
        var rest = this.slice((to || from) + 1 || this.length);
        this.length = from < 0 ? this.length + from : from;
        return this.push.apply(this, rest);
    };

};
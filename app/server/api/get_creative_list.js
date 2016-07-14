var fs = require('fs');

module.exports = function (app, creativeRoot) {

    app.get('/api/get_creative_list', function (req, res) {
        fs.readdir(creativeRoot + '/source/banners/' , function (err, files) {
            if (err) {
                console.log(err);
                res.end();
                return;
            }
            res.send(files);
            res.end();
        });
    });

};
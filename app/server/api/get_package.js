var fs = require('fs');

module.exports = function (app, path) {

    app.get('/api/get_package', function (req, res) {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err);
                res.end();
                return;
            }
            res.send(JSON.parse(data));
            res.end();
        });
    });

};
var fs = require('fs');

module.exports = function (app, path) {

    app.post('/api/update_package', function(req, res) {
        var body = '';
        req.on('data', function(data) {
            body += data;
        });

        req.on('end', function (){
            fs.writeFile(path, body, function() {
                res.end();
            });
        });
    });

};
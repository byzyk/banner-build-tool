var shell = require('shelljs');

module.exports = function (app, path) {

    app.get('/grunt/:task/', function (req, res) {

        var cmdCd = 'cd ' + path,
            cmdGrunt = 'grunt ' + req.params.task;

        var ex = shell.exec('osascript -e \'tell application "Terminal" to do script "' + cmdCd + ' && ' + cmdGrunt + '"\''),
            result;

        if (ex.code === 0) {
            result = '<span class="label label-success">Success</span>';
        } else {
            result = '<span class="label label-important">Error</span>';
        }

        res.send(result);
        res.end();

    });

};
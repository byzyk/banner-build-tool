var express = require('express');
var path = require('path');

var app = module.exports = express();

var projectRoot = __dirname;
var pathRoot = path.join(projectRoot, '../..');
var staticRoot = path.join(projectRoot, '../public');
var creativeRoot = path.join(pathRoot, '/creative');
var viewRoot = path.join(projectRoot, '../views');

var configPath = path.join(projectRoot, '../data/config.json');


// - - - - - API
require(projectRoot + '/api/get_creative_list')(app, creativeRoot);

require(projectRoot + '/api/get_config')(app, configPath);
// require(projectRoot + '/api/update_package')(app, packagePath);

require(projectRoot + '/api/grunt')(app, pathRoot);
// - - - - - - - -


app.use(express.static(staticRoot));

app.use('/app/bootstrap', express.static(pathRoot + '/node_modules/bootstrap/dist/css/bootstrap.min.css'));
app.use('/app/jquery', express.static(pathRoot + '/node_modules/jquery/dist/jquery.min.js'));

app.use('/banner', express.static(pathRoot + '/creative/source/banners/'));
app.use('/source', express.static(pathRoot + '/creative/source/'));
app.use('/scripts', express.static(pathRoot + '/creative/source/scripts/'));

app.listen(1337, function () {
    console.log('listening on port 1337');
});
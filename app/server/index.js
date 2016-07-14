var express = require('express');
var path = require('path');

var app = module.exports = express();

var projectRoot = __dirname;
var pathRoot = path.join(projectRoot, '../..');
var staticRoot = path.join(projectRoot, '../public');
var creativeRoot = path.join(projectRoot, '../creative');
var viewRoot = path.join(projectRoot, '../views');

var packagePath = path.join(projectRoot, '../../package.json');
var package = require(packagePath);

app.set('views', viewRoot);
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


// - - - - - Routes / API
require(projectRoot + '/routes/index')(app);

require(projectRoot + '/api/get_creative_list')(app, creativeRoot);

require(projectRoot + '/api/get_package')(app, packagePath);
require(projectRoot + '/api/update_package')(app, packagePath);

require(projectRoot + '/api/grunt')(app, pathRoot);
// - - - - - - - -


app.use(express.static(staticRoot));
app.use('/a/styles', express.static(pathRoot + '/node_modules/bootstrap/dist/css/'));

app.use('/banner', express.static(pathRoot + '/creative/source/banners/'));
app.use('/source', express.static(pathRoot + '/creative/source/'));

app.listen(1337, function () {
    console.log(package.name + ' listening on port 1337');
});
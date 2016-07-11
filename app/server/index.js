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


// - - - - - Routes
require(projectRoot + '/routes/index')(app);

require(projectRoot + '/routes/get_creative_list')(app, creativeRoot);

require(projectRoot + '/routes/get_package')(app, packagePath);
require(projectRoot + '/routes/update_package')(app, packagePath);

require(projectRoot + '/routes/grunt')(app, pathRoot);
// - - - - - - - -


app.use(express.static(staticRoot));
app.use('/styles', express.static(pathRoot + '/node_modules/bootstrap/dist/css/'));

app.listen(1337, function () {
    console.log(package.name + ' listening on port 1337');
});
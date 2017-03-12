let express = require('express');
let path = require('path');

let app = module.exports = express();

let projectRoot = __dirname;
let pathRoot = path.join(projectRoot, '../..');
let staticRoot = path.join(projectRoot, '../public');
let creativeRoot = path.join(pathRoot, '/creative');
let viewRoot = path.join(projectRoot, '../views');

let configPath = path.join(projectRoot, '../data/config.json');


// - - - - - API
require(projectRoot + '/api/get_creative_list')(app, creativeRoot);

require(projectRoot + '/api/get_config')(app, configPath);

// require(projectRoot + '/api/update_package')(app, packagePath);

// require(projectRoot + '/api/grunt')(app, pathRoot);
// - - - - - - - -


app.use(express.static(staticRoot));

app.use('/app/bootstrap', express.static(path.join(pathRoot, '/node_modules/bootstrap/dist/css/bootstrap.min.css')));
app.use('/app/jquery', express.static(path.join(pathRoot, '/node_modules/jquery/dist/jquery.min.js')));

app.use('/banner', express.static(path.join(pathRoot, '/creative/source/banners/')));
app.use('/source', express.static(path.join(pathRoot, '/creative/source/')));
app.use('/build', express.static(path.join(pathRoot, '/creative/build/')));
app.use('/scripts', express.static(path.join(pathRoot, '/creative/source/scripts/')));

app.listen(1337, function () {
    console.log('listening on port 1337');
});
module.exports = function (app) {

    app.get('/', function(req, res){
        
        var data = {
            title: 'Banner Build Tool'
        };
        
        res.render('index', data);
    })

};
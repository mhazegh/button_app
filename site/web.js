var express = require('express'),
    app = express.createServer(express.logger())

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use('/', express.static(__dirname + '/'));
});

app.get('/', function(req, res) {
    res.render('index');
});

var port = 6666;
app.listen(port, function() {
    console.log("Listening on " + port);
});

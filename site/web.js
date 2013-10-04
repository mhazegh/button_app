var express = require('express'),
    fs = require('fs'),
    app = express.createServer(express.logger());

app.configure(function(){
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    app.use('/', express.static(__dirname + '/'));
});

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/show', function(req, res) {
    fs.readdir('videos', function(err, files){
        var chosen = Math.floor(Math.random()*files.length);
        while(files[chosen] === '.gitignore') {
            chosen = Math.floor(Math.random()*files.length);
        }
        var video = 'videos/' + files[chosen];
        res.render('show', {video: video});
    });
});

var port = 6666;
app.listen(port, function() {
    console.log("Listening on " + port);
});

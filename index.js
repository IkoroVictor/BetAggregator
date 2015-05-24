/**
 * Created by olaokenyi on 5/20/15.
 */


var express = require('express');
var app = express();
var naijaodds = require('./start_service');

naijaodds.startNaijaOddsWorker();

app.get('/', function(req, res){
    res.end('hello world');
});




var port = process.env.PORT || 3000;
app.listen(port);

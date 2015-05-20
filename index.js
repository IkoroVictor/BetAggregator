/**
 * Created by olaokenyi on 5/20/15.
 */


var express = require('express');
var app = express();


app.get('/', function(req, res){
    res.end('hello world');
});





app.listen(80);
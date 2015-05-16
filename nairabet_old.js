/**
 * Created by olaokenyi on 5/3/15.
 */


var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var Db = require('mongodb').Db,
    //Connection = require('mongodb').Connection,
    Server = require('mongodb').Server;

var host = '127.0.0.1';
var port = 27017;






var data = {
    today: {
        categories:
        {

        },
        games: {}
    }
}


var options = {
    uri: 'https://nairabet.com/bets/date/16.05.15',
    proxy: 'http://127.0.0.1:8080',
    headers: {

        'User-Agent': 'request'

    }
};


$ = cheerio.load(fs.readFileSync('./html_files/nairabet2.html'));

var nb = require('./parsers/nairabet').getNairabetParser();

nb.getGames($, data.today);

console.log(data.today);







/*

function callback(error, response, body) {

    if (!error && response.body.statusCode == 200) {



        $ = cheerio.load(body);

        var nb = require('./parsers/nairabet').getNairabetParser();
        nb.getGames($, data.today);




        console.log(data);
    }
}

request(options, callback);




*/

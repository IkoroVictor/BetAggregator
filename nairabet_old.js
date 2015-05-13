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


var db = new Db('PhotoAlbums',
    new Server(host, port,
        { auto_reconnect: true,
            poolSize: 20}),
    { w: 1 });


db.open(function(err, db)
{
    if(!err)
    {
        console.log('connected');


    }
    else
    {
        console.log('not connected')
    }
})

db.collection('games', function(err, collref)
{

})

//console.log(db);




var data = {
    today: {
        categories:
        {

        },
        games: {}
    }
}


var options = {
    uri: 'https://merrybet.com/bets/date/05.05.15',
    proxy: 'http://127.0.0.1:8080',
    headers: {

        'User-Agent': 'request'

    }
};


$ = cheerio.load(fs.readFileSync('./html_files/nairabet2.html'));

var nb = require('./parsers/nairabet').getNairabetParser();

//nb.getGames($, data.today);

console.log(data);







/*
function callback(error, response, body) {

    if (!error && response.body.statusCode == 200) {



        $ = cheerio.load(body);



        var currentcat = ''
        $('#betsTable').children().each( function(index, elem)
        {

            if($('#categoryTitlePanel', this).length)
            {
                var child = $('#categoryTitlePanel', this).eq(0);
                var category = { title:'', games:{}}

                $('.header_links2', child).each(function(indx2, elem2)
                {
                    category.title += ($(this, child).text() + " | ")
                });


                data.today.categories[category.title] = category;
                currentkey = data.today.categories[category.title];
            }else
            {

            }




        });

        console.log(data);
    }
}

request(options, callback);
*/




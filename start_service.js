
/**
 * Created by olaokenyi on 5/12/15.
 */


var request = require('request');
var constants = require('./constants').loadConstants();
var nb = require('./parsers/nairabet').getNairabetParser();
var helper = require('./helpers/misc').getNairabetParser();
var cheerio = require('cheerio');
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;


var options = {
    uri: constants.nairabet_home,
    proxy: 'http://127.0.0.1:8080',
    headers: {

        'User-Agent': 'request'

    }
};


var db = new Db(constants.MONGO_DB_NAME,
    new Server(constants.MONGO_DB_HOST, constants.MONGO_DB_PORT,
        { auto_reconnect: true,
            poolSize: 20}),
    { w: 1 });





var load_all = function(error, response, body)
{
    if (!error )
    {
        var days = {}
        $ = cheerio.load(body);
        nb.getMatchDays($, days)

        days.forEach(function(key,val)
        {
            if(key.length > 3) //filter for '4H', '1H', '12H' etc
            {
                helper.exec_db(db, function()
                {
                    db.createCollection("day_bets", function (err, bet_days) {
                        if(!err)
                        {
                            var cursor = bet_days.find({date: val.date});
                            if(!cursor.toArray().length) //TODO Don't use 'toArray().length' find a better method to get item count
                            {
                                bet_days.insert([val], function(err,res){
                                    if(err)
                                    {
                                        console.log(err);
                                    }
                                    else
                                    {
                                        request({
                                            uri: constants.nairabet_home + ,
                                            proxy: 'http://127.0.0.1:8080',
                                            headers: {

                                                'User-Agent': 'request'
                                        })
                                    }
                                });
                            }
                        }
                        else
                        {
                            console.log(err);
                        }

                    });
                })
            }
        });

    }
    else
    {
        console.log(response.body.statusCode);
        console.log(error);
    }
}


request(options, load_all);



/**
 * Created by olaokenyi on 5/12/15.
 */


var request = require('request');
var constants = require('./constants').loadConstants();
var nb = require('./parsers/nairabet').getNairabetParser();
var nb_obj = require('./betobjects/nairabet').getNairabetObject();
var helper = require('./helpers/misc');
var cheerio = require('cheerio');
var emitter = require('events').EventEmitter;
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;


//emitter.setMaxListeners(0);


var options = helper.getDefaultRequestOption();

options.uri = constants.nairabet_home;

var db = new Db(constants.MONGO_DB_NAME,
    new Server(constants.MONGO_DB_HOST, constants.MONGO_DB_PORT,
        { auto_reconnect: true,
            poolSize: 20}),
    { w: 1 });


var load_all = function (error, response, body) {


    if (!error) {
        var days = {}
        $ = cheerio.load(body);
        nb.getMatchDays($, days)

        Object.keys(days).forEach(function (key) {
            var val = days[key];

            if (key == '16.05.15'  /* key.length > 3 */) //filter for '4H', '1H', '12H' etc
            {
                helper.exec_db(db, function () {
                    db.createCollection("day_bets", function (err, bet_days) {
                        if (!err) {
                            var cursor = bet_days.find({short_date: val.short_date});
                            cursor.toArray(function (err, documents) //TODO Don't use 'toArray().length' find a better method to get item count
                            {

                                if (documents.length > 0) {
                                    return;
                                }


                                bet_days.insert([val], function (err, res) {
                                    if (err) {
                                        console.log(val);
                                        console.log(err);
                                    }
                                    else {
                                        var op = helper.getDefaultRequestOption();
                                        op.uri = constants.nairabet_home + nb_obj.day_bet_url_suffix + val.short_date;
                                        console.log('Begin loading games for' + op.uri);
                                        request(op, function (e, r, b) {
                                            this.setMaxListeners(0);
                                            if (!e) {


                                                var root_obj = cheerio.load(b);
                                                nb.getGames(root_obj, val);
                                                console.log(' Games loaded for' + op.uri);
                                                bet_days.update(

                                                    {short_date: val.short_date },
                                                    { $set:{games: val.games, categories: val.categories}},

                                                    function (er2, count, status) {

                                                        //console.log(er2);
                                                        //console.log(status);
                                                        //console.log(count);

                                                        if (!er2) {
                                                            Object.keys(val.games).forEach(function (key) {

                                                                var value = val.games[key];
                                                                if (value.url == '') //NO Game Options
                                                                    return;
                                                                var op = helper.getDefaultRequestOption();

                                                                op.uri = value.url;
                                                                console.log('Loading game odds for game : ' + op.uri);
                                                                request(op, function (e3, r3, b3) {
                                                                    console.log(e3);
                                                                    console.log(b3);
                                                                    //this.setMaxListeners(0);
                                                                    var root_obj = cheerio.load(b3);
                                                                    nb.getGameOdds(root_obj, value, db);
                                                                    console.log('Game odds for game : ' + op.uri + ' loaded');
                                                                })
                                                            })
                                                        } else {
                                                            console.log('Error updating game ' + val.short_date)
                                                        }
                                                    })
                                            }
                                        });

                                    }
                                });
                            });
                        }
                        else {
                            console.log(bet_days);
                        }

                    });
                })
            }
        });

    }
    else {
        console.log(response);
        console.log(error);
    }
}

db.open(function (err, db) {
    if (!err) {
        GLOBAL.db_conn_status = 1;
        request(options, load_all).setMaxListeners(0);
    } else {
        GLOBAL.db_conn_status = 0;
        console.log('llllll');
    }
})




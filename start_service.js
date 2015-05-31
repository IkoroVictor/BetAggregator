/**
 * Created by olaokenyi on 5/12/15.
 */


var request = require('request');
var async = require('async');
var constants = require('./constants').loadConstants();
var services = require('./services')
var nb = require('./parsers/nairabet').getNairabetParser();
var nb_obj = require('./betobjects/nairabet').getNairabetObject();
var helper = require('./helpers/misc');
var cheerio = require('cheerio');
var scheduler = require('node-schedule');
var MongoClient = require('mongodb').MongoClient;
var g = require('idle-gc');
var memwatch = require('memwatch');
var db = null;


memwatch.on('leak', function(info)
{
    console.log('[MEM LEAK] : ' + info);
})

memwatch.on('stats', function(stats) {
    console.log('[MEM STATS] : ' + stats);
});

g.start(2500);  // Run garbage collection at 2.5 second intervals. Stops the old timer first.





var game_queues = async.queue(function (task, callback) {
    task.payload();
    callback();
}, constants.QUEUE_CONCURRENCY)


var options = helper.getDefaultRequestOption();

options.uri = constants.nairabet_home;



var load_all = function (error, response, body) {


    if (!error) {
        var days = {}
        $ = cheerio.load(body);
        nb.getMatchDays($, days)
        //nb.getMockMatchDays($, days)
        body = null;
        $ = null

        Object.keys(days).forEach(function (key) {
            var val = days[key];

            if (/*key == '20.05.15'*/ key.length > 3) //filter for '4H', '1H', '12H' etc
            {
                helper.exec_db(db, function () {
                    db.createCollection("days", function (err, bet_days) {
                        if (!err) {
                            var cursor = bet_days.find({short_date: val.short_date});
                            cursor.toArray(function (err, documents) //TODO Don't use 'toArray().length' find a better method to get item count
                            {

                                if (documents.length > 0) {
                                    db.createCollection('games',

                                        /*{short_date: val.short_date },
                                         { $set: {games: val.games, categories: val.categories}},*/

                                        function (er2, games) {
                                            if (!er2) {

                                                var val = documents[0];
                                                services.startBetParsingService(constants.nairabet_home, nb_obj, nb, game_queues, val, games);

                                                //var mb = require('./parsers/merrybet').getMerrybetParser();
                                                //var mb_obj = require('./betobjects/merrybet').getMerrybetObject();
                                                //services.startBetParsingService(constants.merrybet_home, mb_obj, mb, game_queues, val, games);
                                            }
                                        });

                                }
                                else
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
                                                    try {
                                                        nb.getGames(root_obj, val);
                                                    }
                                                    catch (ex) {
                                                        console.log(err);
                                                        return;
                                                    }
                                                    b = null;
                                                    $ = null;
                                                    global.gc()

                                                    if (val.games.length < 1) {
                                                        console.log(' No games loaded for' + op.uri);
                                                        return;
                                                    }
                                                    console.log(' Games loaded for' + op.uri);
                                                    db.createCollection('games',

                                                        /*{short_date: val.short_date },
                                                         { $set: {games: val.games, categories: val.categories}},*/

                                                        function (er2, games) {
                                                            if (!er2) {

                                                                games.insert(val.games, function (err, res) {
                                                                    if (err) {
                                                                        console.log(err);
                                                                    }
                                                                    else {
                                                                        Object.keys(val.games).forEach(function (key) {

                                                                            var value = val.games[key];
                                                                            if (value.url == '') //NO Game Options
                                                                                return;
                                                                            var op = helper.getDefaultRequestOption();

                                                                            op.uri = constants.nairabet_home + value.url;
                                                                            console.log('Loading game odds for game : ' + op.uri);

                                                                            var rule = new scheduler.RecurrenceRule();
                                                                            rule.minute = new scheduler.Range(0, 59, constants.RECURRENT_JOB_INTERVAL);

                                                                            var nb_job = scheduler.scheduleJob(rule, function () {


                                                                                if (value.date < '')
																				{
																				
																				//Validate if job should still run
                                                                                    nb_job.cancel();
																					nb_job = null;
																				}
																					

                                                                                game_queues.push({name: ('nb_' + key), payload: function () {

                                                                                    request(op, function (e3, r3, b3) {
                                                                                        if (!e3 || (typeof b3 != 'undefined')) {
                                                                                            this.setMaxListeners(0);
                                                                                            var root_obj = cheerio.load(b3);
                                                                                            try {
                                                                                                nb.getGameOdds(root_obj, value, games);
                                                                                            }
                                                                                            catch (ex) {
                                                                                                console.log(ex)
                                                                                            }

                                                                                            b3 = null;
                                                                                            root_obj = null;
                                                                                            console.log(memwatch.gc());
                                                                                            console.log('Game odds for game : ' + op.uri + ' loaded');
                                                                                        }
                                                                                    })
                                                                                }}, function (err) {
                                                                                    console.log('Queue Error [NB_' + key + '] : ' + err)
                                                                                })


                                                                            });

                                                                        })
                                                                    }
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
        console.log("Could not connect:" +  error);
    }
}

MongoClient.connect(constants.MONGO_DB_URL, function(err, temp_db) {
    if(!err)
    {
        console.log("Connected correctly to server");
        GLOBAL.db_conn_status = 1;
        db = temp_db;

        request(options, load_all).setMaxListeners(0);

    }
    else {
        GLOBAL.db_conn_status = 0;
        console.log('DB ERROR: ' +  err);
    }



});






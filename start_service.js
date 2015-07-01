/**
 * Created by olaokenyi on 5/12/15.
 */

//require('newrelic');
var request = require('request');
var async = require('async');
var constants = require('./constants').loadConstants();

var nb = require('./parsers/nairabet').getNairabetParser();
var nb_obj = require('./betobjects/nairabet').getNairabetObject();
var helper = require('./helpers/misc');
var cheerio = require('cheerio');
var scheduler = require('node-schedule');
var MongoClient = require('mongodb').MongoClient;
var services = require('./services')

//var memwatch = require('memwatch');
var db = null;


/*
 memwatch.on('leak', function(info)
 {
 console.log('[MEM LEAK] : ' + info);
 })

 memwatch.on('stats', function(stats) {
 console.log('[MEM STATS] : ' + stats);
 });
 */


var game_queues = async.queue(function (task, callback) {
    task.payload();
    callback();
}, constants.QUEUE_CONCURRENCY);

game_queues.drain = function () {
    console.log('all queue have been processed');
    global.gc();
}


var options = helper.getDefaultRequestOption();

options.uri = constants.nairabet_home;


var cleardb = function (callback) {
    db.createCollection("days", function (err, bet_days) {
        //bet_days.remove({});
        //bet_days.ensureIndex({timestamp: 1}, {unique: true})
        //bet_days.ensureIndex({'expireAt': 1}, {expireAfterSeconds: 0})
        console.log('Days Indexed');

        db.createCollection("games", function (err, games) {
            //games.remove({});

            console.log('Games Indexed');
        })
        console.log(new Date(Date.now()).toString());
        callback()
    })

}
var load_all = function (error, response, body) {


    if (!error) {
        var days = {}
        $ = cheerio.load(body);
        nb.getMatchDays($, days)
        //nb.getMockMatchDays($, days)
        body = null;
        $ = null
        global.gc();
        Object.keys(days).forEach(function (key) {
            var val = days[key];

            if (/*key == '20.05.15'*/ key.length > 3) //filter for '4H', '1H', '12H' etc
            {
                helper.exec_db(db, function () {
                    db.createCollection("days", function (err, bet_days) {
                        if (!err) {
                            bet_days.ensureIndex({timestamp: 1}, {unique: true, dropDups: true }, function(error)
                            {
                                if(!error)
                                {
                                    bet_days.ensureIndex({'expireAt': 1}, {expireAfterSeconds: 0}, function(error2)
                                    {
                                        if(!error2)
                                        {
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
                                                                console.log(ex);
                                                                return;
                                                            }
                                                            b = null;
                                                            $ = null;
                                                            global.gc();


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
                                                                        games.ensureIndex({id: 1, timestamp: 1}, {unique: true, dropDups: true }, function (error) {
                                                                            if (!error) {
                                                                                games.ensureIndex({'expireAt': 1}, {expireAfterSeconds: 0}, function(error)
                                                                                {
                                                                                    if(!error)
                                                                                    {
                                                                                        games.insert(val.games, function (err, res) {
                                                                                            if (err) {
                                                                                                console.log(err);
                                                                                            }
                                                                                            bet_days.update({short_date: val.short_date}, {$set: {categories: val.categories}});

                                                                                        })
                                                                                    }
                                                                                })
                                                                            }
                                                                            else {
                                                                                console.log(error);
                                                                            }
                                                                        });




                                                                    } else {
                                                                        console.log('Error updating game ' + val.short_date)
                                                                    }
                                                                })
                                                        }
                                                    });

                                                }
                                            });
                                        }
                                    });
                                }
                            })



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
        console.log('[RESPONSE]: ' + response);
        console.log("Could not connect:" + error);
    }
}

MongoClient.connect(constants.MONGO_DB_URL, function (err, temp_db) {
    if (!err) {
        console.log("Connected correctly to server");
        GLOBAL.db_conn_status = 1;
        db = temp_db;

        cleardb(function () {
            request(options, load_all).setMaxListeners(0);
        });


    }
    else {
        GLOBAL.db_conn_status = 0;
        console.log('DB ERROR: ' + err);
    }


});


//Run garbage collector every minute
rule = new scheduler.RecurrenceRule();
rule.minute = new scheduler.Range(0, 59, 59);

gc_job = scheduler.scheduleJob(rule, function () {
    //console.log('running gc..');

    cleardb(function () {
        request(options, load_all).setMaxListeners(0);
    });
    global.gc()
    //console.log('ended running gc..');
});









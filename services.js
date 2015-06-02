/**
 * Created by olaokenyi on 5/22/15.
 */

var request = require('request');
var helper = require('./helpers/misc');
var cheerio = require('cheerio');
var scheduler = require('node-schedule');
var constants = require('./constants').loadConstants();
var async = require('async');



var queue = async.queue(function (task, callback) {
    task.payload();
    callback();
}, constants.QUEUE_CONCURRENCY)




exports.startBetParsingService = function (home_url, nb_object, nb_parser, games_queue, day, game_collection) {
    var op = helper.getDefaultRequestOption();
    op.uri = home_url + nb_object.day_bet_url_suffix + day.short_date;
    console.log('Begin loading games for' + op.uri);


   queue.push({name: (Date.now()),payload: function(){

       request(op, function (e, r, b) {
        this.setMaxListeners(0);
        if (!e) {


            var root_obj = cheerio.load(b);
            try{
                nb_parser.getGames(root_obj, day);
            }
            catch(ex)
            {
                console.log("Could not parse games for  " + op.uri+ ": " + ex);

            }

            root_obj = null;
            b = null;
            global.gc();

            if (day.games.length < 1) {
                console.log(' No games loaded for' + op.uri);
                return;
            }
            console.log(' Games loaded for' + op.uri);

            Object.keys(day.games).forEach(function (key) {

                var value = day.games[key];
                if (value.url == '') //NO Game Options
                    return;
                var op = helper.getDefaultRequestOption();

                op.uri = home_url + value.url;
                console.log('Loading game odds for game : ' + op.uri);

                var rule = new scheduler.RecurrenceRule();
                rule.minute = new scheduler.Range(0, 59, constants.RECURRENT_JOB_INTERVAL);

                var nb_job = scheduler.scheduleJob(rule, function () {


                    if (helper.validate_date(value.timestamp)) //TODO Validate if job should still run
                        nb_job.cancel();

                    games_queue.push({name: ( nb_object.short_name +'_' + key), payload: function () {

                        request(op, function (e3, r3, b3) {
                            if (!e3 || (typeof b3 != 'undefined')) {
                                this.setMaxListeners(0);
                                var root_obj = cheerio.load(b3);
                                try {
                                    nb_parser.getGameOdds(root_obj, value, game_collection);
                                }
                                catch (ex) {
                                    console.log(ex)
                                }
                                root_obj = null;
                                b3 = null;
                                global.gc();

                                console.log('Game odds for game : ' + op.uri + ' loaded');
                            }
                        })
                    }}, function (err) {
                        if(err)
                            console.log('Queue Error [' + nb_object.short_name +'_' + key + '] : ' + err)

                    })


                });

            })
        }
        else {
            console.log('Error updating game ' + day.short_date + ' : ' + e);
        }

    })}},  function (err) {
       if(err)
             console.log('Queue Error ' + day.short_date + '] : ' + err)
});
}



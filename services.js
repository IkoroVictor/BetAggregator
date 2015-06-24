/**
 * Created by olaokenyi on 5/22/15.
 */



var request = require('request').defaults({maxRedirects: 20});
;
var helper = require('./helpers/misc');
var cheerio = require('cheerio');
var scheduler = require('node-schedule');
var constants = require('./constants').loadConstants();
var async = require('async');
var extend = require('util')._extend;

var queue = async.queue(function (task, callback) {
    task.payload();
    callback();
}, constants.QUEUE_CONCURRENCY)

process.setMaxListeners(0);

exports.startBetParsingService = function (home_url, nb_object, nb_parser, games_queue, day, game_collection) {


    var op = helper.getDefaultRequestOption();
    op.uri = home_url + nb_object.day_bet_url_suffix + day.short_date;
    console.log('Begin loading games for' + op.uri);


    queue.push({name: (Date.now()), payload: function () {

        request(op, function (e, r, b) {
            this.setMaxListeners(0);
            if (!e) {


                var root_obj = cheerio.load(b);
                try {
                    nb_parser.getGames(root_obj, day);
                }
                catch (ex) {
                    console.log("Could not parse games for  " + op.uri + ": " + ex);

                }

                root_obj = null;
                b = null;
                global.gc();

                if (day.games.length < 1) {
                    console.log(' No games loaded for' + op.uri);
                    return;
                }

                console.log(' Games loaded for' + op.uri);

                async.each(Object.keys(day.games), function (key) {

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

                        games_queue.push({name: ( nb_object.short_name + '_' + key), payload: function () {

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
                                    //console.log('[[===========]' + JSON.stringify(process.memoryUsage()))
                                    console.log('Game odds for game : ' + op.uri + ' loaded');

                                }
                            })
                        }}, function (err) {
                            if (err)
                                console.log('Queue Length : ' + queue.length())

                        })


                    });

                })
            }
            else {
                console.log('Error updating game ' + day.short_date + ' : ' + e);
            }

        })
    }}, function (err) {
        if (err)
            console.log('Queue Error ' + day.short_date + '] : ' + err)
    });
}
exports.startNoQueueBetParsingService = function (home_url, nb_object, nb_parser, day, game_collection) {


    var op = helper.getDefaultRequestOption();
    op.uri = home_url + nb_object.day_bet_url_suffix + day.short_date;
    console.log('Begin loading games for' + op.uri);


    request(op,function (e, r, b) {
        this.setMaxListeners(0);
        if (!e) {


            var root_obj = cheerio.load(b);
            try {
                //console.log(b);
                nb_parser.getGames(root_obj, day);
            }
            catch (ex) {
                console.log("Could not parse games for  " + op.uri + ": " + ex);

            }

            root_obj = null;
            b = null;
            global.gc();

            if (day.games.length < 1) {
                console.log(' No games loaded for' + op.uri);
                return;
            }

            console.log(' Games loaded for' + op.uri);

            async.each(Object.keys(day.games), function (key, callback) {

                var value = day.games[key];
                if (value.url == '') //NO Game Options
                    return;
                var op = helper.getDefaultRequestOption();

                op.uri = home_url + value.url;
                console.log('Loading game odds for game : ' + op.uri);

                request(op,function (e3, r3, b3) {
                    if ((!e3 || (typeof b3 != 'undefined')) && r3.statusCode == 200) {

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
                        //console.log('[[===========]' + JSON.stringify(process.memoryUsage()))
                        console.log('Game odds for game : ' + op.uri + ' loaded');

                    }
                }).setMaxListeners(0);

            })
        }
        else {
            console.log('Error updating game ' + day.short_date + ' : ' + e);
        }
    }).setMaxListeners(0);


}
exports.startNoQueueBetParsingServiceSeries = function (home_url, nb_object, nb_parser, days, current_index, game_collection, callback) {


    var op = helper.getDefaultRequestOption();
    var day = extend({}, days[current_index]);
    op.uri = home_url + nb_object.day_bet_url_suffix + day.short_date;
    console.log('Begin loading games for' + op.uri);
    var self = exports.startNoQueueBetParsingServiceSeries;

    request(op,function (e, r, b) {
        this.setMaxListeners(0);
        if (!e) {


            var root_obj = cheerio.load(b);
            try {
                //console.log(b);
                nb_parser.getGames(root_obj, day);
            }
            catch (ex) {
                console.log("Could not parse games for  " + op.uri + ": " + ex);

            }

            root_obj = null;
            b = null;
            global.gc();

            if (day.games.length < 1) {
                console.log(' No games loaded for' + op.uri);

            }
            else {


                console.log(' Games loaded for' + op.uri);

                async.each(Object.keys(day.games), function (key, callback) {

                    var value = day.games[key];
                    if (value.url == '') //NO Game Options
                        return;
                    var op = helper.getDefaultRequestOption();

                    op.uri = home_url + value.url;
                    console.log('Loading game odds for game : ' + op.uri);

                    request(op,function (e3, r3, b3) {
                        if ((!e3 || (typeof b3 != 'undefined')) && r3.statusCode == 200) {

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
                            //console.log('[[===========]' + JSON.stringify(process.memoryUsage()))
                            console.log('Game odds for game : ' + op.uri + ' loaded');

                        }
                    }).setMaxListeners(0);

                })
            }
            if(current_index != (days.length - 1))
            {
                console.log("[LENGTH]  : "  + days.length + ' [INDEX]: ' + current_index);
                self(home_url, nb_object,nb_parser, days, (current_index + 1), game_collection);
            }
            else
            {
                setTimeout(callback, constants.RECURRENT_JOB_INTERVAL);
            }
        }
        else {
            console.log('Error updating game ' + day.short_date + ' : ' + e);
            console.log('Retrying.... for ' + day.short_date);

            //TODO: please review this code, might be volatile and blocking.
            self(home_url, nb_object,nb_parser, days, (current_index), game_collection)

        }



    }).setMaxListeners(0);


}



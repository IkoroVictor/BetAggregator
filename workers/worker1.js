/**
 * Created by olaokenyi on 6/11/15.
 */


var request = require('request').defaults({maxRedirects:40});
var async = require('async');
var constants = require('../constants').loadConstants();
var bet1 = require('../parsers/winnersgoldenbet').getWGBParser();
var bet1_obj = require('../betobjects/winnersgoldenbet').getWGBObject();
var bet2 = require('../parsers/stakersden').getStakersdenParser();
var bet2_obj = require('../betobjects/stakersden').getStakersdenObject();
var helper = require('../helpers/misc');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;
var services = require('../services');
var extend = require('util')._extend;

var db = null;

var start = function () {

    db.createCollection("days", function (err, bet_days) {
        if (!err) {
            var cursor = bet_days.find().sort({ timestamp: 1});

            db.createCollection('games',

                /*{short_date: val.short_date },
                 { $set: {games: val.games, categories: val.categories}},*/

                function (er2, games) {
                    if (!er2) {
                        cursor.toArray(function (err, documents) //TODO Don't use 'toArray().length' find a better method to get item count
                        {
                            if (documents.length > 0) {


                                async.each(documents, function (val, callback) {

									//Need to clone the day object if using more than one BetParser
									var val_clone = extend({}, val);
									
                                    //services.startNoQueueBetParsingService(constants.winners_golden_bet_home, bet1_obj, bet1, val, games);
                                    services.startNoQueueBetParsingService(constants.stakersden_home, bet2_obj, bet2, val_clone, games);
                                    //console.log('[DOCUMENT COUNT]: ' + documents.length)
                                })


                            }
                        });

                    }
                });
        }
    });


}


MongoClient.connect(constants.MONGO_DB_URL, function (err, temp_db) {
    if (!err) {
        console.log("Connected correctly to server");
        GLOBAL.db_conn_status = 1;
        db = temp_db;
        start();

    }
    else {
        GLOBAL.db_conn_status = 0;
        console.log('DB ERROR: ' + err);
    }


});
/**
 * Created by olaokenyi on 6/11/15.
 */
/**
 * Created by olaokenyi on 6/11/15.
 */


var request = require('request');
var async = require('async');
var constants = require('../constants').loadConstants();
var bet1 = require('../parsers/surebet').getSurebetParser();
var bet1_obj = require('../betobjects/surebet').getSurebetObject();

var helper = require('../helpers/misc');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;
var services = require('../services')


var db = null;

var start = function () {

    db.createCollection("days", function (err, bet_days) {
        if (!err) {
            var cursor = bet_days.find({}).sort({ timestamp: 1});

            db.createCollection('games',

                /*{short_date: val.short_date },
                 { $set: {games: val.games, categories: val.categories}},*/

                function (er2, games) {
                    if (!er2) {
                        cursor.toArray(function (err, documents) //TODO Don't use 'toArray().length' find a better method to get item count
                        {
                            if (documents.length > 0) {




									process.argv[process.argv.length - 1].split(',').forEach(function(param)
                                    {
                                        var val = parseInt(param.trim());

                                        switch(val)
                                        {
                                            case 1:
                                                var bet1 = require('../parsers/nairabet').getNairabetParser();
                                                var bet1_obj = require('../betobjects/nairabet').getNairabetObject();
                                                services.startNoQueueBetParsingServiceSeries(constants.nairabet_home, bet1_obj, bet1, documents,0, games);
                                            case 2:
                                                var bet1 = require('../parsers/merrybet').getMerrybetParser();
                                                var bet1_obj = require('../betobjects/merrybet').getMerrybetObject();
                                                services.startNoQueueBetParsingServiceSeries(constants.merrybet_home, bet1_obj, bet1, documents,0, games);
                                            case 3:
                                                var bet1 = require('../parsers/surebet').getSurebetParser();
                                                var bet1_obj = require('../betobjects/surebet').getSurebetObject();
                                                services.startNoQueueBetParsingServiceSeries(constants.surebet_home, bet1_obj, bet1, documents,0, games);
                                            case 4:
                                                var bet1 = require('../parsers/_1960bet').get_1960betParser();
                                                var bet1_obj = require('../betobjects/_1960bet').get_1960betObject();
                                                services.startNoQueueBetParsingServiceSeries(constants._1960bet_home, bet1_obj, bet1, documents,0, games);
                                            case 5:
                                                var bet1 = require('../parsers/stakersden').getStakersdenParser();
                                                var bet1_obj = require('../betobjects/stakersden').getStakersdenObject();
                                                services.startNoQueueBetParsingServiceSeries(constants.stakersden_home, bet1_obj, bet1, documents,0, games);
                                            case 6:
                                                var bet1 = require('../parsers/winnersgoldenbet').getWGBParser();
                                                var bet1_obj = require('../betobjects/winnersgoldenbet').getWGBObject();
                                                services.startNoQueueBetParsingServiceSeries(constants.winners_golden_bet_home, bet1_obj, bet1, documents,0, games);

                                        }
                                    })
                                       //services.startNoQueueBetParsingServiceSeries(constants._1960bet_home, bet2_obj, bet2, documents,0, games);
                                    //console.log('[DOCUMENT COUNT]: ' + documents.length)



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
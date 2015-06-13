/**
 * Created by olaokenyi on 5/1/15.
 */
//var http = require('http');
//var NodeCache = require('node-cache')
var constants = require('./../constants')
//var fs  = require('fs');
//var cheerio = require('cheerio');
//var express = require('express');
var nb = require('./nairabet');






function _1960bet()
{


}

_1960bet.prototype = nb.getNairabetObject();

_1960bet.prototype.parse_basic_op = function( cheerio_object, root)
{
    var odds = [];
    root('.eventBetPage_oo_p', cheerio_object).each(function(i, e)
    {
        odds.push(parseFloat(root(this).text().trim()));

    });

    return odds;
}

_1960bet.prototype.parse_op_with_keys = function( cheerio_object, root)
{
    var odds = [];
    var keys = []
    root('.event_bets', cheerio_object).each(function(i, e)
    {
       root(this).children().each(function(i2,e2)
       {
           root('#outcomeText',this).each( function(){

               keys.push(root(this).text().trim());
           })

           root('.eventBetPage_oo_p',this).each(function(){

               odds.push(parseFloat(root(this).text().trim()));
           });
       })


    });

    return {odds: odds, keys: keys};
}


_1960bet.prototype.clean = function(val)
{
    return require('../helpers/misc').clean(val);
}

_1960bet.prototype.clean_symbols = function(val)
{
    return require('../helpers/misc').clean_symbols(val);
}


_1960bet.prototype.day_bet_url_suffix = '/Odds/bets/date/';

















exports.get_1960betObject = function()
{
    return new _1960bet();
}















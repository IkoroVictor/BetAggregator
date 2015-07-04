/**
 * Created by olaokenyi on 5/1/15.
 */

//var constants = require('./../constants')
var nb = require('./nairabet');



function Merrybet()
{


}

Merrybet.prototype = nb.getNairabetObject();


Merrybet.prototype.parse_basic_op = function( cheerio_object, root)
{
    var odds = [];
    root('.eoo_p', cheerio_object).each(function(i, e)
    {
        odds.push(parseFloat(root(this).text().trim()));


    });

    return odds;
}

Merrybet.prototype.parse_outcomes = function( cheerio_object, root)
{
    var outcomes = [];
    root('.eoo_p', cheerio_object).each(function(i, e)
    {
        outcomes.push(parseFloat(root(this).text().trim()));


    });

    return odds;
}



Merrybet.prototype.parse_op_with_keys = function( cheerio_object, root)
{
    var odds = [];
    var keys = []
    root('.category_outcome', cheerio_object).each(function(i, e)
    {
        keys.push(root(this).children().eq(0).children().eq(0).children().eq(0).text().trim());
        odds.push(parseFloat(root(this).children().eq(0).children().eq(0).children().eq(1).text().trim()));

    });

    return {odds: odds, keys: keys};
}



Merrybet.prototype.clean = function(val)
{
    return require('../helpers/misc').clean(val);
}

Merrybet.prototype.clean_symbols = function(val)
{
    return require('../helpers/misc').clean_symbols(val);
}


Merrybet.prototype.day_bet_url_suffix = '/bets/date/';














exports.getMerrybetObject = function()
{
    return new Merrybet();
}















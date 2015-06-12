/**
 * Created by olaokenyi on 5/22/15.
 */
/**
 * Created by olaokenyi on 5/1/15.
 */

//var constants = require('./../constants')
var nb = require('./nairabet');



function WGB()
{


}

WGB.prototype = nb.getNairabetObject();


WGB.prototype.parse_basic_op = function( cheerio_object, root)
{
    var odds = [];

    root('.outcome', cheerio_object).each(function(i, e)
    {

        odds.push(parseFloat(root(this).text().trim()));

    });

    return odds;
}

WGB.prototype.parse_op_with_keys = function( cheerio_object, root)
{
    var odds = [];
    var keys = []
    root('.outcome', cheerio_object).each(function(i, e)
    {
        keys.push(root(this).attr('data-outcomename').trim());
        odds.push(parseFloat(root(this).text().trim()));

    });

    return {odds: odds, keys: keys};
}


WGB.prototype.clean = function(val)
{
    return require('../helpers/misc').clean(val);
}

WGB.prototype.clean_symbols = function(val)
{
    return require('../helpers/misc').clean_symbols(val);
}


WGB.prototype.day_bet_url_suffix = '/bets/date/';














exports.getWGBObject = function()
{
    return new WGB();
}















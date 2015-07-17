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

Merrybet.prototype.parse_outcome_ids = function( cheerio_object, root)
{
    var outcomes = [];
    root('.eoo_p', cheerio_object).each(function(i, e)
    {
        try {
            var outcomes_temp  = root(this, cheerio_object).parent().attr('onclick').split(",");
            var outcome = outcomes_temp[outcomes_temp.length - 3]
            outcomes.push(outcome);

        } catch (e) {
            console.log(ex);
            outcomes.push(-1)
        }

    });

    return outcomes;
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
Merrybet.prototype.double_chance_first_half_tag = 'doublechanceinfirsthalf';
Merrybet.prototype.double_chance_second_half_tag = 'doublechanceinsecondhalf';

Merrybet.prototype.draw_no_bet_first_half_tag = 'firsthalfdrawnobet';
Merrybet.prototype.draw_no_bet_second_half_tag = 'secondhalfdrawnobet';











exports.getMerrybetObject = function()
{
    return new Merrybet();
}















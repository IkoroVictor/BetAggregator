/**
 * Created by olaokenyi on 5/1/15.
 */

//var constants = require('./../constants')
var nb = require('./nairabet');



function Stakersden()
{


}

Stakersden.prototype = nb.getNairabetObject();



Stakersden.prototype.parse_outcome_ids = function( cheerio_object, root)
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

Stakersden.prototype.parse_basic_op = function( cheerio_object, root)
{

        var odds = [];
        root('.eoo_p', cheerio_object).each(function(i, e)
        {
            odds.push(parseFloat(root(this).text().trim()));


        });

        return odds;


}

Stakersden.prototype.parse_op_with_keys = function( cheerio_object, root)
{
    var odds = [];
    var keys = []

    root('#outcomePanel',cheerio_object).each(function(i2,e2)
    {

        root('#outcomeText',this).each( function(){

            keys.push(root(this).text().trim());
        })

        root('.eoo_p',this).each(function(){

            odds.push(parseFloat(root(this).text().trim()));

        });
    })
    return {odds: odds, keys: keys};
}


Stakersden.prototype.clean = function(val)
{
    return require('../helpers/misc').clean(val);
}

Stakersden.prototype.clean_symbols = function(val)
{
    return require('../helpers/misc').clean_symbols(val);
}

Stakersden.prototype.day_bet_url_suffix = '/Odds/bets/date/';
Stakersden.prototype.short_name = 'SD';

Stakersden.prototype.double_chance_first_half_tag = 'doublechanceinfirsthalf';
Stakersden.prototype.double_chance_second_half_tag = 'doublechanceinsecondhalf';

Stakersden.prototype.draw_no_bet_first_half_tag = 'firsthalfdrawnobet';
Stakersden.prototype.draw_no_bet_second_half_tag = 'secondhalfdrawnobet';













exports.getStakersdenObject = function()
{
    return new Stakersden();
}















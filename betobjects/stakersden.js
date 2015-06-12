/**
 * Created by olaokenyi on 5/1/15.
 */

//var constants = require('./../constants')
var nb = require('./nairabet');



function Stakersden()
{


}

Stakersden.prototype = nb.getNairabetObject();


Stakersden.prototype.parse_basic_op = function( cheerio_object, root)
{

        var odds = [];
        root('.eoo_p', cheerio_object).each(function(i, e)
        {
            odds.push(parseFloat(root(this).text().trim()));
            console.log(root(this).text());

        });

        return odds;


}

Stakersden.prototype.parse_op_with_keys = function( cheerio_object, root)
{
    var odds = [];
    var keys = []

    root('#outcomePanel',this).each(function(i2,e2)
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


Stakersden.prototype.day_bet_url_suffix = '/bets/date/';














exports.getStakersdenObject = function()
{
    return new Stakersden();
}















/**
 * Created by olaokenyi on 5/1/15.
 */
//var http = require('http');
//var NodeCache = require('node-cache')
//var constants = require('./../constants')
//var fs  = require('fs');
//var cheerio = require('cheerio');
//var express = require('express');







function Nairabet()
{


}


Nairabet.prototype.parse_basic_op = function( cheerio_object, root)
{
    var odds = [];
    root('.category_outcome', cheerio_object).each(function(i, e)
    {
        odds.push(parseFloat(root(this).children().eq(0).children().eq(0).children().eq(1).text().trim()));

    });

    return odds;
}

Nairabet.prototype.parse_op_with_keys = function( cheerio_object, root)
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

Nairabet.prototype.parse_basic_op = function( cheerio_object, root)
{
     var odds = [];
     root('.category_outcome', cheerio_object).each(function(i, e)
     {
        odds.push(parseFloat(root(this).children().eq(0).children().eq(0).children().eq(1).text().trim()));

     });

     return odds;
}

Nairabet.prototype.clean = function(val)
{
    return require('../helpers/misc').clean(val);
}

Nairabet.prototype.clean_symbols = function(val)
{
    return require('../helpers/misc').clean_symbols(val);
}


Nairabet.prototype.day_bet_url_suffix = '/bets/date/';
Nairabet.prototype.short_name = 'NB';











Nairabet.prototype.straight_win_tag = '1x2';


Nairabet.prototype.first_half_result_tag = '1sthalfresult';
Nairabet.prototype.second_half_result_tag = '2ndhalfresult';

Nairabet.prototype.double_chance_tag = 'doublechance';
Nairabet.prototype.double_chance_first_half_tag = 'doublechance';
Nairabet.prototype.double_chance_second_half_tag = 'doublechance';

Nairabet.prototype.handicap_0_1_tag = 'handicap01';
Nairabet.prototype.handicap_0_2_tag = 'handicap02';
Nairabet.prototype.handicap_1_0_tag = 'handicap10';
Nairabet.prototype.handicap_2_0_tag = 'handicap20';
Nairabet.prototype.handicap_2_0_tag = 'handicap20';



Nairabet.prototype.under_over_0_5_tag = 'underover05goals';
Nairabet.prototype.under_over_1_5_tag = 'underover15goals';
Nairabet.prototype.under_over_2_5_tag = 'underover25goals';
Nairabet.prototype.under_over_3_5_tag = 'underover35goals';
Nairabet.prototype.under_over_4_5_tag = 'underover45goals';
Nairabet.prototype.under_over_5_5_tag = 'underover55goals';
Nairabet.prototype.under_over_6_5_tag = 'underover65goals';
Nairabet.prototype.under_over_7_5_tag = 'underover75goals';


Nairabet.prototype.result_and_under_over_0_5_tag = '1x2andunderover05goals';
Nairabet.prototype.result_and_under_over_1_5_tag = '1x2andunderover15goals';
Nairabet.prototype.result_and_under_over_2_5_tag = '1x2andunderover25goals';
Nairabet.prototype.result_and_under_over_3_5_tag = '1x2andunderover35goals';
Nairabet.prototype.result_and_under_over_4_5_tag = '1x2andunderover45goals';
Nairabet.prototype.result_and_under_over_5_5_tag = '1x2andunderover55goals';
Nairabet.prototype.result_and_under_over_6_5_tag = '1x2andunderover65goals';
Nairabet.prototype.result_and_under_over_7_5_tag = '1x2andunderover75goals';




Nairabet.prototype.under_over_0_5_first_half_tag = 'underover05goalsin1sthalf';
Nairabet.prototype.under_over_1_5_first_half_tag = 'underover15goalsin1sthalf';
Nairabet.prototype.under_over_2_5_first_half_tag = 'underover25goalsin1sthalf';
Nairabet.prototype.under_over_3_5_first_half_tag = 'underover35goalsin1sthalf';


Nairabet.prototype.under_over_0_5_second_half_tag = 'underover05goalsin2ndhalf';
Nairabet.prototype.under_over_1_5_second_half_tag = 'underover15goalsin2ndhalf';
Nairabet.prototype.under_over_2_5_second_half_tag = 'underover25goalsin2ndhalf';
Nairabet.prototype.under_over_3_5_second_half_tag = 'underover35goalsin2ndhalf';




Nairabet.prototype.to_score_first_tag =  'toscorefirstgoal'
Nairabet.prototype.to_score_last_tag =  'toscorelastgoal'  //TODO Filter the question mark in the "clean" method, then remove it from here



Nairabet.prototype.draw_no_bet_tag = 'drawnobet';
Nairabet.prototype.draw_no_bet_first_half_tag = 'drawnobetin1sthalf';
Nairabet.prototype.draw_no_bet_second_half_tag = 'drawnobetin2ndhalf';


Nairabet.prototype.most_scoring_half_tag = 'mostscoringhalf';
Nairabet.prototype.halftime_fulltime_tag = 'halftimefulltime';
Nairabet.prototype.ten_minutes_tag = '110minresult';
Nairabet.prototype.clean_sheet_tag = 'cleansheet';
Nairabet.prototype.winning_margin_tag = 'winningmargin';
Nairabet.prototype.first_goal_time_tag = 'firstgoaltimeinterval';



Nairabet.prototype.correct_score_tag = 'correctscore';
Nairabet.prototype.correct_score_first_half_tag = 'correctscorein1sthalf';
Nairabet.prototype.correct_score_second_half_tag = 'correctscorein2ndhalf';

Nairabet.prototype.both_teams_to_score_tag = 'bothteamstoscore';

Nairabet.prototype.both_teams_to_score_first_half_tag = 'bothteamstoscoreinfirsthalf';
Nairabet.prototype.both_teams_to_score_second_half_tag = 'bothteamstoscoreinsecondhalf';

Nairabet.prototype.total_goals_tag = 'totalgoals';
Nairabet.prototype.total_goals_first_half_tag = 'totalgoalsin1sthalfoddeven';
Nairabet.prototype.total_goals_second_half_tag = 'totalgoalsin2ndhalfoddeven';




Nairabet.prototype.under_over_0_5_cards_tag = 'underover05cards';
Nairabet.prototype.under_over_1_5_cards_tag = 'underover15cards';
Nairabet.prototype.under_over_2_5_cards_tag = 'underover25cards';
Nairabet.prototype.under_over_3_5_cards_tag = 'underover35cards';
Nairabet.prototype.under_over_4_5_cards_tag = 'underover45cards';
Nairabet.prototype.under_over_5_5_cards_tag = 'underover55cards';
Nairabet.prototype.under_over_6_5_cards_tag = 'underover65cards';
Nairabet.prototype.under_over_7_5_cards_tag = 'underover75cards';


Nairabet.prototype.under_over_0_5_cards_first_half_tag = 'firsthalfcards05';
Nairabet.prototype.under_over_1_5_cards_first_half_tag = 'firsthalfcards15';
Nairabet.prototype.under_over_2_5_cards_first_half_tag = 'firsthalfcards25';
Nairabet.prototype.under_over_3_5_cards_first_half_tag = 'firsthalfcards35';

Nairabet.prototype.number_of_goals_tag = 'numberofgoals';








exports.getNairabetObject = function()
{
    return new Nairabet();
}















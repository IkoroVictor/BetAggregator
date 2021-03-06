/**
 * Created by olaokenyi on 5/1/15.
 */
//var http = require('http');
//var NodeCache = require('node-cache')
//var constants = require('./../constants')
//var fs  = require('fs');
//var cheerio = require('cheerio');
//var express = require('express');
var helper =  require('../helpers/misc');






function Nairabet()
{


}


Nairabet.prototype.parse_outcome_ids = function( cheerio_object, root)
{
    var outcomes = [];
    root('.category_outcome', cheerio_object).each(function(i, e)
    {
        try {
            var outcomes_temp  = root(this, cheerio_object).attr('onclick').split(",");
            var outcome = outcomes_temp[outcomes_temp.length - 4]
            outcomes.push(outcome);

        } catch (e) {
            console.log(ex);
            outcomes.push(-1)
        }
    });
    //console.log(outcomes);

    return outcomes;
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
    return helper.clean(val);
}

Nairabet.prototype.clean_symbols = function(val)
{
    return helper.clean_symbols(val);
}


Nairabet.prototype.day_bet_url_suffix = '/bets/date/';
Nairabet.prototype.short_name = 'NB';











Nairabet.prototype.straight_win_tag = '1x2';


Nairabet.prototype.first_half_result_tag = '1sthalfresult';
Nairabet.prototype.second_half_result_tag = '2ndhalfresult';

Nairabet.prototype.double_chance_tag = 'doublechance';
Nairabet.prototype.double_chance_first_half_tag = 'doublechancein1sthalf';
Nairabet.prototype.double_chance_second_half_tag = 'doublechancein2ndhalf';

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


Nairabet.prototype.under_over_0_5_second_half_tag = 'goalsinsecondhalf05';
Nairabet.prototype.under_over_1_5_second_half_tag = 'goalsinsecondhalf15';
Nairabet.prototype.under_over_2_5_second_half_tag = 'goalsinsecondhalf25';
Nairabet.prototype.under_over_3_5_second_half_tag = 'goalsinsecondhalf35';




Nairabet.prototype.to_score_first_tag =  'toscorefirstgoal'
Nairabet.prototype.to_score_last_tag =  'toscorelastgoal'  



Nairabet.prototype.draw_no_bet_tag = 'drawnobet';
Nairabet.prototype.draw_no_bet_first_half_tag = 'drawnobetin1sthalf';
Nairabet.prototype.draw_no_bet_second_half_tag = 'drawnobetin2ndhalf';

Nairabet.prototype.home_no_bet_tag = 'homenobet';
Nairabet.prototype.away_no_bet_tag = 'awaynobet';


Nairabet.prototype.most_scoring_half_tag = 'mostscoringhalf';
Nairabet.prototype.halftime_fulltime_tag = 'halftimefulltime';
Nairabet.prototype.ten_minutes_tag = '110minresult';
Nairabet.prototype.clean_sheet_tag = 'cleansheet';
Nairabet.prototype.clean_sheet_half_tag = 'cleansheetin1sthalf ';
Nairabet.prototype.clean_sheet_half_2_tag = 'cleansheetin2ndhalf ';
Nairabet.prototype.winning_margin_tag = 'winningmargin';
Nairabet.prototype.first_goal_time_tag = 'firstgoaltimeinterval';
Nairabet.prototype.first_scorer_tag = '1stscorer';
Nairabet.prototype.last_scorer_tag = 'playertoscorelastgoal';
Nairabet.prototype.scorer_tag = 'whowillscoregoalinthematch';



Nairabet.prototype.correct_score_tag = 'correctscore';
Nairabet.prototype.correct_score_others_tag = 'correctscoreincludingother';
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
Nairabet.prototype.under_over_3_5_cards_first_half_tag = 'firsthalfcards35'

Nairabet.prototype.under_over_0_5_cards_second_half_tag = 'secondhalfcards05';
Nairabet.prototype.under_over_1_5_cards_second_half_tag = 'secondhalfcards15';
Nairabet.prototype.under_over_2_5_cards_second_half_tag = 'secondhalfcards25';
Nairabet.prototype.under_over_3_5_cards_second_half_tag = 'secondhalfcards35';

Nairabet.prototype.number_of_goals_tag = 'numberofgoals';
Nairabet.prototype.number_of_goals_first_half_tag = 'numberofgoalsin1sthalf';
Nairabet.prototype.number_of_goals_second_half_tag = 'numberofgoalsin2ndhalf ';











exports.getNairabetObject = function()
{
    return new Nairabet();
}















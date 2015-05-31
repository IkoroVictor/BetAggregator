/**
 * Created by olaokenyi on 5/5/15.
 */



var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var g = require('./constants').newGame();
var nparser = require('./betobjects/surebet').getSurebetObject();
var memwatch = require('memwatch');

var data = {

    full_date: '19.05.15',
        short_date: '19.05.15',
    sql_date: '',
    categories: {

},
    games: []

};

game = g.game;



$ = cheerio.load(fs.readFileSync('./html_files/surebet match.html'), {
    normalizeWhitespace: false,
        xmlMode: false,
        decodeEntities: true
}
);

/*
$('</tr>').insertAfter('.event_game_title');

fs.writeFileSync('./nb_match2.html', $.html());
*/

/*var root = $('#betsTable');

var match_title = $('.column_middle_left', '#eventTitlePanel', root).text();
var match_time = $('.column_middle_right', '#eventTitlePanel', root).text();


game.time = match_time;
game.title = match_title;

game.home = match_title.split('-')[0].trim();
game.away = match_title.split('-')[1].trim();*/

/*
$('.event_game_title', root).each(function(indx, elem)
{
    $(this).append('</tr>');
});
*/


var helper = require('./helpers/misc');
var root = $('#betsTable');

var match_title = $('.column_middle_left', '#eventTitlePanel', root).text();
var match_time = $('.column_middle_right', '#eventTitlePanel', root).text();


game.time = match_time;
game.title = match_title;


 $('</tr>').insertAfter('.event_game_title');

$('.event_game_title', root).each(function (indx, elem) {

    tag_temp = nparser.clean_symbols($(this).children().eq(0).children().eq(0).children().eq(0).text()).toLowerCase().split('*');

    tag = tag_temp[0];
    game_code = tag_temp[1];

    //console.log($(this).parent().html());

    //parse straight_win
    if( tag == nparser.straight_win_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds['1'].nb = odds[0];
        game.odds['x'].nb = odds[1];
        game.odds['2'].nb = odds[2];
    }

    //Handicap 0:1
    if(tag == nparser.handicap_0_1_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.handicap_0_1_1.nb = odds[0];
        game.odds.handicap_0_1_x.nb = odds[1];
        game.odds.handicap_0_1_2.nb = odds[2];

    }

    //Handicap 0:2
    if(tag == nparser.handicap_0_2_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.handicap_0_2_1.nb = odds[0];
        game.odds.handicap_0_2_x.nb = odds[1];
        game.odds.handicap_0_2_2.nb = odds[2];

    }

    //Handicap 1:0
    if(tag == nparser.handicap_1_0_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.handicap_1_0_1.nb = odds[0];
        game.odds.handicap_1_0_x.nb = odds[1];
        game.odds.handicap_1_0_2.nb = odds[2];

    }

    //Handicap 2:0
    if(tag == nparser.handicap_2_0_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.handicap_2_0_1.nb = odds[0];
        game.odds.handicap_2_0_x.nb = odds[1];
        game.odds.handicap_2_0_2.nb = odds[2];

    }

    //Double chance
    if(tag == nparser.double_chance_tag)
    {
        var odds = nparser.parse_basic_op($(this).parent().next(), $);
        game.odds['1x'].nb = odds[0];
        game.odds['12'].nb = odds[1];
        game.odds['x2'].nb = odds[2];

    }

    //Double chance 1st Half
    if(tag == nparser.double_chance_first_half_tag)
    {
        var odds = nparser.parse_basic_op($(this).parent().next(), $);
        game.odds['1x_half'].nb = odds[0];
        game.odds['12_half'].nb = odds[1];
        game.odds['x2_half'].nb = odds[2];

    }
    //Double chance 2nd Half
    if(tag == nparser.double_chance_second_half_tag)
    {
        var odds = nparser.parse_basic_op($(this).parent().next(), $);
        game.odds['1x_half_2'].nb = odds[0];
        game.odds['12_half_2'].nb = odds[1];
        game.odds['x2_half_2'].nb = odds[2];

    }
     //1st half result
    if(tag == nparser.first_half_result_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds['1_half'].nb = odds[0];
        game.odds['x_half'].nb = odds[1];
        game.odds['2_half'].nb = odds[2];

    }
    //2nd half result
    if(tag == nparser.second_half_result_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds['1_half_2'].nb = odds[0];
        game.odds['x_half_2'].nb = odds[1];
        game.odds['2_half_2'].nb = odds[2];

    }

    //most scoring half
    if(tag == nparser.most_scoring_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.most_scoring_half.half.nb = odds[0];
        game.odds.most_scoring_half.half_2.nb = odds[2];
        game.odds.most_scoring_half.equal.nb = odds[1];


    }
    //To score first
    if(tag == nparser.to_score_first_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.first_goal.home.nb = odds[0];
        game.odds.first_goal.away.nb = odds[2];
        game.odds.first_goal.no_goal.nb = odds[1];

    }

    //To score Last
    if(tag == nparser.to_score_last_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.last_goal.home.nb = odds[0];
        game.odds.last_goal.away.nb = odds[2];
        game.odds.last_goal.no_goal.nb = odds[1];

    }



    //First Goal Time
    if( tag == nparser.first_goal_time_tag)
    {
        var val = nparser.parse_op_with_keys( $(this).parent().next(), $);
        for(var i = 0; i < val.odds.length; i++)
        {
            var obj = game.odds.first_goal_time[nparser.clean(val.keys[i]).toLowerCase()];
            console.log(nparser.clean(val.keys[i]));
            if( obj != undefined)
            {
                obj.nb = val.odds[i];
            }
        }
    }

    //Draw No Bet
    if(tag == nparser.draw_no_bet_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.draw_no_bet.home.nb = odds[0];
        game.odds.draw_no_bet.away.nb = odds[1];

    }

    //Draw No Bet First Half
    if(tag == nparser.draw_no_bet_first_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.draw_no_bet_half.home.nb = odds[0];
        game.odds.draw_no_bet_half.away.nb = odds[1];

    }

    //Draw No Bet Second Half
    if(tag == nparser.draw_no_bet_second_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.draw_no_bet_half_2.home.nb = odds[0];
        game.odds.draw_no_bet_half_2.away.nb = odds[1];

    }

    //under/over0.5 first half
    if(tag == nparser.under_over_0_5_first_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under0_5_half.nb = odds[0];
        game.odds.over0_5_half.nb = odds[1];


    }

    //under/over1.5 first half
    if(tag == nparser.under_over_1_5_first_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under1_5_half.nb = odds[0];
        game.odds.over1_5_half.nb = odds[1];


    }

    //under/over2.5 first half
    if(tag == nparser.under_over_2_5_first_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under2_5_half.nb = odds[0];
        game.odds.over2_5_half.nb = odds[1];


    }


    //under/over0.5 second half
    if(tag == nparser.under_over_0_5_second_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under0_5_half_2.nb = odds[0];
        game.odds.over0_5_half_2.nb = odds[1];


    }

    //under/over1.5 second half
    if(tag == nparser.under_over_1_5_second_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under1_5_half_2.nb = odds[0];
        game.odds.over1_5_half_2.nb = odds[1];


    }

    //under/over2.5 second half
    if(tag == nparser.under_over_2_5_second_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under2_5_half_2.nb = odds[0];
        game.odds.over2_5_half_2.nb = odds[1];


    }

    //under/over0.5
    if(tag == nparser.under_over_0_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under0_5.nb = odds[0];
        game.odds.over0_5.nb = odds[1];


    }

    //under/over1.5
    if(tag == nparser.under_over_1_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under1_5.nb = odds[0];
        game.odds.over1_5.nb = odds[1];


    }
    //under/over2.5
    if(tag == nparser.under_over_2_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under2_5.nb = odds[0];
        game.odds.over2_5.nb = odds[1];


    }
    //under/over3.5
    if(tag == nparser.under_over_3_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under3_5.nb = odds[0];
        game.odds.over3_5.nb = odds[1];


    }
    //under/over4.5
    if(tag == nparser.under_over_4_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under4_5.nb = odds[0];
        game.odds.over4_5.nb = odds[1];


    }
    //under/over5.5
    if(tag == nparser.under_over_5_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under5_5.nb = odds[0];
        game.odds.over5_5.nb = odds[1];


    }
    //under/over6.5
    if(tag == nparser.under_over_6_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under6_5.nb = odds[0];
        game.odds.over6_5.nb = odds[1];


    }
    //under/over7.5
    if(tag == nparser.under_over_7_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under7_5.nb = odds[0];
        game.odds.over7_5.nb = odds[1];


    }


    //Both teams to score
    if(tag == nparser.both_teams_to_score_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.bts.yes.nb = odds[0];
        game.odds.bts.no.nb = odds[1];

    }

    //Both teams to score first half
    if(tag == nparser.both_teams_to_score_first_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.bts_half.yes.nb = odds[0];
        game.odds.bts_half.no.nb = odds[1];

    }

    //Both teams to score second half
    if(tag == nparser.both_teams_to_score_second_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.bts_half_2.yes.nb = odds[0];
        game.odds.bts_half_2.no.nb = odds[1];

    }

    //Total Goals
    if(tag == nparser.total_goals_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.total_goals.odd.nb = odds[0];
        game.odds.total_goals.even.nb = odds[1];


    }
    //Total Goals First Half
    if(nparser.clean_symbols(tag) == nparser.total_goals_first_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.total_goals_half.odd.nb = odds[0];
        game.odds.total_goals_half.even.nb = odds[1];


    }

    //Total Goals Second Half
    if(nparser.clean_symbols(tag) == nparser.total_goals_second_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.total_goals_half_2.odd.nb = odds[0];
        game.odds.total_goals_half_2.even.nb = odds[1];


    }




    //under/over0.5 Cards
    if(tag == nparser.under_over_0_5_cards_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under0_5_card.nb = odds[0];
        game.odds.over0_5_card.nb = odds[1];


    }

    //under/over1.5 Cards
    if(tag == nparser.under_over_1_5_cards_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under1_5_card.nb = odds[0];
        game.odds.over1_5_card.nb = odds[1];


    }
    //under/over2.5 Cards
    if(tag == nparser.under_over_2_5_cards_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under2_5_card.nb = odds[0];
        game.odds.over2_5_card.nb = odds[1];


    }
    //under/over3.5 Cards
    if(tag == nparser.under_over_3_5_cards_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under3_5_card.nb = odds[0];
        game.odds.over3_5_card.nb = odds[1];


    }
    //under/over4.5 Cards
    if(tag == nparser.under_over_4_5_cards_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under4_5_card.nb = odds[0];
        game.odds.over4_5_card.nb = odds[1];


    }
    //under/over5.5 Cards
    if(tag == nparser.under_over_5_5_cards_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under5_5_card.nb = odds[0];
        game.odds.over5_5_card.nb = odds[1];


    }
    //under/over6.5 Cards
    if(tag == nparser.under_over_6_5_cards_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under6_5_card.nb = odds[0];
        game.odds.over6_5_card.nb = odds[1];


    }



    //under/over0.5 Cards First Half
    if(tag == nparser.under_over_0_5_cards_first_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under0_5_card_half.nb = odds[0];
        game.odds.over0_5_card_half.nb = odds[1];


    }

    //under/over1.5 Cards First Half
    if(tag == nparser.under_over_1_5_cards_first_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under1_5_card_half.nb = odds[0];
        game.odds.over1_5_card_half.nb = odds[1];


    }
    //under/over2.5 Cards First Half
    if(tag == nparser.under_over_2_5_cards_first_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under2_5_card_half.nb = odds[0];
        game.odds.over2_5_card_half.nb = odds[1];


    }

    //under/over3.5 Cards First Half
    if(tag == nparser.under_over_3_5_cards_first_half_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.under3_5_card_half.nb = odds[0];
        game.odds.over3_5_card_half.nb = odds[1];


    }

    //Halftime/Fulltime
    if(tag == nparser.halftime_fulltime_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.halftime_fulltime.home_home.nb = odds[0];
        game.odds.halftime_fulltime.home_x.nb = odds[1];
        game.odds.halftime_fulltime.home_away.nb = odds[2];
        game.odds.halftime_fulltime.x_home.nb = odds[3];
        game.odds.halftime_fulltime.x_x.nb = odds[4];
        game.odds.halftime_fulltime.x_away.nb = odds[5];
        game.odds.halftime_fulltime.away_home.nb = odds[6];
        game.odds.halftime_fulltime.away_x.nb = odds[7];
        game.odds.halftime_fulltime.away_away.nb = odds[8];



    }

    //Total goals (Home)
    if(tag == (nparser.total_goals_tag +'('+ nparser.clean(game.home.toLowerCase()) + ')' ))
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.team_total_goals.home['0'].nb = odds[0];
        game.odds.team_total_goals.home['1'].nb = odds[1];
        game.odds.team_total_goals.home['2'].nb = odds[2];
        game.odds.team_total_goals.home['3+'].nb = odds[3];


    }


    //Total goals (Away)
    if(tag == (nparser.total_goals_tag +'('+ nparser.clean(game.away.toLowerCase()) + ')' ))
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.team_total_goals.away['0'].nb = odds[0];
        game.odds.team_total_goals.away['1'].nb = odds[1];
        game.odds.team_total_goals.away['2'].nb = odds[2];
        game.odds.team_total_goals.away['3+'].nb = odds[3];


    }

    //Correct Score
    if(tag == (nparser.correct_score_tag ))
    {
        var val = nparser.parse_op_with_keys( $(this).parent().next(), $);

        for(var i = 0; i < val.odds.length; i++)
        {
            game.odds.correct_score[nparser.clean_symbols(val.keys[i])].nb = val.odds[i];
        }
    }

    //Correct Score First Half
    if(tag == (nparser.correct_score_first_half_tag ))
    {
        var val = nparser.parse_op_with_keys( $(this).parent().next(), $);
        for(var i = 0; i < val.odds.length; i++)
        {
            var obj = game.odds.correct_score_half[nparser.clean_symbols(val.keys[i])];

            if( obj != undefined)
            {
               obj.nb = val.odds[i];
            }
        }
    }




    //Correct Score Second Half
    if(tag == (nparser.correct_score_second_half_tag ))
    {
        var val = nparser.parse_op_with_keys( $(this).parent().next(), $);
        for(var i = 0; i < val.odds.length; i++)
        {
            var obj = game.odds.correct_score_half_2[nparser.clean_symbols(val.keys[i])];

            if( obj != undefined)
            {
               obj.nb = val.odds[i];
            }
        }
    }

    //Ten Minutes Result
    if( tag == nparser.ten_minutes_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.ten_mins['1'].nb = odds[0];
        game.odds.ten_mins['x'].nb = odds[1];
        game.odds.ten_mins['2'].nb = odds[2];

    }


    //Most Scoring Half (Home)
    if(tag == ( nparser.clean(game.home.toLowerCase()) + nparser.most_scoring_half_tag))
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.home_most_scoring_half.half.nb = odds[0];
        game.odds.home_most_scoring_half.half_2.nb = odds[1];
        game.odds.home_most_scoring_half.equal.nb = odds[2];

    }
    //Most Scoring Half (Away)
    if(tag == ( nparser.clean(game.away.toLowerCase()) + nparser.most_scoring_half_tag))
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.away_most_scoring_half.half.nb = odds[0];
        game.odds.away_most_scoring_half.half_2.nb = odds[1];
        game.odds.away_most_scoring_half.equal.nb = odds[2];

    }


    //Home clean sheet
    if( tag == ( nparser.clean(game.home.toLowerCase()) + nparser.clean_sheet_tag))
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.home_clean_sheet.yes.nb = odds[0];
        game.odds.home_clean_sheet.no.nb = odds[1];


    }

    //Away clean sheet
    if( tag == ( nparser.clean(game.away.toLowerCase()) + nparser.clean_sheet_tag))
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.away_clean_sheet.yes.nb = odds[0];
        game.odds.away_clean_sheet.no.nb = odds[1];


    }


    //Winning Margin
    if( tag == nparser.winning_margin_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.win_margin.home_1.nb = odds[0];
        game.odds.win_margin.home_2.nb = odds[1];
        game.odds.win_margin['home_3+'].nb = odds[2];

        game.odds.win_margin.away_1.nb = odds[3];
        game.odds.win_margin.away_2.nb = odds[4];
        game.odds.win_margin['away_3+'].nb = odds[5];
        game.odds.win_margin['x'].nb = odds[6];


    }


    //1X2 and Under/Over 0.5
    if( tag == nparser.result_and_under_over_0_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.home_win_under0_5.nb = odds[0];
        game.odds.home_win_over0_5.nb = odds[1];
        game.odds.draw_under0_5.nb = odds[2];
        game.odds.draw_over0_5.nb = odds[3];

        game.odds.away_win_under0_5.nb = odds[4];
        game.odds.away_win_over0_5.nb = odds[5];



    }
    //1X2 and Under/Over 1.5
    if( tag == nparser.result_and_under_over_1_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.home_win_under1_5.nb = odds[0];
        game.odds.home_win_over1_5.nb = odds[1];
        game.odds.draw_under1_5.nb = odds[2];
        game.odds.draw_over1_5.nb = odds[3];

        game.odds.away_win_under1_5.nb = odds[4];
        game.odds.away_win_over1_5.nb = odds[5];



    }
    //1X2 and Under/Over 2.5
    if( tag == nparser.result_and_under_over_2_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.home_win_under2_5.nb = odds[0];
        game.odds.home_win_over2_5.nb = odds[1];
        game.odds.draw_under2_5.nb = odds[2];
        game.odds.draw_over2_5.nb = odds[3];

        game.odds.away_win_under2_5.nb = odds[4];
        game.odds.away_win_over2_5.nb = odds[5];

    }

    //1X2 and Under/Over 3.5
    if( tag == nparser.result_and_under_over_3_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.home_win_under3_5.nb = odds[0];
        game.odds.home_win_over3_5.nb = odds[1];
        game.odds.draw_under3_5.nb = odds[2];
        game.odds.draw_over3_5.nb = odds[3];

        game.odds.away_win_under3_5.nb = odds[4];
        game.odds.away_win_over3_5.nb = odds[5];

    }
    //1X2 and Under/Over 4.5
    if( tag == nparser.result_and_under_over_4_5_tag)
    {
        var odds = nparser.parse_basic_op( $(this).parent().next(), $);
        game.odds.home_win_under4_5.nb = odds[0];
        game.odds.home_win_over4_5.nb = odds[1];
        game.odds.draw_under4_5.nb = odds[2];
        game.odds.draw_over4_5.nb = odds[3];

        game.odds.away_win_under4_5.nb = odds[4];
        game.odds.away_win_over4_5.nb = odds[5];

    }

    //Number of Goals
    if(tag == (nparser.number_of_goals_tag ))
    {
        var val = nparser.parse_op_with_keys( $(this).parent().next(), $);
        for(var i = 0; i < val.odds.length; i++)
        {
            var obj = game.odds.number_of_goals[nparser.clean(val.keys[i])];

            if( obj != undefined)
            {
                obj.nb = val.odds[i];
            }
        }
    }











});


//nparser.getGames($, data);
console.log(game);
console.log(memwatch.gc());



















/*
$('#betsTable').children().each( function(index, elem)
{

    if($('#categoryTitlePanel', this).length)
    {
        var child = $('#categoryTitlePanel', this).eq(0);
        var category = { title:'', games:{}}

        $('.header_links2', child).each(function(indx2, elem2)
        {
            category.title += ($(this, child).text() + " | ")
        });


        data.today.categories[category.title] = category;
        currentkey = data.today.categories[category.title];
    }else
    {

    }




});*/

/**
 * Created by olaokenyi on 5/10/15.
 */

var nparser = require('../betobjects/_1960bet').get_1960betObject();
var helper = require('../helpers/misc');

function _1960betParser() {

}

_1960betParser.prototype.getGameOdds = function ($, game, db) {

    var match_title = $('.eventBetPage_eventName_text', '.event_bets').eq(0).text();

    var match_time = $('.event_title_panel').children().eq(0).text().split(' ');


    game.time = match_time[1];
    game.date = match_time[0];
    game.datetime = match_time[0] +  ' ' + match_time[1] ;

    game.title = match_title;

    try
    {
        game.id = helper.generateGameID(game.title)
        game.sorted_id = helper.generateSortedGameID(game.title)
        game.home = match_title.split('-')[0].trim();
        game.away = match_title.split('-')[1].trim();
    }
    catch(ex)
    {
        console.log(ex);
    }


    var temp_data = {};

    $('.bets_table_games_container').each(function (indx, elem) {



        var tag = nparser.clean_symbols($('.eventBetPage_gameName_text', this).text().trim()).toLowerCase();
        var game_code =$('.eventBetPage_gameCode_text', this).text().trim();

        obj = undefined;
        //parse straight_win
        if (tag == nparser.straight_win_tag) {
            var odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data["odds.1._1960"] = odds[0];
                temp_data["odds.x._1960"] = odds[1];
                temp_data["odds.2._1960"] = odds[2];
            }


        }

        //Handicap 0:1
        if (tag == nparser.handicap_0_1_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_0_1_1._1960'] = odds[0];
                temp_data['odds.handicap_0_1_x._1960'] = odds[1];
                temp_data['odds.handicap_0_1_2._1960'] = odds[2]
            }

        }

        //Handicap 0:2
        if (tag == nparser.handicap_0_2_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_0_2_1._1960'] = odds[0];
                temp_data['odds.handicap_0_2_x._1960'] = odds[1];
                temp_data['odds.handicap_0_2_2._1960'] = odds[2]
            }


        }

        //Handicap 1:0
        if (tag == nparser.handicap_1_0_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_1_0_1._1960'] = odds[0];
                temp_data['odds.handicap_1_0_x._1960'] = odds[1];
                temp_data['odds.handicap_1_0_2._1960'] = odds[2]
            }


        }

        //Handicap 2:0
        if (tag == nparser.handicap_2_0_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.handicap_2_0_1._1960'] = odds[0];
                temp_data['odds.handicap_2_0_x._1960'] = odds[1];
                temp_data['odds.handicap_2_0_2._1960'] = odds[2]

            }


        }

        //Double chance
        if (tag == nparser.double_chance_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.1x._1960'] = odds[0];
                temp_data['odds.12._1960'] = odds[1];
                temp_data['odds.x2._1960'] = odds[2]

            }

        }

        //Double chance 1st Half
        if (tag == nparser.double_chance_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1x_half._1960'] = odds[0];
                temp_data['odds.12_half._1960'] = odds[1];
                temp_data['odds.x2_half._1960'] = odds[2]


            }

        }
        //Double chance 2nd Half
        if (tag == nparser.double_chance_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1x_half_2._1960'] = odds[0];
                temp_data['odds.12_half_2._1960'] = odds[1];
                temp_data['odds.x2_half_2._1960'] = odds[2]

            }


        }
        //1st half result
        if (tag == nparser.first_half_result_tag) {
            odds = nparser.parse_basic_op($(this), $);


            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.1_half._1960'] = odds[0];
                temp_data['odds.x_half._1960'] = odds[1];
                temp_data['odds.2_half._1960'] = odds[2]

            }


        }
        //2nd half result
        if (tag == nparser.second_half_result_tag) {
            odds = nparser.parse_basic_op($(this), $);


            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1_half_2._1960'] = odds[0];
                temp_data['odds.x_half_2._1960'] = odds[1];
                temp_data['odds.2_half_2._1960'] = odds[2]
            }

        }

        //most scoring half
        if (tag == nparser.most_scoring_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.most_scoring_half.half._1960'] = odds[0];
                temp_data['odds.most_scoring_half.half_2._1960'] = odds[2];
                temp_data['odds.most_scoring_half.equal._1960'] = odds[1]

            }


        }
        //To score first
        if (tag == nparser.to_score_first_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.first_goal.home._1960'] = odds[0];
                temp_data['odds.first_goal.away._1960'] = odds[2];
                temp_data['odds.first_goal.no_goal._1960'] = odds[1]
            }

        }

        //To score Last
        if (tag == nparser.to_score_last_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.last_goal.home._1960'] = odds[0];
                temp_data['odds.last_goal.away._1960'] = odds[2];
                temp_data['odds.last_goal.no_goal._1960'] = odds[1]
            }

        }


        //First Goal Time
        if (tag == nparser.first_goal_time_tag) {
            var val = nparser.parse_op_with_keys($(this), $);
            try {
                temp_data = {};
                for (var i = 0; i < val.odds.length; i++) {
                    temp_data['odds.first_goal_time..' + nparser.clean(val.keys[i]).toLowerCase() + '._1960'] = val.odds[i];
                }

            }
            catch (ex) {
                console.log(ex);
            }

        }

        //Draw No Bet
        if (tag == nparser.draw_no_bet_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {

                temp_data['odds.draw_no_bet.home._1960'] = odds[0];
                temp_data['odds.draw_no_bet.away._1960'] = odds[1]

            }


        }

        //Draw No Bet First Half
        if (tag == nparser.draw_no_bet_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);


            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.draw_no_bet_half.home._1960'] = odds[0];
                temp_data['odds.draw_no_bet_half.away._1960'] = odds[1]

            }


        }

        //Draw No Bet Second Half
        if (tag == nparser.draw_no_bet_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.draw_no_bet_half_2.home._1960'] = odds[0];
                temp_data['odds.draw_no_bet_half_2.away._1960'] = odds[1]

            }
            //console.log(err);


        }

        //under/over0.5 first half
        if (tag == nparser.under_over_0_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5_half._1960'] = odds[0];
                temp_data['odds.over0_5_half._1960'] = odds[1]
            }


        }

        //under/over1.5 first half
        if (tag == nparser.under_over_1_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5_half._1960'] = odds[0];
                temp_data['odds.over1_5_half._1960'] = odds[1]

            }

        }

        //under/over2.5 first half
        if (tag == nparser.under_over_2_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5_half._1960'] = odds[0];
                temp_data['odds.over2_5_half._1960'] = odds[1]

            }

        }


        //under/over0.5 second half
        if (tag == nparser.under_over_0_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5_half_2._1960'] = odds[0];
                temp_data['odds.over0_5_half_2._1960'] = odds[1]

            }


        }

        //under/over1.5 second half
        if (tag == nparser.under_over_1_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5_half_2._1960'] = odds[0];
                temp_data['odds.over1_5_half_2._1960'] = odds[1]

            }


        }

        //under/over2.5 second half
        if (tag == nparser.under_over_2_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5_half_2._1960'] = odds[0];
                temp_data['odds.over2_5_half_2._1960'] = odds[1]

            }


        }

        //under/over0.5
        if (tag == nparser.under_over_0_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5._1960'] = odds[0];
                temp_data['odds.over0_5._1960'] = odds[1]

            }

        }

        //under/over1.5
        if (tag == nparser.under_over_1_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5._1960'] = odds[0];
                temp_data['odds.over1_5._1960'] = odds[1]

            }


        }
        //under/over2.5
        if (tag == nparser.under_over_2_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5._1960'] = odds[0];
                temp_data['odds.over2_5._1960'] = odds[1]

            }


        }
        //under/over3.5
        if (tag == nparser.under_over_3_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under3_5._1960'] = odds[0];
                temp_data['odds.over3_5._1960'] = odds[1]

            }


        }
        //under/over4.5
        if (tag == nparser.under_over_4_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under4_5._1960'] = odds[0];
                temp_data['odds.over4_5._1960'] = odds[1]

            }

        }
        //under/over5.5
        if (tag == nparser.under_over_5_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under5_5._1960'] = odds[0];
                temp_data['odds.over5_5._1960'] = odds[1]

            }


        }
        //under/over6.5
        if (tag == nparser.under_over_6_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under6_5._1960'] = odds[0];
                temp_data['odds.over6_5._1960'] = odds[1]

            }


        }
        //under/over7.5
        if (tag == nparser.under_over_7_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under7_5._1960'] = odds[0];
                temp_data['odds.over7_5._1960'] = odds[1]

            }


        }


        //Both teams to score
        if (tag == nparser.both_teams_to_score_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts.yes._1960'] = odds[0];
                temp_data['odds.bts.no._1960'] = odds[1]

            }


        }

        //Both teams to score first half
        if (tag == nparser.both_teams_to_score_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts_half.yes._1960'] = odds[0];
                temp_data['odds.bts_half.no._1960'] = odds[1]

            }


        }

        //Both teams to score second half
        if (tag == nparser.both_teams_to_score_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts_half_2.yes._1960'] = odds[0];
                temp_data['odds.bts_half_2.no._1960'] = odds[1]

            }


        }

        //Total Goals
        if (tag == nparser.total_goals_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals.odd._1960'] = odds[0];
                temp_data['odds.total_goals.even._1960'] = odds[1]

            }


        }
        //Total Goals First Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals_half.odd._1960'] = odds[0];
                temp_data['odds.total_goals_half.even._1960'] = odds[1]

            }


        }

        //Total Goals Second Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals_half_2.odd._1960'] = odds[0];
                temp_data['odds.total_goals_half_2.even._1960'] = odds[1]

            }

        }


        //under/over0.5 Cards
        if (tag == nparser.under_over_0_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under0_5_card._1960'] = odds[0];
                temp_data['odds.odds.over0_5_card._1960'] = odds[1]

            }


        }

        //under/over1.5 Cards
        if (tag == nparser.under_over_1_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under_5_card._1960'] = odds[0];
                temp_data['odds.odds.over1_5_card._1960'] = odds[1]

            }


        }
        //under/over2.5 Cards
        if (tag == nparser.under_over_2_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under2_5_card._1960'] = odds[0];
                temp_data['odds.odds.over2_5_card._1960'] = odds[1]

            }

        }
        //under/over3.5 Cards
        if (tag == nparser.under_over_3_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under3_5_card._1960'] = odds[0];
                temp_data['odds.odds.over3_5_card._1960'] = odds[1]

            }


        }
        //under/over4.5 Cards
        if (tag == nparser.under_over_4_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under4_5_card._1960'] = odds[0];
                temp_data['odds.odds.over4_5_card._1960'] = odds[1]

            }


        }
        //under/over5.5 Cards
        if (tag == nparser.under_over_5_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under5_5_card._1960'] = odds[0];
                temp_data['odds.odds.over5_5_card._1960'] = odds[1]

            }

        }
        //under/over6.5 Cards
        if (tag == nparser.under_over_6_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under6_5_card._1960'] = odds[0];
                temp_data['odds.odds.over6_5_card._1960'] = odds[1]

            }

        }


        //under/over0.5 Cards First Half
        if (tag == nparser.under_over_0_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under0_5_card_half._1960'] = odds[0];
                temp_data['odds.odds.over0_5_card_half._1960'] = odds[1]

            }

        }

        //under/over1.5 Cards First Half
        if (tag == nparser.under_over_1_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under1_5_card_half._1960'] = odds[0];
                temp_data['odds.odds.over1_5_card_half._1960'] = odds[1]

            }


        }
        //under/over2.5 Cards First Half
        if (tag == nparser.under_over_2_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under2_5_card_half._1960'] = odds[0];
                temp_data['odds.odds.over2_5_card_half._1960'] = odds[1]

            }

        }

        //under/over3.5 Cards First Half
        if (tag == nparser.under_over_3_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under3_5_card_half._1960'] = odds[0];
                temp_data['odds.odds.over3_5_card_half._1960'] = odds[1]

            }


        }

        //Halftime/Fulltime
        if (tag == nparser.halftime_fulltime_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 9)) {
                temp_data['odds.halftime_fulltime.home_home._1960'] = odds[0];
                temp_data['odds.halftime_fulltime.home_x._1960'] = odds[1];
                temp_data['odds.halftime_fulltime.home_away._1960'] = odds[2];
                temp_data['odds.halftime_fulltime.x_home._1960'] = odds[3];
                temp_data['odds.halftime_fulltime.x_x._1960'] = odds[4];
                temp_data['odds.halftime_fulltime.x_away._1960'] = odds[5];
                temp_data['odds.halftime_fulltime.away_home._1960'] = odds[6];
                temp_data['odds.halftime_fulltime.away_x._1960'] = odds[7];
                temp_data['odds.halftime_fulltime.away_away._1960'] = odds[8]

            }


        }

        //Total goals (Home)
        if (tag == (nparser.total_goals_tag + '(.' + nparser.clean(game.home.toLowerCase()) + ')' )) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 4)) {
                temp_data['odds.team_total_goals.home.0._1960'] = odds[0];
                temp_data['odds.team_total_goals.home.1._1960'] = odds[1];
                temp_data['odds.team_total_goals.home.2._1960'] = odds[2];
                temp_data['odds.team_total_goals.home.3+._1960'] = odds[3]


            }


        }


        //Total goals (Away)
        if (tag == (nparser.total_goals_tag + '(.' + nparser.clean(game.away.toLowerCase()) + ')' )) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 4)) {
                temp_data['odds.team_total_goals.away.0._1960'] = odds[0];
                temp_data['odds.team_total_goals.away.1._1960'] = odds[1];
                temp_data['odds.team_total_goals.away.2._1960'] = odds[2];
                temp_data['odds.team_total_goals.away.3+._1960'] = odds[3]


            }


        }

        //Correct Score
        if (tag == (nparser.correct_score_tag )) {
            var val = nparser.parse_op_with_keys($(this), $);

            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score.' + nparser.clean_symbols(val.keys[i]) + '._1960'] = val.odds[i];
            }

        }

        //Correct Score First Half
        if (tag == (nparser.correct_score_first_half_tag )) {
            var val = nparser.parse_op_with_keys($(this), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score_half.' + nparser.clean_symbols(val.keys[i])+'._1960']  = val.odds[i];

                if (obj != undefined) {
                    //obj._1960 = val.odds[i];                 }
                }
            }
        }


        //Correct Score Second Half
        if (tag == (nparser.correct_score_second_half_tag )) {
            var val = nparser.parse_op_with_keys($(this), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score_half_2.' + nparser.clean_symbols(val.keys[i])+'._1960']  = val.odds[i];

                if (obj != undefined) {
                    //obj._1960 = val.odds[i];                 }
                }
            }
        }

        //Ten Minutes Result
        if (tag == nparser.ten_minutes_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.ten_mins.1._1960'] = odds[0];
                temp_data['odds.ten_mins.x._1960'] = odds[1];
                temp_data['odds.ten_mins.2._1960'] = odds[2]


            }

        }


        //Most Scoring Half (Home)
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.most_scoring_half_tag)) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.home_most_scoring_half.half._1960'] = odds[0];
                temp_data['odds.home_most_scoring_half.half_2._1960'] = odds[1];
                temp_data['odds.home_most_scoring_half.equal._1960'] = odds[2]


            }


        }
        //Most Scoring Half (Away)
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.most_scoring_half_tag)) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.away_most_scoring_half.half._1960'] = odds[0];
                temp_data['odds.away_most_scoring_half.half_2._1960'] = odds[1];
                temp_data['odds.away_most_scoring_half.equal._1960'] = odds[2]


            }

        }


        //Home clean sheet
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.clean_sheet_tag)) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.home_clean_sheet.yes._1960'] = odds[0];
                temp_data['odds.home_clean_sheet.no._1960'] = odds[1]


            }


        }

        //Away clean sheet
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.clean_sheet_tag)) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.away_clean_sheet.yes._1960'] = odds[0];
                temp_data['odds.away_clean_sheet.no._1960'] = odds[1]


            }

        }


        //Winning Margin
        if (tag == nparser.winning_margin_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 7)) {
                temp_data['odds.win_margin.home_1._1960'] = odds[0];
                temp_data['odds.win_margin.home_2._1960'] = odds[1];
                temp_data['odds.win_margin.home_3+._1960'] = odds[2];
                temp_data['odds.win_margin.away_1._1960'] = odds[3];
                temp_data['odds.win_margin.away_2._1960'] = odds[4];
                temp_data['odds.win_margin.away_3+._1960'] = odds[5];
                temp_data['odds.win_margin.x._1960'] = odds[6]


            }


        }


        //1X2 and Under/Over 0.5
        if (tag == nparser.result_and_under_over_0_5_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under0_5._1960'] = odds[0];
                temp_data['odds.home_win_over0_5._1960'] = odds[1];
                temp_data['odds.draw_under0_5._1960'] = odds[2];
                temp_data['odds.draw_over0_5._1960'] = odds[3];
                temp_data['odds.away_win_under0_5._1960'] = odds[4];
                temp_data['odds.away_win_over0_5._1960'] = odds[5]


            }


        }
        //1X2 and Under/Over 1.5
        if (tag == nparser.result_and_under_over_1_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under1_5._1960'] = odds[0];
                temp_data['odds.home_win_over1_5._1960'] = odds[1];
                temp_data['odds.draw_under1_5._1960'] = odds[2];
                temp_data['odds.draw_over1_5._1960'] = odds[3];
                temp_data['odds.away_win_under1_5._1960'] = odds[4];
                temp_data['odds.away_win_over1_5._1960'] = odds[5]


            }


        }
        //1X2 and Under/Over 2.5
        if (tag == nparser.result_and_under_over_2_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under2_5._1960'] = odds[0];
                temp_data['odds.home_win_over2_5._1960'] = odds[1];
                temp_data['odds.draw_under2_5._1960'] = odds[2];
                temp_data['odds.draw_over2_5._1960'] = odds[3];
                temp_data['odds.away_win_under2_5._1960'] = odds[4];
                temp_data['odds.away_win_over2_5._1960'] = odds[5]


            }


        }

        //1X2 and Under/Over 3.5
        if (tag == nparser.result_and_under_over_3_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under3_5._1960'] = odds[0];
                temp_data['odds.home_win_over3_5._1960'] = odds[1];
                temp_data['odds.draw_under3_5._1960'] = odds[2];
                temp_data['odds.draw_over3_5._1960'] = odds[3];
                temp_data['odds.away_win_under3_5._1960'] = odds[4];
                temp_data['odds.away_win_over3_5._1960'] = odds[5]


            }


        }
        //1X2 and Under/Over 4.5
        if (tag == nparser.result_and_under_over_4_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under4_5._1960'] = odds[0];
                temp_data['odds.home_win_over4_5._1960'] = odds[1];
                temp_data['odds.draw_under4_5._1960'] = odds[2];
                temp_data['odds.draw_over4_5._1960'] = odds[3];
                temp_data['odds.away_win_under4_5._1960'] = odds[4];
                temp_data['odds.away_win_over4_5._1960'] = odds[5]


            }


        }

        //Number of Goals
        if (tag == (nparser.number_of_goals_tag )) {
            var val = nparser.parse_op_with_keys($(this), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.number_of_goals.' + nparser.clean(val.keys[i])+'._1960']  = val.odds[i];

                if (obj != undefined) {
                    //obj._1960 = val.odds[i];                 }
                }
            }
        }




    });

    process.nextTick(function()
    {
        db.update({'id': game.id }, {$set: temp_data}, {upsert: true},
            function (err, count, status) {
                if (err)
                    console.log(err);
                else
                {
                    console.log('[DB SAVED] STATUS: '+ status+' COUNT: ' + count );
                    console.log('[DATA]: ' + JSON.stringify(temp_data));

                }
                temp_data = null;
            });
    })


    root = null;
    global.gc();


    //return game;


}

_1960betParser.prototype.getGames = function ($, data) {


    var current_cat = undefined;

    $('#betsTable').children().each(function (index, elem) {


        if ($(this).attr('id') == 'categoryTitlePanel') {
            var child = $(this);
            var category = { title: '', key: '', games: {}}

            category.title = $(child).children().eq(0).text().trim();
            category.key = helper.generateGameCategoryKey(category.title);
            //console.log(category.key);
            current_cat = category;
            data.categories[current_cat.key] = current_cat;
        }
        else {
            if($(this).attr('class') == 'bets_page_categoryContainer')
                $(this).children().each(function(i,e)
                {
                    if (($(this).attr('class') == 'category_bets_odd') || ($(this).attr('class') == 'category_bets_even')) {

                        var game = require('../constants').newGame().game;
                        var vars = $('.betsPanelEventName-text', this).text().trim();




                        game.title = vars.trim();
                        game.id = helper.generateGameID(game.title)

                        var sides = vars.split('-');
                        game.home = sides[0].trim();
                        game.away = sides[1].trim();


                        //console.log(game.datetime);
                        //TODO  Please don't rely on structure of the website.. use IDs  or ClASS to get Game URLS

                        var vars2 = $('#moreBetsPanel', this).attr('onclick');

                        if (vars2 != undefined) {
                            game.url = vars2.split("'")[1];
                        }
                        //game.date = game.datetime.split(" ")[0];
                       // game.time = game.datetime.split(" ")[1];


                        if (current_cat != undefined)
                            game.category_key = current_cat.key;

                        //game.datetime = $('.home_event_start', this).eq(0).text();

                        //game.timestamp = helper.getTimestamp(game.datetime);

                        data.games.push(game);
                    }
                });

        }


    });


    root = null;
    global.gc();


}


_1960betParser.prototype.getMatchDays = function ($, data) {
    $('#oddsByDateDropDown').children().each(function (index, elem) {
        var date = $(this).attr('value').trim();
        data[date] = {

            full_date: $(this).text(),
            short_date: date,
            sql_date: '',
            categories: {

            },
            games: []

        };


    });
};

_1960betParser.prototype.getMockMatchDays = function ($, data) {


    data['19.05.15'] = {

        full_date: '19.05.15',
        short_date: '19.05.15',
        sql_date: '',
        categories: {

        },
        games: []

    };
    data['20.05.15'] = {

        full_date: '20.05.15',
        short_date: '20.05.15',
        sql_date: '',
        categories: {

        },
        games: []

    };
    data['21.05.15'] = {

        full_date: '21.05.15',
        short_date: '21.05.15',
        sql_date: '',
        categories: {

        },
        games: []

    };


};


exports.get_1960betParser = function () {
    return new _1960betParser();
}

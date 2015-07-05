/**
 * Created by olaokenyi on 5/10/15.
 */

var nparser = require('../betobjects/surebet').getSurebetObject();
var helper = require('../helpers/misc');
function SurebetParser() {

}

SurebetParser.prototype.getGameOdds = function ($, game, db) {


    var root = $('#betsTable');

    var match_title = $('.column_middle_left', '#eventTitlePanel', root).text();
    var match_time = $('.column_middle_right', '#eventTitlePanel', root).text();


    game.time = match_time;
    game.title = match_title;

    /*game.home = match_title.split('-')[0].trim();
     game.away = match_title.split('-')[1].trim();*/

    $('</tr>').insertAfter('.event_game_title');


    //USE '$(this).parent().next()' AS OPPOSED TO NAIRABET '$(this).next()' when parsing odds
    var temp_data = {};

    $('.event_game_title').each(function (indx, elem) {

        tag_temp = nparser.clean_symbols($(this).children().eq(0).children().eq(0).children().eq(0).text()).toLowerCase().split('*');

        tag = tag_temp[0];
        game_code = tag_temp[1];

        var outcomes_ids =  nparser.parse_outcome_ids($(this).parent().next(), $);

        if (tag == nparser.straight_win_tag) {
            var odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data["odds.1.sb.value"] = odds[0];

                temp_data["odds.x.sb.value"] = odds[1];
                temp_data["odds.2.sb.value"] = odds[2];

                temp_data["odds.1.sb.outcome_id"] = outcomes_ids[0];
                temp_data["odds.x.sb.outcome_id"] = outcomes_ids[1];
                temp_data["odds.2.sb.outcome_id"] = outcomes_ids[2];

            }


        }

        //Handicap 0:1
        if (tag == nparser.handicap_0_1_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_0_1_1.sb.value'] = odds[0];
                temp_data['odds.handicap_0_1_x.sb.value'] = odds[1];
                temp_data['odds.handicap_0_1_2.sb.value'] = odds[2]
            }

        }

        //Handicap 0:2
        if (tag == nparser.handicap_0_2_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_0_2_1.sb.value'] = odds[0];
                temp_data['odds.handicap_0_2_x.sb.value'] = odds[1];
                temp_data['odds.handicap_0_2_2.sb.value'] = odds[2]
            }


        }

        //Handicap 1:0
        if (tag == nparser.handicap_1_0_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_1_0_1.sb.value'] = odds[0];
                temp_data['odds.handicap_1_0_x.sb.value'] = odds[1];
                temp_data['odds.handicap_1_0_2.sb.value'] = odds[2]
            }


        }

        //Handicap 2:0
        if (tag == nparser.handicap_2_0_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.handicap_2_0_1.sb.value'] = odds[0];
                temp_data['odds.handicap_2_0_x.sb.value'] = odds[1];
                temp_data['odds.handicap_2_0_2.sb.value'] = odds[2]

            }


        }

        //Double chance
        if (tag == nparser.double_chance_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.1x.sb.value'] = odds[0];
                temp_data['odds.12.sb.value'] = odds[1];
                temp_data['odds.x2.sb.value'] = odds[2]

            }

        }

        //Double chance 1st Half
        if (tag == nparser.double_chance_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1x_half.sb.value'] = odds[0];
                temp_data['odds.12_half.sb.value'] = odds[1];
                temp_data['odds.x2_half.sb.value'] = odds[2]


            }

        }
        //Double chance 2nd Half
        if (tag == nparser.double_chance_second_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1x_half_2.sb.value'] = odds[0];
                temp_data['odds.12_half_2.sb.value'] = odds[1];
                temp_data['odds.x2_half_2.sb.value'] = odds[2]

            }


        }
        //1st half result
        if (tag == nparser.first_half_result_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);


            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.1_half.sb.value'] = odds[0];
                temp_data['odds.x_half.sb.value'] = odds[1];
                temp_data['odds.2_half.sb.value'] = odds[2]

            }


        }
        //2nd half result
        if (tag == nparser.second_half_result_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);


            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1_half_2.sb.value'] = odds[0];
                temp_data['odds.x_half_2.sb.value'] = odds[1];
                temp_data['odds.2_half_2.sb.value'] = odds[2]
            }

        }

        //most scoring half
        if (tag == nparser.most_scoring_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.most_scoring_half.half.sb.value'] = odds[0];
                temp_data['odds.most_scoring_half.half_2.sb.value'] = odds[2];
                temp_data['odds.most_scoring_half.equal.sb.value'] = odds[1]

            }


        }
        //To score first
        if (tag == nparser.to_score_first_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.first_goal.home.sb.value'] = odds[0];
                temp_data['odds.first_goal.away.sb.value'] = odds[2];
                temp_data['odds.first_goal.no_goal.sb.value'] = odds[1]
            }

        }

        //To score Last
        if (tag == nparser.to_score_last_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.last_goal.home.sb.value'] = odds[0];
                temp_data['odds.last_goal.away.sb.value'] = odds[2];
                temp_data['odds.last_goal.no_goal.sb.value'] = odds[1]
            }

        }


        //First Goal Time
        if (tag == nparser.first_goal_time_tag) {
            var val = nparser.parse_op_with_keys($(this).parent().next(), $);
            try {

                for (var i = 0; i < val.odds.length; i++) {
                    temp_data['odds.first_goal_time.' + nparser.clean(val.keys[i]).toLowerCase() + '.sb.value'] = val.odds[i];
                }

            }
            catch (ex) {
                console.log(ex);
            }

        }

        //Draw No Bet
        if (tag == nparser.draw_no_bet_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 2)) {

                temp_data['odds.draw_no_bet.home.sb.value'] = odds[0];
                temp_data['odds.draw_no_bet.away.sb.value'] = odds[1]

            }


        }

        //Draw No Bet First Half
        if (tag == nparser.draw_no_bet_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);


            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.draw_no_bet_half.home.sb.value'] = odds[0];
                temp_data['odds.draw_no_bet_half.away.sb.value'] = odds[1]

            }


        }

        //Draw No Bet Second Half
        if (tag == nparser.draw_no_bet_second_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.draw_no_bet_half_2.home.sb.value'] = odds[0];
                temp_data['odds.draw_no_bet_half_2.away.sb.value'] = odds[1]

            }
            //console.log(err);


        }

        //under/over0.5 first half
        if (tag == nparser.under_over_0_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5_half.sb.value'] = odds[0];
                temp_data['odds.over0_5_half.sb.value'] = odds[1]
            }


        }

        //under/over1.5 first half
        if (tag == nparser.under_over_1_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5_half.sb.value'] = odds[0];
                temp_data['odds.over1_5_half.sb.value'] = odds[1]

            }

        }

        //under/over2.5 first half
        if (tag == nparser.under_over_2_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5_half.sb.value'] = odds[0];
                temp_data['odds.over2_5_half.sb.value'] = odds[1]

            }

        }


        //under/over0.5 second half
        if (tag == nparser.under_over_0_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5_half_2.sb.value'] = odds[0];
                temp_data['odds.over0_5_half_2.sb.value'] = odds[1]

            }


        }

        //under/over1.5 second half
        if (tag == nparser.under_over_1_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5_half_2.sb.value'] = odds[0];
                temp_data['odds.over1_5_half_2.sb.value'] = odds[1]

            }


        }

        //under/over2.5 second half
        if (tag == nparser.under_over_2_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5_half_2.sb.value'] = odds[0];
                temp_data['odds.over2_5_half_2.sb.value'] = odds[1]

            }


        }

        //under/over0.5
        if (tag == nparser.under_over_0_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5.sb.value'] = odds[0];
                temp_data['odds.over0_5.sb.value'] = odds[1]

            }

        }

        //under/over1.5
        if (tag == nparser.under_over_1_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5.sb.value'] = odds[0];
                temp_data['odds.over1_5.sb.value'] = odds[1]

            }


        }
        //under/over2.5
        if (tag == nparser.under_over_2_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5.sb.value'] = odds[0];
                temp_data['odds.over2_5.sb.value'] = odds[1]

            }


        }
        //under/over3.5
        if (tag == nparser.under_over_3_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under3_5.sb.value'] = odds[0];
                temp_data['odds.over3_5.sb.value'] = odds[1]

            }


        }
        //under/over4.5
        if (tag == nparser.under_over_4_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under4_5.sb.value'] = odds[0];
                temp_data['odds.over4_5.sb.value'] = odds[1]

            }

        }
        //under/over5.5
        if (tag == nparser.under_over_5_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under5_5.sb.value'] = odds[0];
                temp_data['odds.over5_5.sb.value'] = odds[1]

            }


        }
        //under/over6.5
        if (tag == nparser.under_over_6_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under6_5.sb.value'] = odds[0];
                temp_data['odds.over6_5.sb.value'] = odds[1]

            }


        }
        //under/over7.5
        if (tag == nparser.under_over_7_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under7_5.sb.value'] = odds[0];
                temp_data['odds.over7_5.sb.value'] = odds[1]

            }


        }


        //Both teams to score
        if (tag == nparser.both_teams_to_score_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts.yes.sb.value'] = odds[0];
                temp_data['odds.bts.no.sb.value'] = odds[1]

            }


        }

        //Both teams to score first half
        if (tag == nparser.both_teams_to_score_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts_half.yes.sb.value'] = odds[0];
                temp_data['odds.bts_half.no.sb.value'] = odds[1]

            }


        }

        //Both teams to score second half
        if (tag == nparser.both_teams_to_score_second_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts_half_2.yes.sb.value'] = odds[0];
                temp_data['odds.bts_half_2.no.sb.value'] = odds[1]

            }


        }

        //Total Goals
        if (tag == nparser.total_goals_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals.odd.sb.value'] = odds[0];
                temp_data['odds.total_goals.even.sb.value'] = odds[1]

            }


        }
        //Total Goals First Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals_half.odd.sb.value'] = odds[0];
                temp_data['odds.total_goals_half.even.sb.value'] = odds[1]

            }


        }

        //Total Goals Second Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_second_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals_half_2.odd.sb.value'] = odds[0];
                temp_data['odds.total_goals_half_2.even.sb.value'] = odds[1]

            }

        }


        //under/over0.5 Cards
        if (tag == nparser.under_over_0_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under0_5_card.sb.value'] = odds[0];
                temp_data['odds.odds.over0_5_card.sb.value'] = odds[1]

            }


        }

        //under/over1.5 Cards
        if (tag == nparser.under_over_1_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under_5_card.sb.value'] = odds[0];
                temp_data['odds.odds.over1_5_card.sb.value'] = odds[1]

            }


        }
        //under/over2.5 Cards
        if (tag == nparser.under_over_2_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under2_5_card.sb.value'] = odds[0];
                temp_data['odds.odds.over2_5_card.sb.value'] = odds[1]

            }

        }
        //under/over3.5 Cards
        if (tag == nparser.under_over_3_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under3_5_card.sb.value'] = odds[0];
                temp_data['odds.odds.over3_5_card.sb.value'] = odds[1]

            }


        }
        //under/over4.5 Cards
        if (tag == nparser.under_over_4_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under4_5_card.sb.value'] = odds[0];
                temp_data['odds.odds.over4_5_card.sb.value'] = odds[1]

            }


        }
        //under/over5.5 Cards
        if (tag == nparser.under_over_5_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under5_5_card.sb.value'] = odds[0];
                temp_data['odds.odds.over5_5_card.sb.value'] = odds[1]

            }

        }
        //under/over6.5 Cards
        if (tag == nparser.under_over_6_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under6_5_card.sb.value'] = odds[0];
                temp_data['odds.odds.over6_5_card.sb.value'] = odds[1]

            }

        }


        //under/over0.5 Cards First Half
        if (tag == nparser.under_over_0_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under0_5_card_half.sb.value'] = odds[0];
                temp_data['odds.odds.over0_5_card_half.sb.value'] = odds[1]

            }

        }

        //under/over1.5 Cards First Half
        if (tag == nparser.under_over_1_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under1_5_card_half.sb.value'] = odds[0];
                temp_data['odds.odds.over1_5_card_half.sb.value'] = odds[1]

            }


        }
        //under/over2.5 Cards First Half
        if (tag == nparser.under_over_2_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under2_5_card_half.sb.value'] = odds[0];
                temp_data['odds.odds.over2_5_card_half.sb.value'] = odds[1]

            }

        }

        //under/over3.5 Cards First Half
        if (tag == nparser.under_over_3_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under3_5_card_half.sb.value'] = odds[0];
                temp_data['odds.odds.over3_5_card_half.sb.value'] = odds[1]

            }


        }

        //Halftime/Fulltime
        if (tag == nparser.halftime_fulltime_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 9)) {
                temp_data['odds.halftime_fulltime.home_home.sb.value'] = odds[0];
                temp_data['odds.halftime_fulltime.home_x.sb.value'] = odds[1];
                temp_data['odds.halftime_fulltime.home_away.sb.value'] = odds[2];
                temp_data['odds.halftime_fulltime.x_home.sb.value'] = odds[3];
                temp_data['odds.halftime_fulltime.x_x.sb.value'] = odds[4];
                temp_data['odds.halftime_fulltime.x_away.sb.value'] = odds[5];
                temp_data['odds.halftime_fulltime.away_home.sb.value'] = odds[6];
                temp_data['odds.halftime_fulltime.away_x.sb.value'] = odds[7];
                temp_data['odds.halftime_fulltime.away_away.sb.value'] = odds[8]

            }


        }

        //Total goals (Home)
        if (tag == (nparser.total_goals_tag + '(.' + nparser.clean(game.home.toLowerCase()) + ')' )) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 4)) {
                temp_data['odds.team_total_goals.home.0.sb.value'] = odds[0];
                temp_data['odds.team_total_goals.home.1.sb.value'] = odds[1];
                temp_data['odds.team_total_goals.home.2.sb.value'] = odds[2];
                temp_data['odds.team_total_goals.home.3+.sb.value'] = odds[3]


            }


        }


        //Total goals (Away)
        if (tag == (nparser.total_goals_tag + '(.' + nparser.clean(game.away.toLowerCase()) + ')' )) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 4)) {
                temp_data['odds.team_total_goals.away.0.sb.value'] = odds[0];
                temp_data['odds.team_total_goals.away.1.sb.value'] = odds[1];
                temp_data['odds.team_total_goals.away.2.sb.value'] = odds[2];
                temp_data['odds.team_total_goals.away.3+.sb.value'] = odds[3]


            }


        }

        //Correct Score
        if (tag == (nparser.correct_score_tag )) {
            var val = nparser.parse_op_with_keys($(this).parent().next(), $);

            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score.' + nparser.clean_symbols(val.keys[i]) + '.sb.value'] = val.odds[i];
            }

        }

        //Correct Score First Half
        if (tag == (nparser.correct_score_first_half_tag )) {
            var val = nparser.parse_op_with_keys($(this).parent().next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score_half.' + nparser.clean_symbols(val.keys[i])+'.sb.value']  = val.odds[i];

                if (obj != undefined) {
                    //obj.sb.value = val.odds[i];                 }
                }
            }
        }


        //Correct Score Second Half
        if (tag == (nparser.correct_score_second_half_tag )) {
            var val = nparser.parse_op_with_keys($(this).parent().next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score_half_2.' + nparser.clean_symbols(val.keys[i])+'.sb.value']  = val.odds[i];

                if (obj != undefined) {
                    //obj.sb.value = val.odds[i];                 }
                }
            }
        }

        //Ten Minutes Result
        if (tag == nparser.ten_minutes_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.ten_mins.1.sb.value'] = odds[0];
                temp_data['odds.ten_mins.x.sb.value'] = odds[1];
                temp_data['odds.ten_mins.2.sb.value'] = odds[2]


            }

        }


        //Most Scoring Half (Home)
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.most_scoring_half_tag)) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.home_most_scoring_half.half.sb.value'] = odds[0];
                temp_data['odds.home_most_scoring_half.half_2.sb.value'] = odds[1];
                temp_data['odds.home_most_scoring_half.equal.sb.value'] = odds[2]


            }


        }
        //Most Scoring Half (Away)
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.most_scoring_half_tag)) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.away_most_scoring_half.half.sb.value'] = odds[0];
                temp_data['odds.away_most_scoring_half.half_2.sb.value'] = odds[1];
                temp_data['odds.away_most_scoring_half.equal.sb.value'] = odds[2]


            }

        }


        //Home clean sheet
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.clean_sheet_tag)) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.home_clean_sheet.yes.sb.value'] = odds[0];
                temp_data['odds.home_clean_sheet.no.sb.value'] = odds[1]


            }


        }

        //Away clean sheet
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.clean_sheet_tag)) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.away_clean_sheet.yes.sb.value'] = odds[0];
                temp_data['odds.away_clean_sheet.no.sb.value'] = odds[1]


            }

        }


        //Winning Margin
        if (tag == nparser.winning_margin_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 7)) {
                temp_data['odds.win_margin.home_1.sb.value'] = odds[0];
                temp_data['odds.win_margin.home_2.sb.value'] = odds[1];
                temp_data['odds.win_margin.home_3+.sb.value'] = odds[2];
                temp_data['odds.win_margin.away_1.sb.value'] = odds[3];
                temp_data['odds.win_margin.away_2.sb.value'] = odds[4];
                temp_data['odds.win_margin.away_3+.sb.value'] = odds[5];
                temp_data['odds.win_margin.x.sb.value'] = odds[6]


            }


        }


        //1X2 and Under/Over 0.5
        if (tag == nparser.result_and_under_over_0_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);

            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under0_5.sb.value'] = odds[0];
                temp_data['odds.home_win_over0_5.sb.value'] = odds[1];
                temp_data['odds.draw_under0_5.sb.value'] = odds[2];
                temp_data['odds.draw_over0_5.sb.value'] = odds[3];
                temp_data['odds.away_win_under0_5.sb.value'] = odds[4];
                temp_data['odds.away_win_over0_5.sb.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 1.5
        if (tag == nparser.result_and_under_over_1_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under1_5.sb.value'] = odds[0];
                temp_data['odds.home_win_over1_5.sb.value'] = odds[1];
                temp_data['odds.draw_under1_5.sb.value'] = odds[2];
                temp_data['odds.draw_over1_5.sb.value'] = odds[3];
                temp_data['odds.away_win_under1_5.sb.value'] = odds[4];
                temp_data['odds.away_win_over1_5.sb.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 2.5
        if (tag == nparser.result_and_under_over_2_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under2_5.sb.value'] = odds[0];
                temp_data['odds.home_win_over2_5.sb.value'] = odds[1];
                temp_data['odds.draw_under2_5.sb.value'] = odds[2];
                temp_data['odds.draw_over2_5.sb.value'] = odds[3];
                temp_data['odds.away_win_under2_5.sb.value'] = odds[4];
                temp_data['odds.away_win_over2_5.sb.value'] = odds[5]


            }


        }

        //1X2 and Under/Over 3.5
        if (tag == nparser.result_and_under_over_3_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under3_5.sb.value'] = odds[0];
                temp_data['odds.home_win_over3_5.sb.value'] = odds[1];
                temp_data['odds.draw_under3_5.sb.value'] = odds[2];
                temp_data['odds.draw_over3_5.sb.value'] = odds[3];
                temp_data['odds.away_win_under3_5.sb.value'] = odds[4];
                temp_data['odds.away_win_over3_5.sb.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 4.5
        if (tag == nparser.result_and_under_over_4_5_tag) {
            odds = nparser.parse_basic_op($(this).parent().next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under4_5.sb.value'] = odds[0];
                temp_data['odds.home_win_over4_5.sb.value'] = odds[1];
                temp_data['odds.draw_under4_5.sb.value'] = odds[2];
                temp_data['odds.draw_over4_5.sb.value'] = odds[3];
                temp_data['odds.away_win_under4_5.sb.value'] = odds[4];
                temp_data['odds.away_win_over4_5.sb.value'] = odds[5]


            }


        }

        //Number of Goals
        if (tag == (nparser.number_of_goals_tag )) {
            var val = nparser.parse_op_with_keys($(this).parent().next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.number_of_goals.' + nparser.clean(val.keys[i])+'.sb.value']  = val.odds[i];

                if (obj != undefined) {
                    //obj.sb.value = val.odds[i];                 }
                }
            }
        }


        if(tag.trim() != '')
        {
            temp_data['play_codes.'+ tag + '.sb'] = game_code;
        }


    });

    var query = {'timestamp': game.timestamp,

        $or:[
            {'id': game.id},
            {'sorted_id': game.sorted_id},
            {'home': game.home},
            {'away': game.away},

            {'id': {$regex: (  game.id )}},
            {'home': {$regex: (  game.home_key )}},
            {'away': {$regex: (  game.away_key )}},
            {'sorted_id': {$regex: (  game.sorted_id  )}},
            {'id': {$regex: (  helper.clean_symbols(game.home).toLowerCase()  )}},
            {'id': {$regex: (  helper.clean_symbols(game.away).toLowerCase() )}}

        ]}


      //console.log(temp_data);
    process.nextTick(function()
    {
        db.update(query, {$set: temp_data},
            function (err, count, status) {
                if (err)
                    console.log(err);
                else
                {
                    console.log('[DB SAVED] GAME-ID: '+ game.id +' COUNT: ' + count );
                    //console.log('[DATA]: ' + JSON.stringify(temp_data));

                }
                temp_data = null;
                query = null;
            });
    })


    root = null;
    global.gc();


    //return game;

   
     //nparser = null;
     //helper = null;
     root = null;
    //return game;
}


SurebetParser.prototype.getGames = function ($, data) {

    var nparser = require('../betobjects/surebet').getSurebetObject();

    var helper = require('../helpers/misc');

    var current_cat = undefined;

    $('#betsTable').children().each(function (index, elem) {



        if ($('#categoryTitlePanel', this).length) {
            var child = $('#categoryTitlePanel', this);
            var category = { title: '', key: '', games: {}}

            category.title = $('#categoryText', child).text().trim();
            category.key = helper.generateGameCategoryKey(category.title);

            category.type = category.title.split('-')[0].trim().toLowerCase();
            current_cat = category;

            data.categories[current_cat.key] = current_cat;

        }
        else {

            if(current_cat != undefined && !helper.is_allowed_type(current_cat.type))
                return;

            if ($('.category_bets',this).length > 0) {

                var game = require('../constants').newGame().game;
                var vars = $('.category_outcome', this).eq(0).attr('onclick').replace(/'/g, '').split(',');


                game.datetime = $('#betDateText', this).eq(0).text() + " " + $('#betDateText', this).eq(1).text() ;


                game.timestamp = helper.getTimestamp(game.datetime);
                game.expireAt =  new Date(game.timestamp);

                //game.time = vars[3];

                game.title = vars[2].trim();
                game.id = helper.generateGameID(game.title)

                var sides = vars[2].split('-');
                game.home = sides[0].trim();
                game.away = sides[1].trim();
                game.home_key = helper.getSignificantKey(game.home);
                game.away_key = helper.getSignificantKey(game.away);


                //console.log(game.datetime);
                //TODO  Please don't rely on structure of the website.. use IDs  or ClASS to get Game URLS

                var vars2 = $('input[type="button"]', this).eq(0).attr('onclick');

                if (vars2 != undefined) {
                    game.url = vars2.split("'")[1];
                }
                game.date = game.datetime.split(" ")[0];
                game.time = game.datetime.split(" ")[1];


                if (current_cat != undefined)
                    game.category_key = current_cat.key;

                data.games.push(game);

            }
        }


    });

    nparser = null;
    helper = null;
    root = null;


}


SurebetParser.prototype.getMatchDays = function ($, data) {
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

SurebetParser.prototype.getMockMatchDays = function ($, data) {


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


exports.getSurebetParser = function () {
    return new SurebetParser();
}

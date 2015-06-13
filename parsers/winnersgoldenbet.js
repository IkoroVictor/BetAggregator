/**
 * Created by olaokenyi on 5/10/15.
 */

var nparser = require('../betobjects/winnersgoldenbet').getWGBObject();
var helper = require('../helpers/misc');

function WGBParser() {

}

WGBParser.prototype.getGameOdds = function ($, game, db) {



    var match_title = $('.event-name', '.event-wrap').text();
    var match_time = $('.event-start', '.event-wrap').text();


    game.time = match_time;
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

    $('.game-wrap', '.event-wrap').each(function (indx, elem) {
        var tag = ''
        var game_code = '';
        var temp = $('.game-title', this);

        if(temp.length)
        {
            t = temp.text().split('(');
            tag = nparser.clean_symbols(t[0].toLowerCase());
            game_code = t[1].split(')')[0];
        }

        obj = undefined;
        //parse straight_win
        if (tag == nparser.straight_win_tag) {
            var odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data["odds.1.wgb.value"] = odds[0];
                temp_data["odds.x.wgb.value"] = odds[1];
                temp_data["odds.2.wgb.value"] = odds[2];
            }


        }

        //Handicap 0:1
        if (tag == nparser.handicap_0_1_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_0_1_1.wgb.value'] = odds[0];
                temp_data['odds.handicap_0_1_x.wgb.value'] = odds[1];
                temp_data['odds.handicap_0_1_2.wgb.value'] = odds[2]
            }

        }

        //Handicap 0:2
        if (tag == nparser.handicap_0_2_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_0_2_1.wgb.value'] = odds[0];
                temp_data['odds.handicap_0_2_x.wgb.value'] = odds[1];
                temp_data['odds.handicap_0_2_2.wgb.value'] = odds[2]
            }


        }

        //Handicap 1:0
        if (tag == nparser.handicap_1_0_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_1_0_1.wgb.value'] = odds[0];
                temp_data['odds.handicap_1_0_x.wgb.value'] = odds[1];
                temp_data['odds.handicap_1_0_2.wgb.value'] = odds[2]
            }


        }

        //Handicap 2:0
        if (tag == nparser.handicap_2_0_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.handicap_2_0_1.wgb.value'] = odds[0];
                temp_data['odds.handicap_2_0_x.wgb.value'] = odds[1];
                temp_data['odds.handicap_2_0_2.wgb.value'] = odds[2]

            }


        }

        //Double chance
        if (tag == nparser.double_chance_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.1x.wgb.value'] = odds[0];
                temp_data['odds.12.wgb.value'] = odds[1];
                temp_data['odds.x2.wgb.value'] = odds[2]

            }

        }

        //Double chance 1st Half
        if (tag == nparser.double_chance_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1x_half.wgb.value'] = odds[0];
                temp_data['odds.12_half.wgb.value'] = odds[1];
                temp_data['odds.x2_half.wgb.value'] = odds[2]


            }

        }
        //Double chance 2nd Half
        if (tag == nparser.double_chance_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1x_half_2.wgb.value'] = odds[0];
                temp_data['odds.12_half_2.wgb.value'] = odds[1];
                temp_data['odds.x2_half_2.wgb.value'] = odds[2]

            }


        }
        //1st half result
        if (tag == nparser.first_half_result_tag) {
            odds = nparser.parse_basic_op($(this), $);


            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.1_half.wgb.value'] = odds[0];
                temp_data['odds.x_half.wgb.value'] = odds[1];
                temp_data['odds.2_half.wgb.value'] = odds[2]

            }


        }
        //2nd half result
        if (tag == nparser.second_half_result_tag) {
            odds = nparser.parse_basic_op($(this), $);


            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1_half_2.wgb.value'] = odds[0];
                temp_data['odds.x_half_2.wgb.value'] = odds[1];
                temp_data['odds.2_half_2.wgb.value'] = odds[2]
            }

        }

        //most scoring half
        if (tag == nparser.most_scoring_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.most_scoring_half.half.wgb.value'] = odds[0];
                temp_data['odds.most_scoring_half.half_2.wgb.value'] = odds[2];
                temp_data['odds.most_scoring_half.equal.wgb.value'] = odds[1]

            }


        }
        //To score first
        if (tag == nparser.to_score_first_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.first_goal.home.wgb.value'] = odds[0];
                temp_data['odds.first_goal.away.wgb.value'] = odds[2];
                temp_data['odds.first_goal.no_goal.wgb.value'] = odds[1]
            }

        }

        //To score Last
        if (tag == nparser.to_score_last_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.last_goal.home.wgb.value'] = odds[0];
                temp_data['odds.last_goal.away.wgb.value'] = odds[2];
                temp_data['odds.last_goal.no_goal.wgb.value'] = odds[1]
            }

        }


        //First Goal Time
        if (tag == nparser.first_goal_time_tag) {
            var val = nparser.parse_op_with_keys($(this), $);
            try {
                temp_data = {};
                for (var i = 0; i < val.odds.length; i++) {
                    temp_data['odds.first_goal_time.' + nparser.clean(val.keys[i]).toLowerCase() + '.wgb.value'] = val.odds[i];
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

                temp_data['odds.draw_no_bet.home.wgb.value'] = odds[0];
                temp_data['odds.draw_no_bet.away.wgb.value'] = odds[1]

            }


        }

        //Draw No Bet First Half
        if (tag == nparser.draw_no_bet_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);


            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.draw_no_bet_half.home.wgb.value'] = odds[0];
                temp_data['odds.draw_no_bet_half.away.wgb.value'] = odds[1]

            }


        }

        //Draw No Bet Second Half
        if (tag == nparser.draw_no_bet_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.draw_no_bet_half_2.home.wgb.value'] = odds[0];
                temp_data['odds.draw_no_bet_half_2.away.wgb.value'] = odds[1]

            }
            //console.log(err);


        }

        //under/over0.5 first half
        if (tag == nparser.under_over_0_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5_half.wgb.value'] = odds[0];
                temp_data['odds.over0_5_half.wgb.value'] = odds[1]
            }


        }

        //under/over1.5 first half
        if (tag == nparser.under_over_1_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5_half.wgb.value'] = odds[0];
                temp_data['odds.over1_5_half.wgb.value'] = odds[1]

            }

        }

        //under/over2.5 first half
        if (tag == nparser.under_over_2_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5_half.wgb.value'] = odds[0];
                temp_data['odds.over2_5_half.wgb.value'] = odds[1]

            }

        }


        //under/over0.5 second half
        if (tag == nparser.under_over_0_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5_half_2.wgb.value'] = odds[0];
                temp_data['odds.over0_5_half_2.wgb.value'] = odds[1]

            }


        }

        //under/over1.5 second half
        if (tag == nparser.under_over_1_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5_half_2.wgb.value'] = odds[0];
                temp_data['odds.over1_5_half_2.wgb.value'] = odds[1]

            }


        }

        //under/over2.5 second half
        if (tag == nparser.under_over_2_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5_half_2.wgb.value'] = odds[0];
                temp_data['odds.over2_5_half_2.wgb.value'] = odds[1]

            }


        }

        //under/over0.5
        if (tag == nparser.under_over_0_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5.wgb.value'] = odds[0];
                temp_data['odds.over0_5.wgb.value'] = odds[1]

            }

        }

        //under/over1.5
        if (tag == nparser.under_over_1_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5.wgb.value'] = odds[0];
                temp_data['odds.over1_5.wgb.value'] = odds[1]

            }


        }
        //under/over2.5
        if (tag == nparser.under_over_2_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5.wgb.value'] = odds[0];
                temp_data['odds.over2_5.wgb.value'] = odds[1]

            }


        }
        //under/over3.5
        if (tag == nparser.under_over_3_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under3_5.wgb.value'] = odds[0];
                temp_data['odds.over3_5.wgb.value'] = odds[1]

            }


        }
        //under/over4.5
        if (tag == nparser.under_over_4_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under4_5.wgb.value'] = odds[0];
                temp_data['odds.over4_5.wgb.value'] = odds[1]

            }

        }
        //under/over5.5
        if (tag == nparser.under_over_5_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under5_5.wgb.value'] = odds[0];
                temp_data['odds.over5_5.wgb.value'] = odds[1]

            }


        }
        //under/over6.5
        if (tag == nparser.under_over_6_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under6_5.wgb.value'] = odds[0];
                temp_data['odds.over6_5.wgb.value'] = odds[1]

            }


        }
        //under/over7.5
        if (tag == nparser.under_over_7_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under7_5.wgb.value'] = odds[0];
                temp_data['odds.over7_5.wgb.value'] = odds[1]

            }


        }


        //Both teams to score
        if (tag == nparser.both_teams_to_score_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts.yes.wgb.value'] = odds[0];
                temp_data['odds.bts.no.wgb.value'] = odds[1]

            }


        }

        //Both teams to score first half
        if (tag == nparser.both_teams_to_score_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts_half.yes.wgb.value'] = odds[0];
                temp_data['odds.bts_half.no.wgb.value'] = odds[1]

            }


        }

        //Both teams to score second half
        if (tag == nparser.both_teams_to_score_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts_half_2.yes.wgb.value'] = odds[0];
                temp_data['odds.bts_half_2.no.wgb.value'] = odds[1]

            }


        }

        //Total Goals
        if (tag == nparser.total_goals_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals.odd.wgb.value'] = odds[0];
                temp_data['odds.total_goals.even.wgb.value'] = odds[1]

            }


        }
        //Total Goals First Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals_half.odd.wgb.value'] = odds[0];
                temp_data['odds.total_goals_half.even.wgb.value'] = odds[1]

            }


        }

        //Total Goals Second Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_second_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals_half_2.odd.wgb.value'] = odds[0];
                temp_data['odds.total_goals_half_2.even.wgb.value'] = odds[1]

            }

        }


        //under/over0.5 Cards
        if (tag == nparser.under_over_0_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under0_5_card.wgb.value'] = odds[0];
                temp_data['odds.odds.over0_5_card.wgb.value'] = odds[1]

            }


        }

        //under/over1.5 Cards
        if (tag == nparser.under_over_1_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under_5_card.wgb.value'] = odds[0];
                temp_data['odds.odds.over1_5_card.wgb.value'] = odds[1]

            }


        }
        //under/over2.5 Cards
        if (tag == nparser.under_over_2_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under2_5_card.wgb.value'] = odds[0];
                temp_data['odds.odds.over2_5_card.wgb.value'] = odds[1]

            }

        }
        //under/over3.5 Cards
        if (tag == nparser.under_over_3_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under3_5_card.wgb.value'] = odds[0];
                temp_data['odds.odds.over3_5_card.wgb.value'] = odds[1]

            }


        }
        //under/over4.5 Cards
        if (tag == nparser.under_over_4_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under4_5_card.wgb.value'] = odds[0];
                temp_data['odds.odds.over4_5_card.wgb.value'] = odds[1]

            }


        }
        //under/over5.5 Cards
        if (tag == nparser.under_over_5_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under5_5_card.wgb.value'] = odds[0];
                temp_data['odds.odds.over5_5_card.wgb.value'] = odds[1]

            }

        }
        //under/over6.5 Cards
        if (tag == nparser.under_over_6_5_cards_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under6_5_card.wgb.value'] = odds[0];
                temp_data['odds.odds.over6_5_card.wgb.value'] = odds[1]

            }

        }


        //under/over0.5 Cards First Half
        if (tag == nparser.under_over_0_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under0_5_card_half.wgb.value'] = odds[0];
                temp_data['odds.odds.over0_5_card_half.wgb.value'] = odds[1]

            }

        }

        //under/over1.5 Cards First Half
        if (tag == nparser.under_over_1_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under1_5_card_half.wgb.value'] = odds[0];
                temp_data['odds.odds.over1_5_card_half.wgb.value'] = odds[1]

            }


        }
        //under/over2.5 Cards First Half
        if (tag == nparser.under_over_2_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under2_5_card_half.wgb.value'] = odds[0];
                temp_data['odds.odds.over2_5_card_half.wgb.value'] = odds[1]

            }

        }

        //under/over3.5 Cards First Half
        if (tag == nparser.under_over_3_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under3_5_card_half.wgb.value'] = odds[0];
                temp_data['odds.odds.over3_5_card_half.wgb.value'] = odds[1]

            }


        }

        //Halftime/Fulltime
        if (tag == nparser.halftime_fulltime_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 9)) {
                temp_data['odds.halftime_fulltime.home_home.wgb.value'] = odds[0];
                temp_data['odds.halftime_fulltime.home_x.wgb.value'] = odds[1];
                temp_data['odds.halftime_fulltime.home_away.wgb.value'] = odds[2];
                temp_data['odds.halftime_fulltime.x_home.wgb.value'] = odds[3];
                temp_data['odds.halftime_fulltime.x_x.wgb.value'] = odds[4];
                temp_data['odds.halftime_fulltime.x_away.wgb.value'] = odds[5];
                temp_data['odds.halftime_fulltime.away_home.wgb.value'] = odds[6];
                temp_data['odds.halftime_fulltime.away_x.wgb.value'] = odds[7];
                temp_data['odds.halftime_fulltime.away_away.wgb.value'] = odds[8]

            }


        }

        //Total goals (Home)
        if (tag == (nparser.total_goals_tag + '(.' + nparser.clean(game.home.toLowerCase()) + ')' )) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 4)) {
                temp_data['odds.team_total_goals.home.0.wgb.value'] = odds[0];
                temp_data['odds.team_total_goals.home.1.wgb.value'] = odds[1];
                temp_data['odds.team_total_goals.home.2.wgb.value'] = odds[2];
                temp_data['odds.team_total_goals.home.3+.wgb.value'] = odds[3]


            }


        }


        //Total goals (Away)
        if (tag == (nparser.total_goals_tag + '(.' + nparser.clean(game.away.toLowerCase()) + ')' )) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 4)) {
                temp_data['odds.team_total_goals.away.0.wgb.value'] = odds[0];
                temp_data['odds.team_total_goals.away.1.wgb.value'] = odds[1];
                temp_data['odds.team_total_goals.away.2.wgb.value'] = odds[2];
                temp_data['odds.team_total_goals.away.3+.wgb.value'] = odds[3]


            }


        }

        //Correct Score
        if (tag == (nparser.correct_score_tag )) {
            var val = nparser.parse_op_with_keys($(this), $);

            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score.' + nparser.clean_symbols(val.keys[i]) + '.wgb.value'] = val.odds[i];
            }

        }

        //Correct Score First Half
        if (tag == (nparser.correct_score_first_half_tag )) {
            var val = nparser.parse_op_with_keys($(this), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score_half.' + nparser.clean_symbols(val.keys[i])+'.wgb.value']  = val.odds[i];

                if (obj != undefined) {
                    //obj.wgb.value = val.odds[i];                 }
                }
            }
        }


        //Correct Score Second Half
        if (tag == (nparser.correct_score_second_half_tag )) {
            var val = nparser.parse_op_with_keys($(this), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score_half_2.' + nparser.clean_symbols(val.keys[i])+'.wgb.value']  = val.odds[i];

                if (obj != undefined) {
                    //obj.wgb.value = val.odds[i];                 }
                }
            }
        }

        //Ten Minutes Result
        if (tag == nparser.ten_minutes_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.ten_mins.1.wgb.value'] = odds[0];
                temp_data['odds.ten_mins.x.wgb.value'] = odds[1];
                temp_data['odds.ten_mins.2.wgb.value'] = odds[2]


            }

        }


        //Most Scoring Half (Home)
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.most_scoring_half_tag)) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.home_most_scoring_half.half.wgb.value'] = odds[0];
                temp_data['odds.home_most_scoring_half.half_2.wgb.value'] = odds[1];
                temp_data['odds.home_most_scoring_half.equal.wgb.value'] = odds[2]


            }


        }
        //Most Scoring Half (Away)
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.most_scoring_half_tag)) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.away_most_scoring_half.half.wgb.value'] = odds[0];
                temp_data['odds.away_most_scoring_half.half_2.wgb.value'] = odds[1];
                temp_data['odds.away_most_scoring_half.equal.wgb.value'] = odds[2]


            }

        }


        //Home clean sheet
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.clean_sheet_tag)) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.home_clean_sheet.yes.wgb.value'] = odds[0];
                temp_data['odds.home_clean_sheet.no.wgb.value'] = odds[1]


            }


        }

        //Away clean sheet
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.clean_sheet_tag)) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.away_clean_sheet.yes.wgb.value'] = odds[0];
                temp_data['odds.away_clean_sheet.no.wgb.value'] = odds[1]


            }

        }


        //Winning Margin
        if (tag == nparser.winning_margin_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 7)) {
                temp_data['odds.win_margin.home_1.wgb.value'] = odds[0];
                temp_data['odds.win_margin.home_2.wgb.value'] = odds[1];
                temp_data['odds.win_margin.home_3+.wgb.value'] = odds[2];
                temp_data['odds.win_margin.away_1.wgb.value'] = odds[3];
                temp_data['odds.win_margin.away_2.wgb.value'] = odds[4];
                temp_data['odds.win_margin.away_3+.wgb.value'] = odds[5];
                temp_data['odds.win_margin.x.wgb.value'] = odds[6]


            }


        }


        //1X2 and Under/Over 0.5
        if (tag == nparser.result_and_under_over_0_5_tag) {
            odds = nparser.parse_basic_op($(this), $);

            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under0_5.wgb.value'] = odds[0];
                temp_data['odds.home_win_over0_5.wgb.value'] = odds[1];
                temp_data['odds.draw_under0_5.wgb.value'] = odds[2];
                temp_data['odds.draw_over0_5.wgb.value'] = odds[3];
                temp_data['odds.away_win_under0_5.wgb.value'] = odds[4];
                temp_data['odds.away_win_over0_5.wgb.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 1.5
        if (tag == nparser.result_and_under_over_1_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under1_5.wgb.value'] = odds[0];
                temp_data['odds.home_win_over1_5.wgb.value'] = odds[1];
                temp_data['odds.draw_under1_5.wgb.value'] = odds[2];
                temp_data['odds.draw_over1_5.wgb.value'] = odds[3];
                temp_data['odds.away_win_under1_5.wgb.value'] = odds[4];
                temp_data['odds.away_win_over1_5.wgb.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 2.5
        if (tag == nparser.result_and_under_over_2_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under2_5.wgb.value'] = odds[0];
                temp_data['odds.home_win_over2_5.wgb.value'] = odds[1];
                temp_data['odds.draw_under2_5.wgb.value'] = odds[2];
                temp_data['odds.draw_over2_5.wgb.value'] = odds[3];
                temp_data['odds.away_win_under2_5.wgb.value'] = odds[4];
                temp_data['odds.away_win_over2_5.wgb.value'] = odds[5]


            }


        }

        //1X2 and Under/Over 3.5
        if (tag == nparser.result_and_under_over_3_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under3_5.wgb.value'] = odds[0];
                temp_data['odds.home_win_over3_5.wgb.value'] = odds[1];
                temp_data['odds.draw_under3_5.wgb.value'] = odds[2];
                temp_data['odds.draw_over3_5.wgb.value'] = odds[3];
                temp_data['odds.away_win_under3_5.wgb.value'] = odds[4];
                temp_data['odds.away_win_over3_5.wgb.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 4.5
        if (tag == nparser.result_and_under_over_4_5_tag) {
            odds = nparser.parse_basic_op($(this), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under4_5.wgb.value'] = odds[0];
                temp_data['odds.home_win_over4_5.wgb.value'] = odds[1];
                temp_data['odds.draw_under4_5.wgb.value'] = odds[2];
                temp_data['odds.draw_over4_5.wgb.value'] = odds[3];
                temp_data['odds.away_win_under4_5.wgb.value'] = odds[4];
                temp_data['odds.away_win_over4_5.wgb.value'] = odds[5]


            }


        }

        //Number of Goals
        if (tag == (nparser.number_of_goals_tag )) {
            var val = nparser.parse_op_with_keys($(this), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.number_of_goals.' + nparser.clean(val.keys[i])+'.wgb.value']  = val.odds[i];

                if (obj != undefined) {
                    //obj.wgb.value = val.odds[i];                 }
                }
            }
        }

        if(tag.trim() != '')
        {
            temp_data['play_codes.'+ tag + '.wgb'] = game_code;
        }


    });



       var query = {'timestamp': game.timestamp,

        $or:[
            {'id': game.id},
            {'sorted_id': game.sorted_id},
            {'home': game.home},
            {'away': game.away},

            {'id': {$regex: (  game.id )}},
            {'sorted_id': {$regex: (  game.sorted_id  )}},
            {'id': {$regex: (  helper.clean_symbols(game.home)  )}},
            {'id': {$regex: (  helper.clean_symbols(game.away) )}}

        ]}

    process.nextTick(function()
    {
        db.update(query, {$set: temp_data},
            function (err, count, status) {
                if (err)
                    console.log(err);
                else
                {
                    console.log('[DB SAVED] STATUS: '+ status+' COUNT: ' + count );
                    //console.log('[DATA]: ' + JSON.stringify(temp_data));

                }
                temp_data = null;
                query = null;
            });
    })


    root = null;
    global.gc();


    //return game;


}

WGBParser.prototype.getGames = function ($, data) {

    //TODO: Implement code to extract game categories.

    var current_cat = undefined;

    $('.event-panel').each( function(index, elem)
    {

        var game = require('../constants').newGame().game;
        var vars = $('.event-name', this).eq(0).text();


        game.datetime = $('.event-date', this).eq(0).text();

        game.timestamp = helper.getTimestamp(game.datetime);

        game.title = vars.trim();
        game.id = helper.generateGameID(game.title)

        var sides = vars.split('-');
        game.home = sides[0].trim();
        game.away = sides[1].trim();


        //console.log(game.datetime);
        //TODO  Please don't rely on structure of the website.. use IDs  or ClASS to get Game URLS

        var vars2 = $('.full-event-button', this).attr('onclick');

        if (vars2 != undefined) {
            game.url = vars2.split("'")[1];
        }
        game.date = game.datetime.split(" ")[0];
        game.time = game.datetime.split(" ")[1];


        if (typeof current_cat  != "undefined")
            game.category_key = current_cat.key;

        data.games.push(game);



    });




    root = null;
    global.gc();


}


WGBParser.prototype.getMatchDays = function ($, data) {
    $('.sb-dropdown-option').each(function (index, elem) {
        var date = $(this).attr('data-option-key').trim();
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

WGBParser.prototype.getMockMatchDays = function ($, data) {


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


exports.getWGBParser = function () {
    return new WGBParser();
}

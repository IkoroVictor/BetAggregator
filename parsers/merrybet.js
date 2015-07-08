/**
 * Created by olaokenyi on 5/10/15.
 */
var constants = require('../constants')

function MerrybetParser() {

}

MerrybetParser.prototype.getGameOdds = function ($, game, db) {

    var nparser = require('../betobjects/merrybet').getMerrybetObject();
    var helper = require('../helpers/misc');
    var root = $('#betsTable');

    var match_title = $('#eventTitleText', root).text();
    var match_time = $('#eventStartText', root).text();


    game.time = match_time;
    game.title = match_title;

    try {
        game.id = helper.generateGameID(game.title)
        game.sorted_id = helper.generateSortedGameID(game.title)
        game.home = match_title.split('-')[0].trim();
        game.away = match_title.split('-')[1].trim();
    }
    catch (ex) {
        console.log(ex);
    }

    var temp_data = {};

    $('#betsTable').children().each(function (indx, elem) {

        var tag = ''
        var game_code = '';
        var temp = $('#gameNameText', this);

        var outcomes_ids =  nparser.parse_outcome_ids($(this).next(), $);

        if (temp.length) {
            t = temp.text().split('(');
            tag = nparser.clean_symbols(t[0].toLowerCase());
            game_code = t[1].split(')')[0];
        }


        //parse straight_win
        if (tag == nparser.straight_win_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data["odds.1.mb.value"] = odds[0];
                temp_data["odds.x.mb.value"] = odds[1];
                temp_data["odds.2.mb.value"] = odds[2];
                temp_data["odds.1.mb.outcome_id"] = outcomes_ids[0];
                temp_data["odds.x.mb.outcome_id"] = outcomes_ids[1];
                temp_data["odds.2.mb.outcome_id"] = outcomes_ids[2];
            }


        }

        //Handicap 0:1
        if (tag == nparser.handicap_0_1_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_0_1_1.mb.value'] = odds[0];
                temp_data['odds.handicap_0_1_x.mb.value'] = odds[1];
                temp_data['odds.handicap_0_1_2.mb.value'] = odds[2]
            }

        }

        //Handicap 0:2
        if (tag == nparser.handicap_0_2_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_0_2_1.mb.value'] = odds[0];
                temp_data['odds.handicap_0_2_x.mb.value'] = odds[1];
                temp_data['odds.handicap_0_2_2.mb.value'] = odds[2]
            }


        }

        //Handicap 1:0
        if (tag == nparser.handicap_1_0_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_1_0_1.mb.value'] = odds[0];
                temp_data['odds.handicap_1_0_x.mb.value'] = odds[1];
                temp_data['odds.handicap_1_0_2.mb.value'] = odds[2]
            }


        }

        //Handicap 2:0
        if (tag == nparser.handicap_2_0_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.handicap_2_0_1.mb.value'] = odds[0];
                temp_data['odds.handicap_2_0_x.mb.value'] = odds[1];
                temp_data['odds.handicap_2_0_2.mb.value'] = odds[2]

            }


        }

        //Double chance
        if (tag == nparser.double_chance_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.1x.mb.value'] = odds[0];
                temp_data['odds.12.mb.value'] = odds[1];
                temp_data['odds.x2.mb.value'] = odds[2]

            }

        }

        //Double chance 1st Half
        if (tag == nparser.double_chance_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1x_half.mb.value'] = odds[0];
                temp_data['odds.12_half.mb.value'] = odds[1];
                temp_data['odds.x2_half.mb.value'] = odds[2]


            }

        }
        //Double chance 2nd Half
        if (tag == nparser.double_chance_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1x_half_2.mb.value'] = odds[0];
                temp_data['odds.12_half_2.mb.value'] = odds[1];
                temp_data['odds.x2_half_2.mb.value'] = odds[2]

            }


        }
        //1st half result
        if (tag == nparser.first_half_result_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);


            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.1_half.mb.value'] = odds[0];
                temp_data['odds.x_half.mb.value'] = odds[1];
                temp_data['odds.2_half.mb.value'] = odds[2]

            }


        }
        //2nd half result
        if (tag == nparser.second_half_result_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);


            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1_half_2.mb.value'] = odds[0];
                temp_data['odds.x_half_2.mb.value'] = odds[1];
                temp_data['odds.2_half_2.mb.value'] = odds[2]
            }

        }

        //most scoring half
        if (tag == nparser.most_scoring_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.most_scoring_half.half.mb.value'] = odds[0];
                temp_data['odds.most_scoring_half.half_2.mb.value'] = odds[2];
                temp_data['odds.most_scoring_half.equal.mb.value'] = odds[1]

            }


        }
        //To score first
        if (tag == nparser.to_score_first_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.first_goal.home.mb.value'] = odds[0];
                temp_data['odds.first_goal.away.mb.value'] = odds[2];
                temp_data['odds.first_goal.no_goal.mb.value'] = odds[1]
            }

        }

        //To score Last
        if (tag == nparser.to_score_last_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.last_goal.home.mb.value'] = odds[0];
                temp_data['odds.last_goal.away.mb.value'] = odds[2];
                temp_data['odds.last_goal.no_goal.mb.value'] = odds[1]
            }

        }


        //First Goal Time
        if (tag == nparser.first_goal_time_tag) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            try {

                for (var i = 0; i < val.odds.length; i++) {
                    temp_data['odds.first_goal_time.' + nparser.clean(val.keys[i]).toLowerCase() + '.mb.value'] = val.odds[i];
                }

            }
            catch (ex) {
                console.log(ex);
            }

        }

        //Draw No Bet
        if (tag == nparser.draw_no_bet_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {

                temp_data['odds.draw_no_bet.home.mb.value'] = odds[0];
                temp_data['odds.draw_no_bet.away.mb.value'] = odds[1]

            }


        }

        //Draw No Bet First Half
        if (tag == nparser.draw_no_bet_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);


            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.draw_no_bet_half.home.mb.value'] = odds[0];
                temp_data['odds.draw_no_bet_half.away.mb.value'] = odds[1]

            }


        }

        //Draw No Bet Second Half
        if (tag == nparser.draw_no_bet_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.draw_no_bet_half_2.home.mb.value'] = odds[0];
                temp_data['odds.draw_no_bet_half_2.away.mb.value'] = odds[1]

            }
            //console.log(err);


        }

        //under/over0.5 first half
        if (tag == nparser.under_over_0_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5_half.mb.value'] = odds[0];
                temp_data['odds.over0_5_half.mb.value'] = odds[1]
            }


        }

        //under/over1.5 first half
        if (tag == nparser.under_over_1_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5_half.mb.value'] = odds[0];
                temp_data['odds.over1_5_half.mb.value'] = odds[1]

            }

        }

        //under/over2.5 first half
        if (tag == nparser.under_over_2_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5_half.mb.value'] = odds[0];
                temp_data['odds.over2_5_half.mb.value'] = odds[1]

            }

        }


        //under/over0.5 second half
        if (tag == nparser.under_over_0_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5_half_2.mb.value'] = odds[0];
                temp_data['odds.over0_5_half_2.mb.value'] = odds[1]

            }


        }

        //under/over1.5 second half
        if (tag == nparser.under_over_1_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5_half_2.mb.value'] = odds[0];
                temp_data['odds.over1_5_half_2.mb.value'] = odds[1]

            }


        }

        //under/over2.5 second half
        if (tag == nparser.under_over_2_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5_half_2.mb.value'] = odds[0];
                temp_data['odds.over2_5_half_2.mb.value'] = odds[1]

            }


        }

        //under/over0.5
        if (tag == nparser.under_over_0_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5.mb.value'] = odds[0];
                temp_data['odds.over0_5.mb.value'] = odds[1]

            }

        }

        //under/over1.5
        if (tag == nparser.under_over_1_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5.mb.value'] = odds[0];
                temp_data['odds.over1_5.mb.value'] = odds[1]

            }


        }
        //under/over2.5
        if (tag == nparser.under_over_2_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5.mb.value'] = odds[0];
                temp_data['odds.over2_5.mb.value'] = odds[1]

            }


        }
        //under/over3.5
        if (tag == nparser.under_over_3_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under3_5.mb.value'] = odds[0];
                temp_data['odds.over3_5.mb.value'] = odds[1]

            }


        }
        //under/over4.5
        if (tag == nparser.under_over_4_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under4_5.mb.value'] = odds[0];
                temp_data['odds.over4_5.mb.value'] = odds[1]

            }

        }
        //under/over5.5
        if (tag == nparser.under_over_5_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under5_5.mb.value'] = odds[0];
                temp_data['odds.over5_5.mb.value'] = odds[1]

            }


        }
        //under/over6.5
        if (tag == nparser.under_over_6_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under6_5.mb.value'] = odds[0];
                temp_data['odds.over6_5.mb.value'] = odds[1]

            }


        }
        //under/over7.5
        if (tag == nparser.under_over_7_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under7_5.mb.value'] = odds[0];
                temp_data['odds.over7_5.mb.value'] = odds[1]

            }


        }


        //Both teams to score
        if (tag == nparser.both_teams_to_score_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts.yes.mb.value'] = odds[0];
                temp_data['odds.bts.no.mb.value'] = odds[1]

            }


        }

        //Both teams to score first half
        if (tag == nparser.both_teams_to_score_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts_half.yes.mb.value'] = odds[0];
                temp_data['odds.bts_half.no.mb.value'] = odds[1]

            }


        }

        //Both teams to score second half
        if (tag == nparser.both_teams_to_score_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts_half_2.yes.mb.value'] = odds[0];
                temp_data['odds.bts_half_2.no.mb.value'] = odds[1]

            }


        }

        //Total Goals
        if (tag == nparser.total_goals_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals.odd.mb.value'] = odds[0];
                temp_data['odds.total_goals.even.mb.value'] = odds[1]

            }


        }
        //Total Goals First Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals_half.odd.mb.value'] = odds[0];
                temp_data['odds.total_goals_half.even.mb.value'] = odds[1]

            }


        }

        //Total Goals Second Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals_half_2.odd.mb.value'] = odds[0];
                temp_data['odds.total_goals_half_2.even.mb.value'] = odds[1]

            }

        }


        //under/over0.5 Cards
        if (tag == nparser.under_over_0_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under0_5_card.mb.value'] = odds[0];
                temp_data['odds.odds.over0_5_card.mb.value'] = odds[1]

            }


        }

        //under/over1.5 Cards
        if (tag == nparser.under_over_1_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under_5_card.mb.value'] = odds[0];
                temp_data['odds.odds.over1_5_card.mb.value'] = odds[1]

            }


        }
        //under/over2.5 Cards
        if (tag == nparser.under_over_2_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under2_5_card.mb.value'] = odds[0];
                temp_data['odds.odds.over2_5_card.mb.value'] = odds[1]

            }

        }
        //under/over3.5 Cards
        if (tag == nparser.under_over_3_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under3_5_card.mb.value'] = odds[0];
                temp_data['odds.odds.over3_5_card.mb.value'] = odds[1]

            }


        }
        //under/over4.5 Cards
        if (tag == nparser.under_over_4_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under4_5_card.mb.value'] = odds[0];
                temp_data['odds.odds.over4_5_card.mb.value'] = odds[1]

            }


        }
        //under/over5.5 Cards
        if (tag == nparser.under_over_5_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under5_5_card.mb.value'] = odds[0];
                temp_data['odds.odds.over5_5_card.mb.value'] = odds[1]

            }

        }
        //under/over6.5 Cards
        if (tag == nparser.under_over_6_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under6_5_card.mb.value'] = odds[0];
                temp_data['odds.odds.over6_5_card.mb.value'] = odds[1]

            }

        }


        //under/over0.5 Cards First Half
        if (tag == nparser.under_over_0_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under0_5_card_half.mb.value'] = odds[0];
                temp_data['odds.odds.over0_5_card_half.mb.value'] = odds[1]

            }

        }

        //under/over1.5 Cards First Half
        if (tag == nparser.under_over_1_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under1_5_card_half.mb.value'] = odds[0];
                temp_data['odds.odds.over1_5_card_half.mb.value'] = odds[1]

            }


        }
        //under/over2.5 Cards First Half
        if (tag == nparser.under_over_2_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under2_5_card_half.mb.value'] = odds[0];
                temp_data['odds.odds.over2_5_card_half.mb.value'] = odds[1]

            }

        }

        //under/over3.5 Cards First Half
        if (tag == nparser.under_over_3_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under3_5_card_half.mb.value'] = odds[0];
                temp_data['odds.odds.over3_5_card_half.mb.value'] = odds[1]

            }


        }

        //Halftime/Fulltime
        if (tag == nparser.halftime_fulltime_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 9)) {
                temp_data['odds.halftime_fulltime.home_home.mb.value'] = odds[0];
                temp_data['odds.halftime_fulltime.home_x.mb.value'] = odds[1];
                temp_data['odds.halftime_fulltime.home_away.mb.value'] = odds[2];
                temp_data['odds.halftime_fulltime.x_home.mb.value'] = odds[3];
                temp_data['odds.halftime_fulltime.x_x.mb.value'] = odds[4];
                temp_data['odds.halftime_fulltime.x_away.mb.value'] = odds[5];
                temp_data['odds.halftime_fulltime.away_home.mb.value'] = odds[6];
                temp_data['odds.halftime_fulltime.away_x.mb.value'] = odds[7];
                temp_data['odds.halftime_fulltime.away_away.mb.value'] = odds[8]

            }


        }

        //Total goals (Home)
        if (tag == (nparser.total_goals_tag + '(.' + nparser.clean(game.home.toLowerCase()) + ')' )) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 4)) {
                temp_data['odds.team_total_goals.home.0.mb.value'] = odds[0];
                temp_data['odds.team_total_goals.home.1.mb.value'] = odds[1];
                temp_data['odds.team_total_goals.home.2.mb.value'] = odds[2];
                temp_data['odds.team_total_goals.home.3+.mb.value'] = odds[3]


            }


        }


        //Total goals (Away)
        if (tag == (nparser.total_goals_tag + '(.' + nparser.clean(game.away.toLowerCase()) + ')' )) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 4)) {
                temp_data['odds.team_total_goals.away.0.mb.value'] = odds[0];
                temp_data['odds.team_total_goals.away.1.mb.value'] = odds[1];
                temp_data['odds.team_total_goals.away.2.mb.value'] = odds[2];
                temp_data['odds.team_total_goals.away.3+.mb.value'] = odds[3]


            }


        }

        //Correct Score
        if (tag == (nparser.correct_score_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);

            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score.' + nparser.clean_symbols(val.keys[i]) + '.mb.value'] = val.odds[i];
            }

        }

        //Correct Score First Half
        if (tag == (nparser.correct_score_first_half_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score_half.' + nparser.clean_symbols(val.keys[i]) + '.mb.value'] = val.odds[i];

                if (obj != undefined) {
                    //obj.mb.value = val.odds[i];                 }
                }
            }
        }


        //Correct Score Second Half
        if (tag == (nparser.correct_score_second_half_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score_half_2.' + nparser.clean_symbols(val.keys[i]) + '.mb.value'] = val.odds[i];

                if (obj != undefined) {
                    //obj.mb.value = val.odds[i];                 }
                }
            }
        }

        //Ten Minutes Result
        if (tag == nparser.ten_minutes_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.ten_mins.1.mb.value'] = odds[0];
                temp_data['odds.ten_mins.x.mb.value'] = odds[1];
                temp_data['odds.ten_mins.2.mb.value'] = odds[2]


            }

        }


        //Most Scoring Half (Home)
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.most_scoring_half_tag)) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.home_most_scoring_half.half.mb.value'] = odds[0];
                temp_data['odds.home_most_scoring_half.half_2.mb.value'] = odds[1];
                temp_data['odds.home_most_scoring_half.equal.mb.value'] = odds[2]


            }


        }
        //Most Scoring Half (Away)
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.most_scoring_half_tag)) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.away_most_scoring_half.half.mb.value'] = odds[0];
                temp_data['odds.away_most_scoring_half.half_2.mb.value'] = odds[1];
                temp_data['odds.away_most_scoring_half.equal.mb.value'] = odds[2]


            }

        }


        //Home clean sheet
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.clean_sheet_tag)) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.home_clean_sheet.yes.mb.value'] = odds[0];
                temp_data['odds.home_clean_sheet.no.mb.value'] = odds[1]


            }


        }

        //Away clean sheet
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.clean_sheet_tag)) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.away_clean_sheet.yes.mb.value'] = odds[0];
                temp_data['odds.away_clean_sheet.no.mb.value'] = odds[1]


            }

        }


        //Winning Margin
        if (tag == nparser.winning_margin_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 7)) {
                temp_data['odds.win_margin.home_1.mb.value'] = odds[0];
                temp_data['odds.win_margin.home_2.mb.value'] = odds[1];
                temp_data['odds.win_margin.home_3+.mb.value'] = odds[2];
                temp_data['odds.win_margin.away_1.mb.value'] = odds[3];
                temp_data['odds.win_margin.away_2.mb.value'] = odds[4];
                temp_data['odds.win_margin.away_3+.mb.value'] = odds[5];
                temp_data['odds.win_margin.x.mb.value'] = odds[6]


            }


        }


        //1X2 and Under/Over 0.5
        if (tag == nparser.result_and_under_over_0_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under0_5.mb.value'] = odds[0];
                temp_data['odds.home_win_over0_5.mb.value'] = odds[1];
                temp_data['odds.draw_under0_5.mb.value'] = odds[2];
                temp_data['odds.draw_over0_5.mb.value'] = odds[3];
                temp_data['odds.away_win_under0_5.mb.value'] = odds[4];
                temp_data['odds.away_win_over0_5.mb.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 1.5
        if (tag == nparser.result_and_under_over_1_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under1_5.mb.value'] = odds[0];
                temp_data['odds.home_win_over1_5.mb.value'] = odds[1];
                temp_data['odds.draw_under1_5.mb.value'] = odds[2];
                temp_data['odds.draw_over1_5.mb.value'] = odds[3];
                temp_data['odds.away_win_under1_5.mb.value'] = odds[4];
                temp_data['odds.away_win_over1_5.mb.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 2.5
        if (tag == nparser.result_and_under_over_2_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under2_5.mb.value'] = odds[0];
                temp_data['odds.home_win_over2_5.mb.value'] = odds[1];
                temp_data['odds.draw_under2_5.mb.value'] = odds[2];
                temp_data['odds.draw_over2_5.mb.value'] = odds[3];
                temp_data['odds.away_win_under2_5.mb.value'] = odds[4];
                temp_data['odds.away_win_over2_5.mb.value'] = odds[5]


            }


        }

        //1X2 and Under/Over 3.5
        if (tag == nparser.result_and_under_over_3_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under3_5.mb.value'] = odds[0];
                temp_data['odds.home_win_over3_5.mb.value'] = odds[1];
                temp_data['odds.draw_under3_5.mb.value'] = odds[2];
                temp_data['odds.draw_over3_5.mb.value'] = odds[3];
                temp_data['odds.away_win_under3_5.mb.value'] = odds[4];
                temp_data['odds.away_win_over3_5.mb.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 4.5
        if (tag == nparser.result_and_under_over_4_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under4_5.mb.value'] = odds[0];
                temp_data['odds.home_win_over4_5.mb.value'] = odds[1];
                temp_data['odds.draw_under4_5.mb.value'] = odds[2];
                temp_data['odds.draw_over4_5.mb.value'] = odds[3];
                temp_data['odds.away_win_under4_5.mb.value'] = odds[4];
                temp_data['odds.away_win_over4_5.mb.value'] = odds[5]


            }


        }

        //Number of Goals
        if (tag == (nparser.number_of_goals_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.number_of_goals.' + nparser.clean(val.keys[i]) + '.mb.value'] = val.odds[i];

                if (obj != undefined) {
                    //obj.mb.value = val.odds[i];                 }
                }
            }
        }
        if (tag.trim() != '') {
            temp_data['play_codes.' + tag + '.mb'] = game_code;
        }


    });

    var query = {'timestamp': game.timestamp,

        $or: [
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

    process.nextTick(function () {
        db.update(query, {$set: temp_data},
            function (err, count, status) {
                if (err)
                    console.log(err);
                else {
                    //console.log('[DB SAVED] GAME-ID: ' + game.id + ' COUNT: ' + count);
                    //console.log('[DATA]: ' + JSON.stringify(temp_data));

                }
                temp_data = null;
            });
    })


    nparser = null;
    helper = null;
    root = null;
    global.gc();


}


MerrybetParser.prototype.getGames = function ($, data) {

    var nparser = require('../betobjects/merrybet').getMerrybetObject();

    var helper = require('../helpers/misc');

    var current_cat = undefined;

    $('#betsTable').children().each(function (index, elem) {

        if ($(this).attr('id') == 'categoryTitlePanel') {
            var child = $(this);
            var category = { title: '', games: {}}

            $('.header_links2', child).each(function (indx2, elem2) {
                var txt = $(this, child).text();
                if (indx2 == 0)
                    category.type = txt.trim().toLowerCase();

                category.title += (txt + " | ")
            });

            category.key = helper.generateGameCategoryKey(category.title);
            current_cat = category;
            data.categories[current_cat.key] = current_cat;
			
        }

        else {
            if (current_cat != undefined && !helper.is_allowed_type(current_cat.type))
                return;

            //if (($(this).attr('class') != 'bets-page-categoryContainer'))
            if (($('.category_bets_odd', this).length ==0) || ($('.category_bets_even', this).length ==0))
                    return;

			console.log($(this).attr('class'));
		   $(this).children().each(function (indx, elem) {
                try {

                //if (($('.category_bets_odd', this).length) || ($('.category_bets_even', this).length)) {
                 if (($(this).attr('class') == 'category_bets_odd') || ($(this).attr('class') == 'category_bets_even')) {

                        //var child = $('#betsPanel', this).eq(0);
                        var child = $(this);

                        var game_title = " - ";
                        var game = constants.newGame().game;


                        //=================METHOD 1 ==================
                        // TODO: Remember to get the team names when getting the odds because some team names might be incomplete

                        var game_title = $('.betsPanelEventName-text', this).text();
                        //var game_title = $('#categoryText',this).text();
                        /*=================METHOD 2(Less Reliable)=================

                         var vars = $('.outcome_odds_category',child, this).eq(0).attr('onclick');


                         if(vars != undefined)
                         {
                         vars = vars.split("'");
                         game_title = vars[3];
                         }
                         */
                        game.datetime = $('.betsPage-evenStart', this).eq(0).text();

                        game.timestamp = helper.getTimestamp(game.datetime);
                        game.expireAt = new Date(game.timestamp);

                        game.title = game_title.trim();
                        game.id = helper.generateGameID(game.title)
                        game.sorted_id = helper.generateSortedGameID(game.title)


                        var sides = game_title.split('-');
                        game.home = sides[0].trim();
                        game.away = sides[1].trim();
                        game.home_key = helper.getSignificantKey(game.home);
                        game.away_key = helper.getSignificantKey(game.away);


                        //TODO  Please don't rely on structure of the website.. use IDs  or CLASS to get Game URLS

                        //YOU CAN STILL USE THE 'onclick' available at the game title
                        var vars = $('#moreBetsPanel', this).attr('onclick');
                        if (
                            vars != undefined) {
                            game.url = vars.split("'")[1];

                        }

                        game.date = game.datetime.split(" ")[0];
                        game.time = game.datetime.split(" ")[1];


                        if (current_cat != undefined)
                            game.category_key = current_cat.key;

                        data.games.push(game)
                        ;
                    }
                } catch (e) {
                    console.log(e);
                }


            })


        }


    });

    nparser = null;
    helper = null;
    root = null;


}
MerrybetParser.prototype.getMatchDays = function ($, data) {
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

MerrybetParser.prototype.getMockMatchDays = function ($, data) {


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


exports.getMerrybetParser = function () {
    return new MerrybetParser();
}

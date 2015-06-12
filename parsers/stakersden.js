/**
 * Created by olaokenyi on 5/10/15.
 */

var nparser = require('../betobjects/stakersden').getStakersdenObject();
var constants = require('../constants');
var helper = require('../helpers/misc');

function StakersdenParser() {

}

StakersdenParser.prototype.getGameOdds = function ($, game, db) {


    var root = $('#betsTable');

    var match_title = $('#eventTitleText', root).text();
    var match_time = $('#eventStartText',  root).text();


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

    $('#gameTitlePanel', '#betsTable').each(function (indx, elem) {


        var tag = ''
        //var game_code = '';
        var temp = $('#gameNameText', this);

        if(temp.length)
        {
            t = temp.text();
            tag = nparser.clean_symbols(t.toLowerCase());
            //game_code = t[1].split(')')[0];
        }

        //parse straight_win
        if (tag == nparser.straight_win_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data["odds.1.sd.value"] = odds[0];
                temp_data["odds.x.sd.value"] = odds[1];
                temp_data["odds.2.sd.value"] = odds[2];
            }


        }

        //Handicap 0:1
        if (tag == nparser.handicap_0_1_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_0_1_1.sd.value'] = odds[0];
                temp_data['odds.handicap_0_1_x.sd.value'] = odds[1];
                temp_data['odds.handicap_0_1_2.sd.value'] = odds[2]
            }

        }

        //Handicap 0:2
        if (tag == nparser.handicap_0_2_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_0_2_1.sd.value'] = odds[0];
                temp_data['odds.handicap_0_2_x.sd.value'] = odds[1];
                temp_data['odds.handicap_0_2_2.sd.value'] = odds[2]
            }


        }

        //Handicap 1:0
        if (tag == nparser.handicap_1_0_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.handicap_1_0_1.sd.value'] = odds[0];
                temp_data['odds.handicap_1_0_x.sd.value'] = odds[1];
                temp_data['odds.handicap_1_0_2.sd.value'] = odds[2]
            }


        }

        //Handicap 2:0
        if (tag == nparser.handicap_2_0_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.handicap_2_0_1.sd.value'] = odds[0];
                temp_data['odds.handicap_2_0_x.sd.value'] = odds[1];
                temp_data['odds.handicap_2_0_2.sd.value'] = odds[2]

            }


        }

        //Double chance
        if (tag == nparser.double_chance_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.1x.sd.value'] = odds[0];
                temp_data['odds.12.sd.value'] = odds[1];
                temp_data['odds.x2.sd.value'] = odds[2]

            }

        }

        //Double chance 1st Half
        if (tag == nparser.double_chance_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1x_half.sd.value'] = odds[0];
                temp_data['odds.12_half.sd.value'] = odds[1];
                temp_data['odds.x2_half.sd.value'] = odds[2]


            }

        }
        //Double chance 2nd Half
        if (tag == nparser.double_chance_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1x_half_2.sd.value'] = odds[0];
                temp_data['odds.12_half_2.sd.value'] = odds[1];
                temp_data['odds.x2_half_2.sd.value'] = odds[2]

            }


        }
        //1st half result
        if (tag == nparser.first_half_result_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);


            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.1_half.sd.value'] = odds[0];
                temp_data['odds.x_half.sd.value'] = odds[1];
                temp_data['odds.2_half.sd.value'] = odds[2]

            }


        }
        //2nd half result
        if (tag == nparser.second_half_result_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);


            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.1_half_2.sd.value'] = odds[0];
                temp_data['odds.x_half_2.sd.value'] = odds[1];
                temp_data['odds.2_half_2.sd.value'] = odds[2]
            }

        }

        //most scoring half
        if (tag == nparser.most_scoring_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.most_scoring_half.half.sd.value'] = odds[0];
                temp_data['odds.most_scoring_half.half_2.sd.value'] = odds[2];
                temp_data['odds.most_scoring_half.equal.sd.value'] = odds[1]

            }


        }
        //To score first
        if (tag == nparser.to_score_first_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.first_goal.home.sd.value'] = odds[0];
                temp_data['odds.first_goal.away.sd.value'] = odds[2];
                temp_data['odds.first_goal.no_goal.sd.value'] = odds[1]
            }

        }

        //To score Last
        if (tag == nparser.to_score_last_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {

                temp_data['odds.last_goal.home.sd.value'] = odds[0];
                temp_data['odds.last_goal.away.sd.value'] = odds[2];
                temp_data['odds.last_goal.no_goal.sd.value'] = odds[1]
            }

        }


        //First Goal Time
        if (tag == nparser.first_goal_time_tag) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            try {
                temp_data = {};
                for (var i = 0; i < val.odds.length; i++) {
                    temp_data['odds.first_goal_time.' + nparser.clean(val.keys[i]).toLowerCase() + '.sd.value'] = val.odds[i];
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

                temp_data['odds.draw_no_bet.home.sd.value'] = odds[0];
                temp_data['odds.draw_no_bet.away.sd.value'] = odds[1]

            }


        }

        //Draw No Bet First Half
        if (tag == nparser.draw_no_bet_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);


            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.draw_no_bet_half.home.sd.value'] = odds[0];
                temp_data['odds.draw_no_bet_half.away.sd.value'] = odds[1]

            }


        }

        //Draw No Bet Second Half
        if (tag == nparser.draw_no_bet_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.draw_no_bet_half_2.home.sd.value'] = odds[0];
                temp_data['odds.draw_no_bet_half_2.away.sd.value'] = odds[1]

            }
            //console.log(err);


        }

        //under/over0.5 first half
        if (tag == nparser.under_over_0_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5_half.sd.value'] = odds[0];
                temp_data['odds.over0_5_half.sd.value'] = odds[1]
            }


        }

        //under/over1.5 first half
        if (tag == nparser.under_over_1_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5_half.sd.value'] = odds[0];
                temp_data['odds.over1_5_half.sd.value'] = odds[1]

            }

        }

        //under/over2.5 first half
        if (tag == nparser.under_over_2_5_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5_half.sd.value'] = odds[0];
                temp_data['odds.over2_5_half.sd.value'] = odds[1]

            }

        }


        //under/over0.5 second half
        if (tag == nparser.under_over_0_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5_half_2.sd.value'] = odds[0];
                temp_data['odds.over0_5_half_2.sd.value'] = odds[1]

            }


        }

        //under/over1.5 second half
        if (tag == nparser.under_over_1_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5_half_2.sd.value'] = odds[0];
                temp_data['odds.over1_5_half_2.sd.value'] = odds[1]

            }


        }

        //under/over2.5 second half
        if (tag == nparser.under_over_2_5_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5_half_2.sd.value'] = odds[0];
                temp_data['odds.over2_5_half_2.sd.value'] = odds[1]

            }


        }

        //under/over0.5
        if (tag == nparser.under_over_0_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under0_5.sd.value'] = odds[0];
                temp_data['odds.over0_5.sd.value'] = odds[1]

            }

        }

        //under/over1.5
        if (tag == nparser.under_over_1_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under1_5.sd.value'] = odds[0];
                temp_data['odds.over1_5.sd.value'] = odds[1]

            }


        }
        //under/over2.5
        if (tag == nparser.under_over_2_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under2_5.sd.value'] = odds[0];
                temp_data['odds.over2_5.sd.value'] = odds[1]

            }


        }
        //under/over3.5
        if (tag == nparser.under_over_3_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under3_5.sd.value'] = odds[0];
                temp_data['odds.over3_5.sd.value'] = odds[1]

            }


        }
        //under/over4.5
        if (tag == nparser.under_over_4_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under4_5.sd.value'] = odds[0];
                temp_data['odds.over4_5.sd.value'] = odds[1]

            }

        }
        //under/over5.5
        if (tag == nparser.under_over_5_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under5_5.sd.value'] = odds[0];
                temp_data['odds.over5_5.sd.value'] = odds[1]

            }


        }
        //under/over6.5
        if (tag == nparser.under_over_6_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under6_5.sd.value'] = odds[0];
                temp_data['odds.over6_5.sd.value'] = odds[1]

            }


        }
        //under/over7.5
        if (tag == nparser.under_over_7_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.under7_5.sd.value'] = odds[0];
                temp_data['odds.over7_5.sd.value'] = odds[1]

            }


        }


        //Both teams to score
        if (tag == nparser.both_teams_to_score_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts.yes.sd.value'] = odds[0];
                temp_data['odds.bts.no.sd.value'] = odds[1]

            }


        }

        //Both teams to score first half
        if (tag == nparser.both_teams_to_score_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts_half.yes.sd.value'] = odds[0];
                temp_data['odds.bts_half.no.sd.value'] = odds[1]

            }


        }

        //Both teams to score second half
        if (tag == nparser.both_teams_to_score_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.bts_half_2.yes.sd.value'] = odds[0];
                temp_data['odds.bts_half_2.no.sd.value'] = odds[1]

            }


        }

        //Total Goals
        if (tag == nparser.total_goals_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals.odd.sd.value'] = odds[0];
                temp_data['odds.total_goals.even.sd.value'] = odds[1]

            }


        }
        //Total Goals First Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals_half.odd.sd.value'] = odds[0];
                temp_data['odds.total_goals_half.even.sd.value'] = odds[1]

            }


        }

        //Total Goals Second Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_second_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.total_goals_half_2.odd.sd.value'] = odds[0];
                temp_data['odds.total_goals_half_2.even.sd.value'] = odds[1]

            }

        }


        //under/over0.5 Cards
        if (tag == nparser.under_over_0_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under0_5_card.sd.value'] = odds[0];
                temp_data['odds.odds.over0_5_card.sd.value'] = odds[1]

            }


        }

        //under/over1.5 Cards
        if (tag == nparser.under_over_1_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under_5_card.sd.value'] = odds[0];
                temp_data['odds.odds.over1_5_card.sd.value'] = odds[1]

            }


        }
        //under/over2.5 Cards
        if (tag == nparser.under_over_2_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under2_5_card.sd.value'] = odds[0];
                temp_data['odds.odds.over2_5_card.sd.value'] = odds[1]

            }

        }
        //under/over3.5 Cards
        if (tag == nparser.under_over_3_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under3_5_card.sd.value'] = odds[0];
                temp_data['odds.odds.over3_5_card.sd.value'] = odds[1]

            }


        }
        //under/over4.5 Cards
        if (tag == nparser.under_over_4_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under4_5_card.sd.value'] = odds[0];
                temp_data['odds.odds.over4_5_card.sd.value'] = odds[1]

            }


        }
        //under/over5.5 Cards
        if (tag == nparser.under_over_5_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under5_5_card.sd.value'] = odds[0];
                temp_data['odds.odds.over5_5_card.sd.value'] = odds[1]

            }

        }
        //under/over6.5 Cards
        if (tag == nparser.under_over_6_5_cards_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under6_5_card.sd.value'] = odds[0];
                temp_data['odds.odds.over6_5_card.sd.value'] = odds[1]

            }

        }


        //under/over0.5 Cards First Half
        if (tag == nparser.under_over_0_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under0_5_card_half.sd.value'] = odds[0];
                temp_data['odds.odds.over0_5_card_half.sd.value'] = odds[1]

            }

        }

        //under/over1.5 Cards First Half
        if (tag == nparser.under_over_1_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under1_5_card_half.sd.value'] = odds[0];
                temp_data['odds.odds.over1_5_card_half.sd.value'] = odds[1]

            }


        }
        //under/over2.5 Cards First Half
        if (tag == nparser.under_over_2_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under2_5_card_half.sd.value'] = odds[0];
                temp_data['odds.odds.over2_5_card_half.sd.value'] = odds[1]

            }

        }

        //under/over3.5 Cards First Half
        if (tag == nparser.under_over_3_5_cards_first_half_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.odds.under3_5_card_half.sd.value'] = odds[0];
                temp_data['odds.odds.over3_5_card_half.sd.value'] = odds[1]

            }


        }

        //Halftime/Fulltime
        if (tag == nparser.halftime_fulltime_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 9)) {
                temp_data['odds.halftime_fulltime.home_home.sd.value'] = odds[0];
                temp_data['odds.halftime_fulltime.home_x.sd.value'] = odds[1];
                temp_data['odds.halftime_fulltime.home_away.sd.value'] = odds[2];
                temp_data['odds.halftime_fulltime.x_home.sd.value'] = odds[3];
                temp_data['odds.halftime_fulltime.x_x.sd.value'] = odds[4];
                temp_data['odds.halftime_fulltime.x_away.sd.value'] = odds[5];
                temp_data['odds.halftime_fulltime.away_home.sd.value'] = odds[6];
                temp_data['odds.halftime_fulltime.away_x.sd.value'] = odds[7];
                temp_data['odds.halftime_fulltime.away_away.sd.value'] = odds[8]

            }


        }

        //Total goals (Home)
        if (tag == (nparser.total_goals_tag + '(.' + nparser.clean(game.home.toLowerCase()) + ')' )) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 4)) {
                temp_data['odds.team_total_goals.home.0.sd.value'] = odds[0];
                temp_data['odds.team_total_goals.home.1.sd.value'] = odds[1];
                temp_data['odds.team_total_goals.home.2.sd.value'] = odds[2];
                temp_data['odds.team_total_goals.home.3+.sd.value'] = odds[3]


            }


        }


        //Total goals (Away)
        if (tag == (nparser.total_goals_tag + '(.' + nparser.clean(game.away.toLowerCase()) + ')' )) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 4)) {
                temp_data['odds.team_total_goals.away.0.sd.value'] = odds[0];
                temp_data['odds.team_total_goals.away.1.sd.value'] = odds[1];
                temp_data['odds.team_total_goals.away.2.sd.value'] = odds[2];
                temp_data['odds.team_total_goals.away.3+.sd.value'] = odds[3]


            }


        }

        //Correct Score
        if (tag == (nparser.correct_score_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);

            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score.' + nparser.clean_symbols(val.keys[i]) + '.sd.value'] = val.odds[i];
            }

        }

        //Correct Score First Half
        if (tag == (nparser.correct_score_first_half_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score_half.' + nparser.clean_symbols(val.keys[i])+'.sd.value']  = val.odds[i];

                if (obj != undefined) {
                    //obj.sd.value = val.odds[i];                 }
                }
            }
        }


        //Correct Score Second Half
        if (tag == (nparser.correct_score_second_half_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.correct_score_half_2.' + nparser.clean_symbols(val.keys[i])+'.sd.value']  = val.odds[i];

                if (obj != undefined) {
                    //obj.sd.value = val.odds[i];                 }
                }
            }
        }

        //Ten Minutes Result
        if (tag == nparser.ten_minutes_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.ten_mins.1.sd.value'] = odds[0];
                temp_data['odds.ten_mins.x.sd.value'] = odds[1];
                temp_data['odds.ten_mins.2.sd.value'] = odds[2]


            }

        }


        //Most Scoring Half (Home)
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.most_scoring_half_tag)) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.home_most_scoring_half.half.sd.value'] = odds[0];
                temp_data['odds.home_most_scoring_half.half_2.sd.value'] = odds[1];
                temp_data['odds.home_most_scoring_half.equal.sd.value'] = odds[2]


            }


        }
        //Most Scoring Half (Away)
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.most_scoring_half_tag)) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3)) {
                temp_data['odds.away_most_scoring_half.half.sd.value'] = odds[0];
                temp_data['odds.away_most_scoring_half.half_2.sd.value'] = odds[1];
                temp_data['odds.away_most_scoring_half.equal.sd.value'] = odds[2]


            }

        }


        //Home clean sheet
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.clean_sheet_tag)) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.home_clean_sheet.yes.sd.value'] = odds[0];
                temp_data['odds.home_clean_sheet.no.sd.value'] = odds[1]


            }


        }

        //Away clean sheet
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.clean_sheet_tag)) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2)) {
                temp_data['odds.away_clean_sheet.yes.sd.value'] = odds[0];
                temp_data['odds.away_clean_sheet.no.sd.value'] = odds[1]


            }

        }


        //Winning Margin
        if (tag == nparser.winning_margin_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 7)) {
                temp_data['odds.win_margin.home_1.sd.value'] = odds[0];
                temp_data['odds.win_margin.home_2.sd.value'] = odds[1];
                temp_data['odds.win_margin.home_3+.sd.value'] = odds[2];
                temp_data['odds.win_margin.away_1.sd.value'] = odds[3];
                temp_data['odds.win_margin.away_2.sd.value'] = odds[4];
                temp_data['odds.win_margin.away_3+.sd.value'] = odds[5];
                temp_data['odds.win_margin.x.sd.value'] = odds[6]


            }


        }


        //1X2 and Under/Over 0.5
        if (tag == nparser.result_and_under_over_0_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under0_5.sd.value'] = odds[0];
                temp_data['odds.home_win_over0_5.sd.value'] = odds[1];
                temp_data['odds.draw_under0_5.sd.value'] = odds[2];
                temp_data['odds.draw_over0_5.sd.value'] = odds[3];
                temp_data['odds.away_win_under0_5.sd.value'] = odds[4];
                temp_data['odds.away_win_over0_5.sd.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 1.5
        if (tag == nparser.result_and_under_over_1_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under1_5.sd.value'] = odds[0];
                temp_data['odds.home_win_over1_5.sd.value'] = odds[1];
                temp_data['odds.draw_under1_5.sd.value'] = odds[2];
                temp_data['odds.draw_over1_5.sd.value'] = odds[3];
                temp_data['odds.away_win_under1_5.sd.value'] = odds[4];
                temp_data['odds.away_win_over1_5.sd.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 2.5
        if (tag == nparser.result_and_under_over_2_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under2_5.sd.value'] = odds[0];
                temp_data['odds.home_win_over2_5.sd.value'] = odds[1];
                temp_data['odds.draw_under2_5.sd.value'] = odds[2];
                temp_data['odds.draw_over2_5.sd.value'] = odds[3];
                temp_data['odds.away_win_under2_5.sd.value'] = odds[4];
                temp_data['odds.away_win_over2_5.sd.value'] = odds[5]


            }


        }

        //1X2 and Under/Over 3.5
        if (tag == nparser.result_and_under_over_3_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under3_5.sd.value'] = odds[0];
                temp_data['odds.home_win_over3_5.sd.value'] = odds[1];
                temp_data['odds.draw_under3_5.sd.value'] = odds[2];
                temp_data['odds.draw_over3_5.sd.value'] = odds[3];
                temp_data['odds.away_win_under3_5.sd.value'] = odds[4];
                temp_data['odds.away_win_over3_5.sd.value'] = odds[5]


            }


        }
        //1X2 and Under/Over 4.5
        if (tag == nparser.result_and_under_over_4_5_tag) {
            odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6)) {
                temp_data['odds.home_win_under4_5.sd.value'] = odds[0];
                temp_data['odds.home_win_over4_5.sd.value'] = odds[1];
                temp_data['odds.draw_under4_5.sd.value'] = odds[2];
                temp_data['odds.draw_over4_5.sd.value'] = odds[3];
                temp_data['odds.away_win_under4_5.sd.value'] = odds[4];
                temp_data['odds.away_win_over4_5.sd.value'] = odds[5]


            }


        }

        //Number of Goals
        if (tag == (nparser.number_of_goals_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                temp_data['odds.number_of_goals.' + nparser.clean(val.keys[i])+'.sd.value']  = val.odds[i];

                if (obj != undefined) {
                    //obj.sd.value = val.odds[i];                 }
                }
            }
        }


        //NO GAME CODES FOR STAKERSDEN YET
        if(tag.trim() != '')
        {
            //temp_data['play_codes.'+ tag + '.sd'] = game_code;
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

StakersdenParser.prototype.getGames = function ($, data) {

    var game = constants.newGame().game;

    $('.bst_seller_row_even, .bst_seller_row_odd', '#betsTable').each( function(index, elem)
    {


        var vars = $('#categoryText', this).eq(0).text();


        //game.datetime = $('.event-date', this).eq(0).text();

        //game.timestamp = helper.getTimestamp(game.datetime);

        game.title = vars.trim();
        game.id = helper.generateGameID(game.title)

        var sides = vars.split('-');
        game.home = sides[0].trim();
        game.away = sides[1].trim();


        //console.log(game.datetime);
        //TODO  Please don't rely on structure of the website.. use IDs  or ClASS to get Game URLS

        var vars2 = $('input[type="button"]','#moreBetsPanel', this);

        if (vars2.length) {
            game.url = vars2.attr('onclick').split("'")[1];
        }
        ///game.date = game.datetime.split(" ")[0];
        //game.time = game.datetime.split(" ")[1];


        if (typeof current_cat  != "undefined")
            game.category_key = current_cat.key;

        data.games.push(game);



    });

    root = null;
    global.gc();


}


StakersdenParser.prototype.getMatchDays = function ($, data) {
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

StakersdenParser.prototype.getMockMatchDays = function ($, data) {


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


exports.getStakersdenParser = function () {
    return new StakersdenParser();
}

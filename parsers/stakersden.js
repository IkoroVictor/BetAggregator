/**
 * Created by olaokenyi on 5/10/15.
 */
var nparser = require('../betobjects/stakersden').getStakersdenObject();
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



    $('#betsTable').children().each(function (indx, elem) {

        var tag = ''
        var game_code = '';
        var temp = $('#gameNameText', this);

        if(temp.length)
        {
             t = temp.text().split('(');
             tag = nparser.clean_symbols(t[0].toLowerCase());
             game_code = t[1].split(')')[0];
        }


        //parse straight_win
        if (tag == nparser.straight_win_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    "odds.1.mb": odds[0],
                    "odds.x.mb": odds[1],
                    "odds.2.mb": odds[2]
                }}, function (err, count, status) {
                    //console.log(err);

                });


        }

        //Handicap 0:1
        if (tag == nparser.handicap_0_1_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    'odds.handicap_0_1_1.mb': odds[0],
                    'odds.handicap_0_1_x.mb': odds[1],
                    'odds.handicap_0_1_2.mb': odds[2]
                }}, function (err, count, status) {
                    //.log(err);

                });

        }

        //Handicap 0:2
        if (tag == nparser.handicap_0_2_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    'odds.handicap_0_2_1.mb': odds[0],
                    'odds.handicap_0_2_x.mb': odds[1],
                    'odds.handicap_0_2_2.mb': odds[2]
                }}, function (err, count, status) {
                    //console.log(err);

                });

        }

        //Handicap 1:0
        if (tag == nparser.handicap_1_0_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    'odds.handicap_1_0_1.mb': odds[0],
                    'odds.handicap_1_0_x.mb': odds[1],
                    'odds.handicap_1_0_2.mb': odds[2]
                }}, function (err, count, status) {
                    //console.log(err);

                });


        }

        //Handicap 2:0
        if (tag == nparser.handicap_2_0_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {

                    'odds.handicap_2_0_1.mb': odds[0],
                    'odds.handicap_2_0_x.mb': odds[1],
                    'odds.handicap_2_0_2.mb': odds[2]

                }}, function (err, count, status) {
                    //console.log(err);

                });

        }

        //Double chance
        if (tag == nparser.double_chance_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {

                    'odds.1x.mb': odds[0],
                    'odds.12.mb': odds[1],
                    'odds.x2.mb': odds[2]

                }}, function (err, count, status) {
                    //console.log(err);

                });

        }

        //Double chance 1st Half
        if (tag == nparser.double_chance_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    'odds.1x_half.mb': odds[0],
                    'odds.12_half.mb': odds[1],
                    'odds.x2_half.mb': odds[2]
                }}, function (err, count, status) {
                    console.log(err);
                });

        }
        //Double chance 2nd Half
        if (tag == nparser.double_chance_second_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    'odds.1x_half_2.mb': odds[0],
                    'odds.12_half_2.mb': odds[1],
                    'odds.x2_half_2.mb': odds[2]

                }}, function (err, count, status) {
                    console.log(err);
                });

        }
        //1st half result
        if (tag == nparser.first_half_result_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);


            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {

                    'odds.1_half.mb': odds[0],
                    'odds.x_half.mb': odds[1],
                    'odds.2_half.mb': odds[2]

                }}, function (err, count, status) {
                    console.log(err);
                });

        }
        //2nd half result
        if (tag == nparser.second_half_result_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);


            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    'odds.1_half_2.mb': odds[0],
                    'odds.x_half_2.mb': odds[1],
                    'odds.2_half_2.mb': odds[2]
                }}, function (err, count, status) {
                    console.log(err);
                });

        }

        //most scoring half
        if (tag == nparser.most_scoring_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {

                    'odds.most_scoring_half.half.mb': odds[0],
                    'odds.most_scoring_half.half_2.mb': odds[2],
                    'odds.most_scoring_half.equal.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //To score first
        if (tag == nparser.to_score_first_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    'odds.first_goal.home.mb': odds[0],
                    'odds.first_goal.away.mb': odds[2],
                    'odds.first_goal.no_goal.mb': odds[1]
                }}, function (err, count, status) {
                    //console.log(err);
                });
        }

        //To score Last
        if (tag == nparser.to_score_last_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {

                    'odds.last_goal.home.mb': odds[0],
                    'odds.last_goal.away.mb': odds[2],
                    'odds.last_goal.no_goal.mb': odds[1]
                }}, function (err, count, status) {
                    //console.log(err);
                });

        }


        //First Goal Time
        if (tag == nparser.first_goal_time_tag) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            try {
                for (var i = 0; i < val.odds.length; i++) {
                    var obj = 'odds.first_goal_time.' + nparser.clean(val.keys[i]).toLowerCase() + '.mb';
                    //console.log(nparser.clean(val.keys[i]));

                    /*db.update({'id': game.id }, {$set: {

                     obj : val.odds[i]
                     }}, function (err, count, status) {
                     //console.log(err);
                     });*/

                }
            }
            catch (ex) {
                console.log(ex);
            }

        }

        //Draw No Bet
        if (tag == nparser.draw_no_bet_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {

                    'odds.draw_no_bet.home.mb': odds[0],
                    'odds.draw_no_bet.away.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //Draw No Bet First Half
        if (tag == nparser.draw_no_bet_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);


            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.draw_no_bet_half.home.mb': odds[0],
                    'odds.draw_no_bet_half.away.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }

        //Draw No Bet Second Half
        if (tag == nparser.draw_no_bet_second_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.draw_no_bet_half_2.home.mb': odds[0],
                    'odds.draw_no_bet_half_2.away.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }

        //under/over0.5 first half
        if (tag == nparser.under_over_0_5_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under0_5_half.mb': odds[0],
                    'odds.over0_5_half.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //under/over1.5 first half
        if (tag == nparser.under_over_1_5_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under1_5_half.mb': odds[0],
                    'odds.over1_5_half.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }

        //under/over2.5 first half
        if (tag == nparser.under_over_2_5_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under2_5_half.mb': odds[0],
                    'odds.over2_5_half.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }


        //under/over0.5 second half
        if (tag == nparser.under_over_0_5_second_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under0_5_half_2.mb': odds[0],
                    'odds.over0_5_half_2.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //under/over1.5 second half
        if (tag == nparser.under_over_1_5_second_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under1_5_half_2.mb': odds[0],
                    'odds.over1_5_half_2.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //under/over2.5 second half
        if (tag == nparser.under_over_2_5_second_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under2_5_half_2.mb': odds[0],
                    'odds.over2_5_half_2.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //under/over0.5
        if (tag == nparser.under_over_0_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under0_5.mb': odds[0],
                    'odds.over0_5.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }

        //under/over1.5
        if (tag == nparser.under_over_1_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under1_5.mb': odds[0],
                    'odds.over1_5.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //under/over2.5
        if (tag == nparser.under_over_2_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under2_5.mb': odds[0],
                    'odds.over2_5.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //under/over3.5
        if (tag == nparser.under_over_3_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under3_5.mb': odds[0],
                    'odds.over3_5.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //under/over4.5
        if (tag == nparser.under_over_4_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under4_5.mb': odds[0],
                    'odds.over4_5.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }
        //under/over5.5
        if (tag == nparser.under_over_5_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under5_5.mb': odds[0],
                    'odds.over5_5.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }
        //under/over6.5
        if (tag == nparser.under_over_6_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under6_5.mb': odds[0],
                    'odds.over6_5.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //under/over7.5
        if (tag == nparser.under_over_7_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.under7_5.mb': odds[0],
                    'odds.over7_5.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }


        //Both teams to score
        if (tag == nparser.both_teams_to_score_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.bts.yes.mb': odds[0],
                    'odds.bts.no.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //Both teams to score first half
        if (tag == nparser.both_teams_to_score_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.bts_half.yes.mb': odds[0],
                    'odds.bts_half.no.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //Both teams to score second half
        if (tag == nparser.both_teams_to_score_second_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.bts_half_2.yes.mb': odds[0],
                    'odds.bts_half_2.no.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //Total Goals
        if (tag == nparser.total_goals_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.total_goals.odd.mb': odds[0],
                    'odds.total_goals.even.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //Total Goals First Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.total_goals_half.odd.mb': odds[0],
                    'odds.total_goals_half.even.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //Total Goals Second Half
        if (nparser.clean_symbols(tag) == nparser.total_goals_second_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.total_goals_half_2.odd.mb': odds[0],
                    'odds.total_goals_half_2.even.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }


        //under/over0.5 Cards
        if (tag == nparser.under_over_0_5_cards_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under0_5_card.mb': odds[0],
                    'odds.odds.over0_5_card.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //under/over1.5 Cards
        if (tag == nparser.under_over_1_5_cards_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under_5_card.mb': odds[0],
                    'odds.odds.over1_5_card.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //under/over2.5 Cards
        if (tag == nparser.under_over_2_5_cards_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under2_5_card.mb': odds[0],
                    'odds.odds.over2_5_card.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //under/over3.5 Cards
        if (tag == nparser.under_over_3_5_cards_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under3_5_card.mb': odds[0],
                    'odds.odds.over3_5_card.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //under/over4.5 Cards
        if (tag == nparser.under_over_4_5_cards_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under4_5_card.mb': odds[0],
                    'odds.odds.over4_5_card.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //under/over5.5 Cards
        if (tag == nparser.under_over_5_5_cards_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under5_5_card.mb': odds[0],
                    'odds.odds.over5_5_card.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }
        //under/over6.5 Cards
        if (tag == nparser.under_over_6_5_cards_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under6_5_card.mb': odds[0],
                    'odds.odds.over6_5_card.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }


        //under/over0.5 Cards First Half
        if (tag == nparser.under_over_0_5_cards_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under0_5_card_half.mb': odds[0],
                    'odds.odds.over0_5_card_half.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }

        //under/over1.5 Cards First Half
        if (tag == nparser.under_over_1_5_cards_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under1_5_card_half.mb': odds[0],
                    'odds.odds.over1_5_card_half.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //under/over2.5 Cards First Half
        if (tag == nparser.under_over_2_5_cards_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under2_5_card_half.mb': odds[0],
                    'odds.odds.over2_5_card_half.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });

        }

        //under/over3.5 Cards First Half
        if (tag == nparser.under_over_3_5_cards_first_half_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.odds.under3_5_card_half.mb': odds[0],
                    'odds.odds.over3_5_card_half.mb': odds[1]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //Halftime/Fulltime
        if (tag == nparser.halftime_fulltime_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 9))
                db.update({'id': game.id }, {$set: {
                    'odds.halftime_fulltime.home_home.mb': odds[0],
                    'odds.halftime_fulltime.home_x.mb': odds[1],
                    'odds.halftime_fulltime.home_away.mb': odds[2],
                    'odds.halftime_fulltime.x_home.mb': odds[3],
                    'odds.halftime_fulltime.x_x.mb': odds[4],
                    'odds.halftime_fulltime.x_away.mb': odds[5],
                    'odds.halftime_fulltime.away_home.mb': odds[6],
                    'odds.halftime_fulltime.away_x.mb': odds[7],
                    'odds.halftime_fulltime.away_away.mb': odds[8]

                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //Total goals (Home)
        if (tag == (nparser.total_goals_tag + '(' + nparser.clean(game.home.toLowerCase()) + ')' )) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 4))
                db.update({'id': game.id }, {$set: {
                    'odds.team_total_goals.home.0.mb': odds[0],
                    'odds.team_total_goals.home.1.mb': odds[1],
                    'odds.team_total_goals.home.2.mb': odds[2],
                    'odds.team_total_goals.home.3+.mb': odds[3]


                }}, function (err, count, status) {
                    //console.log(err);
                });


        }


        //Total goals (Away)
        if (tag == (nparser.total_goals_tag + '(' + nparser.clean(game.away.toLowerCase()) + ')' )) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 4))
                db.update({'id': game.id }, {$set: {
                    'odds.team_total_goals.away.0.mb': odds[0],
                    'odds.team_total_goals.away.1.mb': odds[1],
                    'odds.team_total_goals.away.2.mb': odds[2],
                    'odds.team_total_goals.away.3+.mb': odds[3]


                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //Correct Score
        if (tag == (nparser.correct_score_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);

            for (var i = 0; i < val.odds.length; i++) {
                game.odds.correct_score[nparser.clean_symbols(val.keys[i])].mb = val.odds[i];
            }
        }

        //Correct Score First Half
        if (tag == (nparser.correct_score_first_half_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                var obj = game.odds.correct_score_half[nparser.clean_symbols(val.keys[i])];

                if (obj != undefined) {
                    obj.mb = val.odds[i];
                }
            }
        }


        //Correct Score Second Half
        if (tag == (nparser.correct_score_second_half_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                var obj = game.odds.correct_score_half_2[nparser.clean_symbols(val.keys[i])];

                if (obj != undefined) {
                    obj.mb = val.odds[i];
                }
            }
        }

        //Ten Minutes Result
        if (tag == nparser.ten_minutes_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    'odds.ten_mins.1.mb': odds[0],
                    'odds.ten_mins.x.mb': odds[1],
                    'odds.ten_mins.2.mb': odds[2]


                }}, function (err, count, status) {
                    //console.log(err);
                });

        }


        //Most Scoring Half (Home)
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.most_scoring_half_tag)) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    'odds.home_most_scoring_half.half.mb': odds[0],
                    'odds.home_most_scoring_half.half_2.mb': odds[1],
                    'odds.home_most_scoring_half.equal.mb': odds[2]



                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //Most Scoring Half (Away)
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.most_scoring_half_tag)) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 3))
                db.update({'id': game.id }, {$set: {
                    'odds.away_most_scoring_half.half.mb': odds[0],
                    'odds.away_most_scoring_half.half_2.mb': odds[1],
                    'odds.away_most_scoring_half.equal.mb': odds[2]



                }}, function (err, count, status) {
                    //console.log(err);
                });

        }


        //Home clean sheet
        if (tag == ( nparser.clean(game.home.toLowerCase()) + nparser.clean_sheet_tag)) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.home_clean_sheet.yes.mb': odds[0],
                    'odds.home_clean_sheet.no.mb': odds[1]



                }}, function (err, count, status) {
                    //console.log(err);
                });


        }

        //Away clean sheet
        if (tag == ( nparser.clean(game.away.toLowerCase()) + nparser.clean_sheet_tag)) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 2))
                db.update({'id': game.id }, {$set: {
                    'odds.away_clean_sheet.yes.mb': odds[0],
                    'odds.away_clean_sheet.no.mb': odds[1]



                }}, function (err, count, status) {
                    //console.log(err);
                });

        }


        //Winning Margin
        if (tag == nparser.winning_margin_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 7))
                db.update({'id': game.id }, {$set: {
                    'odds.win_margin.home_1.mb': odds[0],
                    'odds.win_margin.home_2.mb': odds[1],
                    'odds.win_margin.home_3+.mb': odds[2],
                    'odds.win_margin.away_1.mb': odds[3],
                    'odds.win_margin.away_2.mb': odds[4],
                    'odds.win_margin.away_3+.mb': odds[5],
                    'odds.win_margin.x.mb': odds[6]



                }}, function (err, count, status) {
                    //console.log(err);
                });


        }


        //1X2 and Under/Over 0.5
        if (tag == nparser.result_and_under_over_0_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);

            if (helper.validate_odds(odds, 6))
                db.update({'id': game.id }, {$set: {
                    'odds.home_win_under0_5.mb': odds[0],
                    'odds.home_win_over0_5.mb': odds[1],
                    'odds.draw_under0_5.mb': odds[2],
                    'odds.draw_over0_5.mb': odds[3],
                    'odds.away_win_under0_5.mb': odds[4],
                    'odds.away_win_over0_5.mb': odds[5]


                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //1X2 and Under/Over 1.5
        if (tag == nparser.result_and_under_over_1_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6))
                db.update({'id': game.id }, {$set: {
                    'odds.home_win_under1_5.mb': odds[0],
                    'odds.home_win_over1_5.mb': odds[1],
                    'odds.draw_under1_5.mb': odds[2],
                    'odds.draw_over1_5.mb': odds[3],
                    'odds.away_win_under1_5.mb': odds[4],
                    'odds.away_win_over1_5.mb': odds[5]


                }}, function (err, count, status) {
                    //console.log(err);
                });


        }
        //1X2 and Under/Over 2.5
        if (tag == nparser.result_and_under_over_2_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6))
                db.update({'id': game.id }, {$set: {
                    'odds.home_win_under2_5.mb': odds[0],
                    'odds.home_win_over2_5.mb': odds[1],
                    'odds.draw_under2_5.mb': odds[2],
                    'odds.draw_over2_5.mb': odds[3],
                    'odds.away_win_under2_5.mb': odds[4],
                    'odds.away_win_over2_5.mb': odds[5]


                }}, function (err, count, status) {
                    //console.log(err);
                });

        }

        //1X2 and Under/Over 3.5
        if (tag == nparser.result_and_under_over_3_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6))
                db.update({'id': game.id }, {$set: {
                    'odds.home_win_under3_5.mb': odds[0],
                    'odds.home_win_over3_5.mb': odds[1],
                    'odds.draw_under3_5.mb': odds[2],
                    'odds.draw_over3_5.mb': odds[3],
                    'odds.away_win_under3_5.mb': odds[4],
                    'odds.away_win_over3_5.mb': odds[5]


                }}, function (err, count, status) {
                    //console.log(err);
                });

        }
        //1X2 and Under/Over 4.5
        if (tag == nparser.result_and_under_over_4_5_tag) {
            var odds = nparser.parse_basic_op($(this).next(), $);
            if (helper.validate_odds(odds, 6))
                db.update({'id': game.id }, {$set: {
                    'odds.home_win_under4_5.mb': odds[0],
                    'odds.home_win_over4_5.mb': odds[1],
                    'odds.draw_under4_5.mb': odds[2],
                    'odds.draw_over4_5.mb': odds[3],
                    'odds.away_win_under4_5.mb': odds[4],
                    'odds.away_win_over4_5.mb': odds[5]


                }}, function (err, count, status) {
                    //console.log(err);
                });

        }

        //Number of Goals
        if (tag == (nparser.number_of_goals_tag )) {
            var val = nparser.parse_op_with_keys($(this).next(), $);
            for (var i = 0; i < val.odds.length; i++) {
                var obj = game.odds.number_of_goals[nparser.clean(val.keys[i])];

                if (obj != undefined) {
                    obj.mb = val.odds[i];
                }
            }
        }


    });
    nparser = null;
    helper = null;
    root = null;

    //return game;

}


StakersdenParser.prototype.getGames = function ($, data) {

    var nparser = require('../betobjects/Stakersden').getStakersdenObject();

    var helper = require('../helpers/misc');

    var current_cat = undefined;

    $('#betsTable').children().each(function (index, elem) {

        if ($('#categoryTitlePanel', this).length) {
            var child = $('#categoryTitlePanel', this).eq(0);
            var category = { title: '', games: {}}

            $('.header_links2', child).each(function (indx2, elem2) {
                category.title += ($(this, child).text() + " | ")
            });

            category.key = helper.generateGameCategoryKey(category.title);
            current_cat = category;
            data.categories[current_cat.key] = current_cat;
        }

        else {

            if (($(this).attr('class') == 'category_bets_odd') || ($(this).attr('class') == 'category_bets_even')) {

                var child = $('#betsPanel', this).eq(0);

                var game_title= " - ";
                var game = require('../constants').newGame().game;


                //=================METHOD 1 ==================
                // TODO: Remember to get the team names when getting the odds because some team names might be incomplete

                 var game_title = $('#categoryText',child,  this).eq(0).text();




               /*=================METHOD 2(Less Reliable)=================

                var vars = $('.outcome_odds_category',child, this).eq(0).attr('onclick');


                if(vars != undefined)
                {
                    vars = vars.split("'");
                     game_title = vars[3];
                }
                */



                game.datetime = $('#betDateText',child,  this).eq(0).text();

                game.timestamp = helper.getTimestamp(game.datetime);

                game.title = game_title.trim();
                game.id = helper.generateGameID(game.title)
                game.sorted_id = helper.generateSortedGameID(game.title)


                var sides = game_title.split('-');
                game.home = sides[0].trim();
                game.away = sides[1].trim();



                //TODO  Please don't rely on structure of the website.. use IDs  or CLASS to get Game URLS


                var  vars= $('#moreBetsPanel',child, this).eq(0).attr('onclick');
                if(vars != undefined)
                {
                    vars = vars.split("'");
                    var more_id = vars[1];  //Second Index
                    var vars2 =  $('#moreBetsPanel',child, this).eq(0).attr('onclick');
                    if (vars2 != undefined) {
                        game.url = vars2.split("'")[1];
                    }
                }




               /* ==================METHOD 2===========================

               var vars2 = $('#moreBetsPanel', this).children().eq(0).children().eq(0).attr('onclick');

                if (vars2 != undefined) {
                    game.url = vars2.split("'")[1];
                }

                */



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

/**
 * Created by olaokenyi on 5/1/15.
 */

function Constants()
{

    //BET SIDES URL
    this.nairabet_home = 'https://nairabet.com';
    this.surebet_home = 'https://surebet247.com';
    this.stakersden_home = 'https://surebet247.com';
    this._1960bet_home = 'https://surebet247.com';
    this.bet_naija_home = 'https://surebet247.com';
    this.lovers_bet_home = 'https://surebet247.com';
    this._9ja_predict_home = 'https://surebet247.com';
    this.nairastake_home = 'https://nairastake.com';
    this.merrybet_home = 'https://merrybet.com';

    //DB constants
    //this.MONGO_DB_URL= 'mongodb://localhost:27017/naijaodds';
    this.MONGO_DB_URL= 'mongodb://ikorovictor:prometheus1@ds031962.mongolab.com:31962/naijaodds';


    //this.MONGO_DB_HOST = 'ds012345.mongolab.com';
    //this.MONGO_DB_PORT = 56789;
    //this.MONGO_DB_NAME = 'naijaodds';
    //this.MONGO_DB_USERNAME = 'ikorovictor';
    //this.MONGO_DB_PASSWORD = 'prometheus1';



    //System Constants
    this.RECURRENT_JOB_INTERVAL = 5; //in minutes
    this.QUEUE_CONCURRENCY = 3;
    this.FUZZY_STRING_MATCH_THRESHOLD = 0.8; //
    this.TIMESTAMP_DIFFERENCE = 640000; //



   //Heroku/PaaS Constants
    this.PAAS_MAX_HEAP_USAGE = 620000000; //In Bytes 1320000000

}


exports.loadConstants = function()
{
    return new Constants();
}

function GameContainer()
{
    this.game = {

        id:'',
        sorted_id:'',
        title:'',
        category_key:'',
        datetime:'',
        time:'',
        date:'',
        timestamp:0,
        home:'',
        away: '',
        url: '',
        play_codes: {},
        odds: {


            //Straight odds
            '1' : {},
            '2' : {},
            'x' : {},

            //Double chance
            '1x' : {},
            'x2' : {},

            //Anybody can win
            '12' : {},


            //First Half win
            '1_half' : {},
            '2_half': {},
            'x_half':   {},

            //First half Double chance
            '1x_half' : {},
            'x2_half': {},
            '12_half':   {},

            //Second Half win
            '1_half_2' : {},
            '2_half_2': {},
            'x_half_2':   {},

            //Second Half Double chance
            '1x_half_2' : {},
            'x2_half_2': {},
            '12_half_2':   {},


            //Match Under/Over

            'under0_5': {},
            'under1_5': {},
            'under2_5': {},
            'under3_5': {},
            'under4_5': {},
            'under5_5': {},
            'under6_5': {},
            'under7_5': {},



            'under0_5_half': {},
            'under1_5_half': {},
            'under2_5_half': {},
            'under3_5_half': {},

            'under0_5_half_2': {},
            'under1_5_half_2': {},
            'under2_5_half_2': {},
            'under3_5_half_2': {},


            'over0_5': {},
            'over1_5': {},
            'over2_5': {},
            'over3_5': {},
            'over4_5': {},
            'over5_5': {},
            'over6_5': {},
            'over7_5': {},

            'over0_5_half': {},
            'over1_5_half': {},
            'over2_5_half': {},
            'over3_5_half': {},

            'over0_5_half_2': {},
            'over1_5_half_2': {},
            'over2_5_half_2': {},
            'over3_5_half_2': {},


            'home_over0_5': {},
            'home_over1_5': {},
            'home_over2_5': {},
            'home_over3_5': {},

            'home_under0_5': {},
            'home_under1_5': {},
            'home_under2_5': {},
            'home_under3_5': {},


            'home_over0_5_half': {},
            'home_over1_5_half': {},
            'home_over2_5_half': {},
            'home_over3_5_half': {},

            'home_under0_5_half': {},
            'home_under1_5_half': {},
            'home_under2_5_half': {},
            'home_under3_5_half': {},


            'away_over0_5': {},
            'away_over1_5': {},
            'away_over2_5': {},
            'away_over3_5': {},

            'away_under0_5': {},
            'away_under1_5': {},
            'away_under2_5': {},
            'away_under3_5': {},


            'away_over0_5_half': {},
            'away_over1_5_half': {},
            'away_over2_5_half': {},
            'away_over3_5_half': {},

            'away_under0_5_half': {},
            'away_under1_5_half': {},
            'away_under2_5_half': {},
            'away_under3_5_half': {},




            'home_win_over0_5': {},
            'home_win_over1_5': {},
            'home_win_over2_5': {},
            'home_win_over3_5': {},
            'home_win_over4_5': {},

            'home_win_under0_5': {},
            'home_win_under1_5': {},
            'home_win_under2_5': {},
            'home_win_under3_5': {},
            'home_win_under4_5': {},




            'away_win_over0_5': {},
            'away_win_over1_5': {},
            'away_win_over2_5': {},
            'away_win_over3_5': {},
            'away_win_over4_5': {},

            'away_win_under0_5': {},
            'away_win_under1_5': {},
            'away_win_under2_5': {},
            'away_win_under3_5': {},
            'away_win_under4_5': {},



            'draw_over0_5': {},
            'draw_over1_5': {},
            'draw_over2_5': {},
            'draw_over3_5': {},
            'draw_over4_5': {},

            'draw_under0_5': {},
            'draw_under1_5': {},
            'draw_under2_5': {},
            'draw_under3_5': {},
            'draw_under4_5': {},



            'home_win_over0_5_half': {},
            'home_win_over1_5_half': {},
            'home_win_over2_5_half': {},
            'home_win_over3_5_half': {},

            'home_win_under0_5_half': {},
            'home_win_under1_5_half': {},
            'home_win_under2_5_half': {},
            'home_win_under3_5_half': {},




            'away_win_over0_5_half': {},
            'away_win_over1_5_half': {},
            'away_win_over2_5_half': {},
            'away_win_over3_5_half': {},

            'away_win_under0_5_half': {},
            'away_win_under1_5_half': {},
            'away_win_under2_5_half': {},
            'away_win_under3_5_half': {},


            'handicap_0_1_1': {},
            'handicap_0_1_x': {},
            'handicap_0_1_2': {},
            'handicap_0_2_1': {},
            'handicap_0_2_x': {},
            'handicap_0_2_2': {},


            'handicap_1_0_1': {},
            'handicap_1_0_x': {},
            'handicap_1_0_2': {},
            'handicap_2_0_1': {},
            'handicap_2_0_x': {},
            'handicap_2_0_2': {},


            'handicap_0_1_1_half': {},
            'handicap_0_1_x_half': {},
            'handicap_0_1_2_half': {},
            'handicap_0_2_1_half': {},
            'handicap_0_2_x_half': {},
            'handicap_0_2_2_half': {},


            'handicap_1_0_1_half': {},
            'handicap_1_0_x_half': {},
            'handicap_1_0_2_half': {},
            'handicap_2_0_1_half': {},
            'handicap_2_0_x_half': {},
            'handicap_2_0_2_half': {},
            'handicap_0_1_1_half': {},

            'handicap_0_1_1_half_2': {},
            'handicap_0_1_x_half_2': {},
            'handicap_0_1_2_half_2': {},
            'handicap_0_2_1_half_2': {},
            'handicap_0_2_x_half_2': {},
            'handicap_0_2_2_half_2': {},


            'handicap_1_0_1_half_2': {},
            'handicap_1_0_x_half_2': {},
            'handicap_1_0_2_half_2': {},
            'handicap_2_0_1_half_2': {},
            'handicap_2_0_x_half_2': {},
            'handicap_2_0_2_half_2': {},

            most_scoring_half : {

                half: {},
                half_2: {},
                equal: {}
            },

            home_most_scoring_half : {

                half: {},
                half_2: {},
                equal: {}
            },
            away_most_scoring_half : {

                half: {},
                half_2: {},
                equal: {}

            },
            first_goal : {

                home: {},
                away: {},
                no_goal: {}
            },
            first_goal_half : {

                home: {},
                away: {},
                no_goal: {}
            },

            first_goal_half2 : {

                home: {},
                away: {},
                no_goal: {}
            },
            first_goal_time : {

                '1-15': {},
                '16-30': {},
                '31-45': {},
                '46-60': {},
                '61-75': {},
                '76-90': {},
                'nogoal': {}

            },
            last_goal : {

                home: {},
                away: {},
                no_goal: {}
            },
            draw_no_bet : {

                home: {},
                away: {}
            },
            draw_no_bet_half : {

                home: {},
                away: {}
            },

            draw_no_bet_half_2 : {

                home: {},
                away: {}
            },
            bts : {
                yes: {},
                no: {}
            },

            bts_half : {
                yes: {},
                no: {}
            },
            bts_half_2 : {
                yes: {},
                no: {}
            },
            total_goals : {
                odd: {},
                even: {}
            },

            total_goals_half : {
                odd: {},
                even: {}
            },
            total_goals_half_2 : {
                odd: {},
                even: {}
            },


            'under0_5_card': {},
            'under1_5_card': {},
            'under2_5_card': {},
            'under3_5_card': {},
            'under4_5_card': {},
            'under5_5_card': {},
            'under6_5_card': {},
            'under7_5_card': {},

            'over0_5_card': {},
            'over1_5_card': {},
            'over2_5_card': {},
            'over3_5_card': {},
            'over4_5_card': {},
            'over5_5_card': {},
            'over6_5_card': {},
            'over7_5_card': {},


            'under0_5_card_half': {},
            'under1_5_card_half': {},
            'under2_5_card_half': {},
            'under3_5_card_half': {},

            'over0_5_card_half': {},
            'over1_5_card_half': {},
            'over2_5_card_half': {},
            'over3_5_card_half': {},


            'under0_5_card_half_2': {},
            'under1_5_card_half_2': {},
            'under2_5_card_half_2': {},
            'under3_5_card_half_2': {},


            'over0_5_card_half_2': {},
            'over1_5_card_half_2': {},
            'over2_5_card_half_2': {},
            'over3_5_card_half_2': {},



            halftime_fulltime: {

                home_home : {},
                home_x :{},
                home_away:{},
                x_home: {},
                x_x: {},
                x_away : {},
                away_home:{},
                away_away:{},
                away_x :{}

            },

            correct_score: {

                '00' :{},
                '11' :{},
                '22' :{},
                '33' :{},


                '10' :{},
                '20' :{},
                '30' :{},
                '40' :{},
                '50' :{},
                '60' :{},


                '21' :{},
                '31' :{},
                '41' :{},
                '51' :{},

                '32' :{},
                '42' :{},


                '01' :{},
                '02' :{},
                '03' :{},
                '04' :{},
                '05' :{},
                '06' :{},

                '12' :{},
                '13' :{},
                '14' :{},
                '15' :{},

                '23' :{},
                '24' :{}

            },

            correct_score_half: {

                '00' :{},
                '11' :{},
                '22' :{},
                '33' :{},


                '10' :{},
                '20' :{},
                '30' :{},
                '40' :{},
                '50' :{},
                '60' :{},


                '21' :{},
                '31' :{},
                '41' :{},
                '51' :{},

                '32' :{},
                '42' :{},


                '01' :{},
                '02' :{},
                '03' :{},
                '04' :{},
                '05' :{},
                '06' :{},

                '12' :{},
                '13' :{},
                '14' :{},
                '15' :{},

                '23' :{},
                '24' :{} ,
                'other': {}

            },

            correct_score_half_2: {

                '00' :{},
                '11' :{},
                '22' :{},
                '33' :{},


                '10' :{},
                '20' :{},
                '30' :{},
                '40' :{},
                '50' :{},
                '60' :{},


                '21' :{},
                '31' :{},
                '41' :{},
                '51' :{},

                '32' :{},
                '42' :{},


                '01' :{},
                '02' :{},
                '03' :{},
                '04' :{},
                '05' :{},
                '06' :{},

                '12' :{},
                '13' :{},
                '14' :{},
                '15' :{},

                '23' :{},
                '24' :{},
                'other': {}

            },

            team_total_goals:{

                home:
                {
                    '0' :{},
                    '1' :{},
                    '2' :{},
                    '3+' :{}
                },
                away:
                {
                    '0' :{},
                    '1' :{},
                    '2' :{},
                    '3+' :{}
                }
            },

            ten_mins :
            {
                '1':{},
                'x':{},
                '2':{}

            },

            number_of_goals:
            {
                //Range of goals
                '0-1': {},
                '2-3': {},
                '4-5': {},
                '6+': {},


                //Number of goals
                '0': {},
                '1': {},
                '2': {},
                '3': {},
                '4': {},
                '5': {}

            },
            number_of_goals_half:
            {
                '0': {},
                '1': {},
                '2+': {}
            },

            number_of_goals_half_2:
            {
                '0': {},
                '1': {},
                '2+': {}

            },

            home_clean_sheet: {

                yes: {},
                no: {}
            },
            away_clean_sheet: {

                yes: {},
                no: {}
            },

            win_margin : {

                'home_1' : {},
                'home_2' : {},
                'home_3+' : {},
                'away_1' : {},
                'away_2' : {},
                'away_3+' : {},
                'x' : {}
            }






        }


    }





}

exports.newGame = function()
{
    return new GameContainer();
}




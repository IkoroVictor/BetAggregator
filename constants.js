/**
 * Created by olaokenyi on 5/1/15.
 */

function Constants()
{

    //BET SIDES URL
    this.nairabet_home = 'https://nairabet.com';
    this.surebet_home = 'https://surebet247.com';
    this.stakersden_home = 'https://stakersden.com';
    this._1960bet_home = 'https://www.1960bet.com';
    this.bet_colony_home = 'https://surebet247.com';
    this.lovers_bet_home = 'https://surebet247.com';
    this.winners_golden_bet_home = 'https://winnersgoldenbet.com';
    this.nairastake_home = 'https://nairastake.com';
    this.merrybet_home = 'https://merrybet.com';

    //DB constants
    //this.MONGO_DB_URL= 'mongodb://localhost:27017/naijaodds';

    //MONGOLAB
    //this.MONGO_DB_URL= 'mongodb://ikorovictor:prometheus1@ds031962.mongolab.com:31962/naijaodds';

    //OBJECTROCKET
    this.MONGO_DB_URL= 'mongodb://ikorovictor:prometheus1@iad-c11-1.objectrocket.com:48074/naijaodds';


    //this.MONGO_DB_HOST = 'ds012345.mongolab.com';
    //this.MONGO_DB_PORT = 56789;
    //this.MONGO_DB_NAME = 'naijaodds';
    //this.MONGO_DB_USERNAME = 'ikorovictor';
    //this.MONGO_DB_PASSWORD = 'prometheus1';



    //System Constants
    this.RECURRENT_JOB_INTERVAL = 240000; //in ms
    this.QUEUE_CONCURRENCY = 3;
    this.FUZZY_STRING_MATCH_THRESHOLD = 0.8; //
    this.TIMESTAMP_DIFFERENCE = 640000; //

    this.ALLOWED_GAME_TYPES = [/soccer/gi];



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
        home_key:'',
        away: '',
        away_key: '',
        url: '',
        play_codes: {},
        odds: {}
    }
}



exports.newGame = function()
{
    return new GameContainer();
}




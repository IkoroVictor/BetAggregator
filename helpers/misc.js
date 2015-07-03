/**
 * Created by olaokenyi on 5/11/15.
 */

var constants = require('../constants').loadConstants();

exports.generateGameCategoryKey = function(val)
{
    //TODO generate a Game Category key which will be have the same value irrespective of the  betting service
    return exports.clean_symbols(val).toLowerCase();
}

exports.generateGameID = function(val)
{
    //TODO :  generate a Game ID which will be have the same value irrespective of the  betting service
    var x = val.toLowerCase();
    return  exports.clean_symbols(x.trim())
}

exports.generateSortedGameID = function(val)
{
    //TODO :  generate a Game ID with letters sorted alphabetically in ascending order which will be have the same value irrespective of the  betting service
    var x = val.toLowerCase();
    var z = x.split('').sort();
    return  exports.clean_symbols(z.join())
}


exports.clean = function(val)
{
    return val.trim().replace(/ /g, '');
}
exports.getSignificantKey = function(val)
{
    var x = '';
    val.split(' ').forEach(function (key)
    {
        if(key.trim().length > x.length )
        {
            x = key.trim();
        }

    })

    return x.toLowerCase();
}


exports.clean_symbols = function(val)
{
    return val.trim().replace(/ |-|\.|\?|\/|\\|:|,|\|/g, '');
}

exports.exec_db= function(db, callback)
{
    if(GLOBAL.db_conn_status == 0) //TODO  Please FIX. Determine if the connection to MongoDB is still alive else Reconnect and execute the callback
    {
        db.open(function(err,db)
        {
           if(!err)
           {
               callback();
               GLOBAL.db_conn_status == 1;
           }

        });
    }
    else
    {
        callback();
    }
}


exports.getDefaultRequestOption = function()
{
    return {
        uri: '',
        jar: true,
        headers: {

            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0'



        }

        //proxy: 'http://127.0.0.1:8080',
       
    };
}

exports.validate_odds = function(odds, count)
{
    if((odds == undefined) || odds == null)
    {
        return false;
    }

    if(odds.length == 0)
    {
        return false;
    }

    if(odds.length == count)
    {
        return true;
    }
    else
    {
        return false;
    }
}

exports.schedule_recurrent_job= function (scheduler,minutes,callback )
{
    var rule = scheduler.recurrenceRule()
    rule.minute = new scheduler.Range(0, 59, minutes);

    scheduler.scheduleJob(rule, function()
    {
        try{
            callback();
        }
        catch(ex)
        {
            console.log(ex);
        }
    });
}


exports.getTimestamp = function(date_time)
{
    var temp = date_time.split(' ');
    if(temp.length < 2)
    {
        return -1;
    }
    var date = temp[0].split('.');
    var time = temp[1].split(':');

    var tp = Date.UTC(parseInt('20'+ date[2]), parseInt(date[1]) - 1,parseInt(date[0]), parseInt(time[0]), parseInt(time[1]) )

    return tp;

}

exports.validate_date = function(timestamp)
{


    if((Date.now() - timestamp )< constants.TIMESTAMP_DIFFERENCE)
    {
        constants = null;
        return false;
    }
    constants = null;
    return true;
}

exports.is_allowed_type = function(key)
{
    var x = false;
    constants.ALLOWED_GAME_TYPES.forEach( function(val)
    {
        if(key.match(val) != null)
            x=true;
    });
    return x;

}


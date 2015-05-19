/**
 * Created by olaokenyi on 5/11/15.
 */


exports.generateGameCategoryKey = function(val)
{
    //TODO generate a Game Category key which will be have the same value irrespective of the  betting service
    return exports.clean_symbols(val).toLowerCase();
}

exports.generateGameID = function(val)
{
    //TODO :  generate a Game ID which will be have the same value irrespective of the  betting service
    return exports.clean_symbols(val).toLowerCase();
}


exports.clean = function(val)
{
    return val.trim().replace(/ /g, '');
}


exports.clean_symbols = function(val)
{
    return val.trim().replace(/ |-|\.|\?|\/|\\|:/g, '');
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
        proxy: 'http://127.0.0.1:8080',
        headers: {

            'User-Agent': 'request'
        }
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
    rule.minute = new schedule.Range(0, 59, minutes);

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
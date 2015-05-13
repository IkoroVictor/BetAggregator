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
    return val.trim().replace(/ |-|:/g, '');
}

exports.exec_db= function(db, callback)
{
    if(!db.isOpen())
    {
        db.open(function(err,db)
        {
           callback();
        });
    }
    else
    {
        callback();
    }
}
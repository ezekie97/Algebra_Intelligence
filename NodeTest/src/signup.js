var mongo = require("mongodb");

exports.signup = function(user,pass,callback){
    var url = 'mongodb://localhost:27017/algebra_intelligence';
    // Use connect method to connect to the Server
    mongo.MongoClient.connect(url, function (err, db) {
        hasUser(db, {"username": user},user, function (isNew) {
            if(isNew){
                addUser(db,user,pass,function(){
                })
                db.close();
                callback("Complete",true);
            }
            else{
                db.close();
                callback("Username already taken, please enter a another name!",false);

            }
        });
    });
}

var hasUser = function (db, jsonQuery, user, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    // Find some documents
    collection.find(jsonQuery).toArray(function (err, results) {
        // no results, user doesn't exist. Add them!
        callback(results.length == 0);
    });
}

var addUser = function(db,user,pass,callback){
    var collection = db.collection('users');

    var doc = {"username":user,
                "pass":pass,
                "Expressions (Addition)":1,
                "Expressions (Subtraction)": 1,
                "Quadratic Roots" : 1,
                "Linear Equation" : 1};
    collection.insertOne(doc);
    callback(true);
}
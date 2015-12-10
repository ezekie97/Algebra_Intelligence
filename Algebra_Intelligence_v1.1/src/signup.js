var Mongo = require("mongodb");
var Crypto = require("crypto");
/**
 * Sign up for Algebra Intelligence. Ensure that the username and password are
 * of appropriate length, and that the username is not already taken.
 * @param username The username to sign up.
 * @param password The password of the user signing up.
 * @param callback Callback function to perform upon completion of an asynchronous call.
 */
exports.signup = function(username,password,callback){
    if(username.length > 3){
        if(password.length > 5){
            var url = 'mongodb://localhost:27017/algebra_intelligence';
            // Use connect method to connect to the Server
            Mongo.MongoClient.connect(url, function (err, db) {
                hasUser(db, {"username": username}, function (isNew) {
                    if(isNew){
                        addUser(db,username,password,function(){
                        });
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
        else{
            callback("Invalid Password! Length was too short!",false);
        }
    }
    else{
        callback("Invalid Username! Length was too short!", false);
    }

};

/**
 * Check if a user already exists
 * @param db The Mongo Database, should be 'algebra_intelligence'.
 * @param jsonQuery A query that is a JSON object holding the username in question.
 * @param callback Callback function called upon completion of an asynchronous call.
 */
var hasUser = function (db, jsonQuery, callback) {
    // Get the documents collection
    var collection = db.collection('users');
    // Find some documents
    collection.find(jsonQuery).toArray(function (err, results) {
        // no results, user doesn't exist. Add them!
        callback(results.length == 0);
    });
};

/**
 * Add a new and verified user to the 'users' collection of the 'algebra_intelligence' database.
 * @param db The Mongo Database, should be 'algebra_intelligence'.
 * @param username The username of the new user.
 * @param password The password of the new user.
 * @param callback Callback function called upon completion of an asynchronous call.
 */
var addUser = function(db,username,password,callback){
    var collection = db.collection('users');
    var md5 = Crypto.createHash("md5");
    md5.update(password);
    password = md5.digest("hex");
    var doc = {"username":username,
                "pass":password,
                "Expressions (Addition)":1,
                "Expressions (Subtraction)": 1,
                "Quadratic Roots" : 1,
                "Linear Equations" : 1};
    collection.insertOne(doc);
    callback(true);
};
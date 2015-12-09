/*
 Run this file to add all templates to the "users" collection.
 Make sure the collection "users" is created (and preferably empty)
 in the "algebra_intelligence" database first. Run this whenever a new
 template is added or if something messes up before presentation day.
 */

var Mongo = require('mongodb');
var Crypto = require('crypto');

var url = 'mongodb://localhost:27017/algebra_intelligence';
// Use connect method to connect to the Server
Mongo.MongoClient.connect(url, function (err, db) {
    var collection = db.collection('users');
    var md5 = Crypto.createHash("md5");
    // User Bill - Varying Levels
    var pass = "12345";
    md5.update(pass);
    pass = md5.digest("hex");
    var user = {"username":"Bill", "pass":pass, "Expressions (Addition)":4, "Expressions (Subtraction)":3,
                "Quadratic Roots":2, "Linear Equations": 1};
    collection.insertOne(user);

    // User Lori - Varying Levels
    pass = "12345";
    md5 = Crypto.createHash("md5");
    md5.update(pass);
    pass = md5.digest("hex");
    user = {"username":"Lori", "pass":pass, "Expressions (Addition)":4, "Expressions (Subtraction)":3,
        "Quadratic Roots":2, "Linear Equations": 1};
    collection.insertOne(user);

    // User Lvl1 - Level 1 in Everything
    pass = "1";
    md5 = Crypto.createHash("md5");
    md5.update(pass);
    pass = md5.digest("hex");
    user = {"username":"Lvl1", "pass":pass, "Expressions (Addition)":1, "Expressions (Subtraction)":1,
        "Quadratic Roots":1, "Linear Equations": 1};
    collection.insertOne(user);

    // User Lvl2 - Level 2 in Everything
    pass = "2";
    md5 = Crypto.createHash("md5");
    md5.update(pass);
    pass = md5.digest("hex");
    user = {"username":"Lvl2", "pass":pass, "Expressions (Addition)":2, "Expressions (Subtraction)":2,
        "Quadratic Roots":2, "Linear Equations": 2};
    collection.insertOne(user);

    // User Lvl3 - Level 3 in Everything
    pass = "3";
    md5 = Crypto.createHash("md5");
    md5.update(pass);
    pass = md5.digest("hex");
    user = {"username":"Lvl3", "pass":pass, "Expressions (Addition)":3, "Expressions (Subtraction)":3,
        "Quadratic Roots":3, "Linear Equations": 3};
    collection.insertOne(user);

    // User Lvl4 - Level 4 in Everything
    pass = "4";
    md5 = Crypto.createHash("md5");
    md5.update(pass);
    pass = md5.digest("hex");
    user = {"username":"Lvl4", "pass":pass, "Expressions (Addition)":4, "Expressions (Subtraction)":4,
        "Quadratic Roots":4, "Linear Equations": 4};
    collection.insertOne(user);

    // User Lvl5 - Level 5 in Everything
    pass = "5";
    md5 = Crypto.createHash("md5");
    md5.update(pass);
    pass = md5.digest("hex");
    user = {"username":"Lvl5", "pass":pass, "Expressions (Addition)":5, "Expressions (Subtraction)":5,
        "Quadratic Roots":5, "Linear Equations": 5};
    collection.insertOne(user);

    // An admin account
    pass = "admin";
    md5 = Crypto.createHash("md5");
    md5.update(pass);
    pass = md5.digest("hex");
    user = {"username":"admin", "pass":pass, "Expressions (Addition)":1, "Expressions (Subtraction)":1,
        "Quadratic Roots":1, "Linear Equations": 1};
    collection.insertOne(user);

    db.close();
});
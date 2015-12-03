/*
 Run this file to add all templates to the "users" collection.
 Make sure the collection "users" is created (and preferably empty)
 in the "algebra_intelligence" database first. Run this whenever a new
 template is added or if something messes up before presentation day.
 */

var Mongo = require("mongodb");

var url = 'mongodb://localhost:27017/algebra_intelligence';
// Use connect method to connect to the Server
Mongo.MongoClient.connect(url, function (err, db) {
    var collection = db.collection('users');

    // User Bill - Varying Levels
    var user = {"username":"Bill", "pass":"12345", "Expressions (Addition)":4, "Expressions (Subtraction)":3,
                "Quadratic Roots":2, "Linear Equations": 1};
    collection.insertOne(user);

    // User Lori - Varying Levels
    user = {"username":"Lori", "pass":"12345", "Expressions (Addition)":4, "Expressions (Subtraction)":3,
        "Quadratic Roots":2, "Linear Equations": 1};
    collection.insertOne(user);

    // User Lvl1 - Level 1 in Everything
    user = {"username":"Lvl1", "pass":"1", "Expressions (Addition)":1, "Expressions (Subtraction)":1,
        "Quadratic Roots":1, "Linear Equations": 1};
    collection.insertOne(user);

    // User Lvl2 - Level 2 in Everything
    user = {"username":"Lvl2", "pass":"2", "Expressions (Addition)":2, "Expressions (Subtraction)":2,
        "Quadratic Roots":2, "Linear Equations": 2};
    collection.insertOne(user);

    // User Lvl3 - Level 3 in Everything
    user = {"username":"Lvl3", "pass":"3", "Expressions (Addition)":3, "Expressions (Subtraction)":3,
        "Quadratic Roots":3, "Linear Equations": 3};
    collection.insertOne(user);

    // User Lvl4 - Level 4 in Everything
    user = {"username":"Lvl4", "pass":"4", "Expressions (Addition)":4, "Expressions (Subtraction)":4,
        "Quadratic Roots":4, "Linear Equations": 4};
    collection.insertOne(user);

    // User Lvl5 - Level 5 in Everything
    user = {"username":"Lvl5", "pass":"5", "Expressions (Addition)":5, "Expressions (Subtraction)":5,
        "Quadratic Roots":5, "Linear Equations": 5};
    collection.insertOne(user);

    // An admin account
    user = {"username":"admin", "pass":"admin", "Expressions (Addition)":1, "Expressions (Subtraction)":1,
        "Quadratic Roots":1, "Linear Equations": 1};
    collection.insertOne(user);

    db.close();
});
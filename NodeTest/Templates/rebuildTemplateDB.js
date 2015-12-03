/*
    Run this file to add all templates to the "templates" collection.
    Make sure the collection "templates" is created (and preferably empty)
    in the "algebra_intelligence" database first. Run this whenever changes are made
    to the templates.
 */

var EvaluateExpressionAddTemplate = require('./evaluateExpressionAddTemplate.js');
var EvaluateExpressionSubtractTemplate = require('./evaluateExpressionSubtractTemplate.js');
var QuadraticRootTemplate = require('./quadraticRootTemplate.js');
var SolveLinearEquationTemplate = require('./solveLinearEquationTemplate.js');
var Mongo = require("mongodb");

var url = 'mongodb://localhost:27017/algebra_intelligence';
// Use connect method to connect to the Server
Mongo.MongoClient.connect(url, function (err, db) {
    var collection = db.collection('templates');

    // Expression Addition Template
    var category = new EvaluateExpressionAddTemplate().getCategory();
    collection.insertOne({"category": category, "source":"" + EvaluateExpressionAddTemplate});

    // Expression Subtraction Template
    var category = new EvaluateExpressionSubtractTemplate().getCategory();
    collection.insertOne({"category": category, "source":"" + EvaluateExpressionSubtractTemplate});

    // Quadratic Root Template
    var category = new QuadraticRootTemplate().getCategory();
    collection.insertOne({"category": category, "source":"" + QuadraticRootTemplate});

    // Linear Equation Template
    var category = new SolveLinearEquationTemplate().getCategory();
    collection.insertOne({"category": category, "source":"" + SolveLinearEquationTemplate});
    db.close();
});
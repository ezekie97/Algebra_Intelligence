var mongo = require("mongodb");
var url = 'mongodb://localhost:27017/algebra_intelligence';
// Use connect method to connect to the Server
mongo.MongoClient.connect(url, function (err, db) {
    var collection = db.collection('templates');
    //collection.insertOne({"evalAdd": ""+EvaluateExpressionAddTemplate}); //varies from file.
    db.close();
});

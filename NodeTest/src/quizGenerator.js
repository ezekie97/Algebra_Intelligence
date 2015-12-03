/*var Random = require('./random.js');
var Async = require('async');
var Mongo = require('mongodb');
var Quiz = require('./quiz');
var Question = require('./question.js');
var Factor = require('./factor.js');
var Set = require('collections/set');


function QuizGenerator(userRatings) {
    this.ratings = userRatings;

    this.generate = function (callback) {
        var templates = [];
        Async.times(5,
            function (n, next) {
                loadTemplate("Expressions (Addition)",
                function(template){
                    templates.push(template);
                });
                next()
            },
            function (n) {
                callback(n);
            });
    }

    var loadTemplate = function (category, callback) {
        var url = 'mongodb://localhost:27017/algebra_intelligence';
        Mongo.MongoClient.connect(url, function (err, db) {
            var collection = db.collection('templates');
            var query = {"category": category};
            collection.find(query).toArray(function (err, info) {
                // Should only have 1 result. 
                var src = info[0].source;
                var Template = null;
                eval("Template = " + src + ";");
                db.close();
                callback(Template);
            });
        });
    };
}


var f1 = function (word) {
    console.log(word);
}

}


var q = new QuizGenerator(null);
q.generate(
    function (a) {
        console.log(a)
    }
);*/
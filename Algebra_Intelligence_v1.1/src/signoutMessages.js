var Random = require('./random.js');
/**
 * Get a random sign out message.
 * @returns {string}
 */
exports.getRandomSignOutMessage = function(){
    var messages = [
        "Signing Out",
        "</3",
        "See You Soon!",
        "Later!",
        "Goodbye!",
        "Welcome to Alg....Oh You're Leaving?",
        "...",
        "Arrivederci!",
        "Hope We Helped!",
        "tuO gningiS",
        '"I Had Way Too Much Fun With These Sign Out Messages"   - Bill',
        "Farewell",
        "We Shall Meet Again!",
        "What? Too Hard For You?",
        "They Always Come Back....",
        ": ' ("
    ];
    var randInt = new Random().generateRandomInteger(0,messages.length-1);
    return messages[randInt];
};

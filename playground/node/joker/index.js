const jokes = require("give-me-a-joke");
const colors = require('colors');
const cowsay = require('cowsay');
jokes.getRandomDadJoke(function (joke) {
    const cow = cowsay.say({
        text: joke.rainbow,
        e: "oO", // eyes
        T: "U " // tongue
    });
    console.log(cow);
});
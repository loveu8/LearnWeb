const subreddits = ['cringe', 'books', 'chickens', 'funny', 'pics', 'soccer', 'gunners'];

for (let i = 0; i < subreddits.length; i++) {
    console.log(`Vist reddit.com/r/${subreddits[i]}`);
}
console.log("---------------------------------");
// For of Objects
for (let value of subreddits) {
    console.log(`Vist reddit.com/r/${value}`);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]; //DON'T CHANGE THIS LINE PLEASE!

// WRITE YOUR LOOP BELOW THIS LINE:
for (let num of numbers) {
    console.log(num * num);
}

// Iterating
const testScores = {
    keenan: 80,
    damon: 67,
    kim: 89,
    shawn: 91,
    marlon: 72,
    dwayne: 77,
    nadia: 83,
    elvira: 97,
    diedre: 81,
    vonnie: 60
}

for (let person in testScores) {
    console.log(person); // keenan, damon, ...
}

let total = 0;
let scores = Object.values(testScores);
for (let score of scores) {
    total += score;
}

console.log(total / scores.length);
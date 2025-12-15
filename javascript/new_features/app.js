// old way to set up a value
function rollDie(numSides) {
    if (numSides === undefined) {
        numSides = 6;
    }
    return Math.floor(Math.random() * numSides) + 1;
}

// new way to set up default params
function rollDi2(numSides = 6) {
    return Math.floor(Math.random() * numSides) + 1;
}

// set up default params, alsways let it be param 2 and more
function greet(person, msg = "Hey there", punc = "!!!") {
    console.log(`${msg}, ${person} ${punc}`);
}

// array spread
const nums = [10, 977, 12, 2, 6, 75, 623, 45, 12, 5, 69, 48];
Math.max(...nums);
console.log(...nums); // it will be like console.log(10,977,12, ...);

const cats = ['Blue', 'Scount', 'Rocket'];
const dogs = ['Rusty', 'Wyatt'];
const allPets = [...cats, ...dogs];
console.log(allPets);

// spread object
const feline = { legs: 4, family: 'Felidae' };
const canine = { ifFurry: true, family: 'Caninae' };

const catDog = { ...feline, ...canine };

let dataFormForm = {
    email: 'xxxx123@kgmail.com',
    username: '123123'
}

const newUser = { ...dataFormForm, id: 2345, isAdmin: false };

// REST
function sum() {
    console.log(arguments);
}
// it will show you pass value
sum(1, 2);

function sum(...nums) {
    return nums.reduce((total, el) => total + el);
}

// destructuring array
const scores = [484984, 4899, 21289, 5521, 519, 1213];

const highScore = scores[0];
const secondHighScore = scores[1];

// gold = 484984 , silver = 4899
const [gold, silver, bronze, ...everyoneElse] = scores;

// destructuring object
const user = {
    email: 'xxxx@gmail.com',
    firstName: 'Qoo',
    lastName: 'ABC'
};

// normal way
// const email = user.email;
// const firstName = user.firstName;

// get user.email and user.firstName
const { email, firstName } = user;

// it will change user.firstName to name
const { firstName: name } = user;

const user2 = {
    city: 'Tulsa',
    state: 'Oklahoma',
    firstName: 'YUU',
    lastName: 'CBA'
};

// we also set up default value
const { city, state, died = 'N/A' } = user2;

// destructuring param
function fullName(user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
}

function fullName2({ firstName, lastName = 'jkjkovjwe' }) {
    return `${firstName} ${lastName}`;
}

const movies = [
    {
        title: 'Amadeus',
        score: 99,
        year: 1986
    },
    {
        title: 'Sharknado',
        score: 35,
        year: 2013
    },
    {
        title: '13 Going On 30',
        score: 70,
        year: 2004
    },
    {
        title: 'Stand By Me',
        score: 85,
        year: 1986
    },
    {
        title: 'Waterworld',
        score: 62,
        year: 1995
    },
    {
        title: 'Jingle All The Way',
        score: 71,
        year: 1996
    },
    {
        title: 'Alien',
        score: 90,
        year: 1979
    }
];

// movies.filter((movie) => movie.score >= 90);

// if we only get some data
movies.filter(({ score }) => score >= 90);

movies.map(movie => {
    return `${movie.title} (${movie.year}) is rated ${movie.score} `;
});

movies.map(({ title, year, score }) => {
    return `${title} (${year}) is rated ${score} `;
});
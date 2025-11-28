let cats = ['blue', 'kitty'];
let dogs = ['rusty', 'wyatt'];

// concat , connect array to the end , but not modify origanl array object
cats.concat(dogs);

console.log(cats);

dogs.concat(cats);

console.log(dogs);

// includes , show some element is there or not. true / false
cats.includes('blue');
cats.includes('yellow');

// indexOf , show some element is there , if it exists , show index
cats.indexOf('kitty'); // 1

cats.indexOf('loin'); // -1 means not there

// reserve , change the organial array order to opposite
let comboParty = cats.concat(dogs);
console.log(comboParty);
comboParty.reverse();
console.log(comboParty);

// slice , we can use slice to pick elments what I want to
let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
colors.slice();     // copy a array
colors.slice(2);    // get after you chose the index of all elements
colors.slice(2, 4); //  get element 2 to 3 , not 4

// splice , changes the contents of an array by removing or replaceing existing elements
colors.splice(5, 1);
let days = ['Monday', 'Tuesday', 'Wednesday'];
days.splice(1, 2);
colors.splice(1, 0, 'orange');
colors.splice(3, 0, 'yellow-green', 'forestgreen');

// sort , converting the elements into string , then comparing their UTF-16 cpde units
let scores = [1, 70, 100, 2500, 9, -12, 0, 34];

// array equals testing
// normal 'hi' === 'hi' // true
// if we compare like this , it will be false because it compare memory
['hi', 'bye'] === ['hi', 'bye']; // false

let nums = [1, 2, 3];
let numsCopy = nums; // it means numsCopy link to nums memory address
nums.push(4);
numsCopy;
nums === numsCopy;

// normal valuable
const PI = 3.14159; // const , we can not change it.
PI += 1;

// object
const qqNums = [1, 2, 3];
qqNums.push(4);
qqNums;

let aaNums = [3, 2, 1];
qqNums = aaNums; // error

// Mutli Dismensional Array
const gameBoard = [
    ['X', 'O', 'X'],
    ['O', null, 'X'],
    ['O', 'O', 'X']
]

gameBoard[1];
gameBoard[1][2];
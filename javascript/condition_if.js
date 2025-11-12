let rating = 3;
if (rating === 3) {
    console.log('YOU ARE A SUPERSTAR');
}

// if practice
console.log('before');
let random = Math.random();
if (random < 0.5) {
    console.log('You number is less than < 0.5');
} else {
    console.log('Your number is greater (or equal 0.5)');
}
console.log(random);
console.log('before');

// else if and else
let dayOfWeek = prompt('enter a day').toLocaleLowerCase();
console.log('dayOfWeek : ' + dayOfWeek + ':test : ' + dayOfWeek === 'monday');
if (dayOfWeek === 'monday') {
    console.log('I hate monday');
} else if (dayOfWeek === 'friday') {
    console.log('I love weekend');
} else if (dayOfWeek === 'saturday') {
    console.log('awesome!!!');
} else if (dayOfWeek === 'sunday') {
    console.log('a little bit bule');
} else {
    console.log('MEH');
}

// age pracie
/*
 0-5   FREE
 5-10  Child  $10
11-65  ADULT  $20
 65+   SENIOR $10
*/

let age = 8;
if (age < 5) {
    console.log('you are free');
} else if (age < 11) {
    console.log('you are a child.  You pay $10');
} else if (age < 66) {
    console.log('you are a ADULT.  You pay $20');
} else {
    console.log('you are a SENIOR. You pay $10');
}


// code practice
function getColor(phrase) {
    //WRITE YOUR CODE BETWEEN THIS LINE: ↓ ↓ ↓ ↓ 
    if (phrase === 'stop') {
        console.log('red');
    } else if (phrase === 'slow') {
        console.log('yellow');
    } else if (phrase === 'go') {
        console.log('green');
    } else {
        console.log('purple');
    }
    //AND THIS LINE ↑↑↑↑↑
}


// nesting condition example
const password = prompt("please enter a new password");

// Password must be 6+ char
if (password.length >= 6) {
    console.log("password enough length");
    // Password cannot include space
    if (password.indexOf(" ") === -1) {
        console.log('Good job! No space');
    } else {
        console.log('password can not include space');
    }
} else {
    console.log("password is too short");
}
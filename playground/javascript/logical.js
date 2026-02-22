// Logical AND OR NOT
// &&  -> AND
// ||  -> OR
// !   -> NOT
true && true    // true
true && false   // false
false && true   // false
false && false  // false

// logical AND &&
// const password = prompt("Enter your password");
// if (password.length >= 6 && password.indexOf(' ') === -1) {
//     console.log("VALID PASSWORD");
// } else {
//     console.log("INCORRECT FORMAT FOR PASSWORD");
// }

// logical OR ||
true || true    // true
true || false   // true
false || true    // true
false || false   // false

// 0-5      free
// 6-10     $10
// 11-65    $20
// 65+      free
const age = 90;
if (age >= 0 && age < 5 || age >= 65) {
    console.log("Free");
} else if (age >= 5 && age < 10) {
    console.log("$10");
} else if (age >= 10 && age < 65) {
    console.log("$20");
} else {
    console.log("INVALID AGE!");
}

// Logical NOT
!null // true
!(0 === 0) // false
!(3 <= 4) // false

const firstName = prompt("enter your first name");
if (!firstName) {
    firstName = prompt("Try Again!!!");
}

const age2 = 45;
if (!age >= 0 && age < 5 || age >= 65) {
    console.log('YOU ARE NOT A BADY OR A SENIOR!');
}
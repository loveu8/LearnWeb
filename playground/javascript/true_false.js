const userInput = prompt("Enter something");

// if userInput have something will be true;
if (userInput) {
    console.log("TRUTHY!");
} else {
    console.log("FALSY!");
}
/* Notice !!
    Falsey values 
    false
    0
    ""(empty string)
    null
    undefined
    NaN
*/
if (0) {
    console.log("TRUTHY!");
} else {
    console.log("FALSY!");
}
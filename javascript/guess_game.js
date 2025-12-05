let num = parseInt(prompt("Enter the maximum number!"));

while (!num) {
    num = parseInt(prompt("Enter the maximum number!"));
}

const targeNum = Math.floor(Math.random() * num) + 1;
console.log('targeNum : ' + targeNum);

let guess = prompt("Enter your first guess! (Type 'q' to quit)");
let attempts = 1;

while (guess !== targeNum) {
    if (guess === 'q') {
        break;
    }
    guess = parseInt(guess);

    if (guess > targeNum) {
        guess = prompt("Too high! Enter a new guess:");
        attempts++;
    } else if (guess < targeNum) {
        guess = prompt("Too low! Enter a new guess:");
        attempts++;
    } else {
        guess = prompt("Invalid guess. Please enter a number or 'q' to quit");
    }
}
if (guess === 'q') {
    console.log("OK, YOUR QUIT");
} else {
    console.log(`YOU GOT IT, IT took you ${attempts} guesses`);
}
const add = function (x, y) {
    return x + y;
}

const square = function (input) {
    return input * input;
}

// High Order function
function callTwice(func) {
    func();
    func();
}

function callTenTimes(f) {
    for (let i = 0; i < 10; i++) {
        f();
    }
}

function rollDie() {
    const roll = Math.floor(Math.random() * 6) + 1;
    console.log(roll);
}
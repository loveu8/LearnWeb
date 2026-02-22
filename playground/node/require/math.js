const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const square = x => x * x;
const PI = 3.14159;

// It tell node , this is a module
module.exports = {
    add,        // ES6 Shorthand: 等同於 add: add
    subtract,
    square,
    PI
};
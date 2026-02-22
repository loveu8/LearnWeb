const add = (x, y) => {
    return x + y;
};

const square = (x) => {
    return x * x;
}

const square2 = num => {
    return num * num;
}

const rollDie = () => {
    return Math.floor(Math.random() * 6) + 1;
}

// implict return
const rollDie2 = () => (
    Math.floor(Math.random() * 6) + 1
);

// only one express can use this short way to return;
const add2 = (a, b) => a + b;
const button = document.querySelector('button');
const button2 = document.querySelector('#changeColor');
const container = document.querySelector('#container');

button2.addEventListener('click', function (e) {
    container.style.backgroundColor = randomColor();
    // it will help us to stop event 
    // going back find parents to trigger parent's events
    e.stopPropagation();
});

container.addEventListener('click', function () {
    container.classList.toggle('hide');
});

function randomNum(num) {
    return Math.floor(Math.random() * num) + 1;
}

const randomColor = () => {
    const num = 255;
    return `rgb(${randomNum(num)}, ${randomNum(num)}, ${randomNum(num)})`
}



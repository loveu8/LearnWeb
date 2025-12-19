function random1To255() {
    return Math.floor(Math.random() * 255) + 1;
}

const randomColor = () => {
    return `rgb(${random1To255()}, ${random1To255()}, ${random1To255()})`
}

document.querySelector('#cc').addEventListener('click', function () {
    const body = document.querySelector("body");
    const newColor = randomColor();
    body.style.backgroundColor = newColor;
    document.querySelector('h1').textContent = newColor;
});
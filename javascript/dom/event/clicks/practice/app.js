function random1To255() {
    return Math.floor(Math.random() * 255) + 1;
}

document.querySelector('#cc').addEventListener('click', function () {
    const red = random1To255();
    const green = random1To255();
    const blue = random1To255();
    const body = document.querySelector("body");
    const color = `rgb(${red}, ${green}, ${blue})`;
    body.style.backgroundColor = color;
    document.querySelector('h1').textContent = color;
});
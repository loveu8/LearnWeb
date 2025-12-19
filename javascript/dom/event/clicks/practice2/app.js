function random1To255() {
    return Math.floor(Math.random() * 255) + 1;
}

const randomColor = () => {
    return `rgb(${random1To255()}, ${random1To255()}, ${random1To255()})`
}

const buttons = document.querySelectorAll('button');

for (let btn of buttons) {
    btn.addEventListener('click', function () {
        console.log(this.tagName);
        this.style.backgroundColor = randomColor();
        this.style.color = randomColor();
    })
}
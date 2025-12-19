const p1Btn = document.querySelector('#p1Button');
const p1Display = document.querySelector('#p1Display');
const p2Btn = document.querySelector('#p2Button');
const p2Display = document.querySelector('#p2Display');
const resetBtn = document.querySelector('#reset');
const title = document.querySelector('h1');

p1Btn.addEventListener('click', function (e) {
    p1Display.innerHTML = parseInt(p1Display.innerHTML) + 1;
    checkWin();
});

p2Btn.addEventListener('click', function (e) {
    p2Display.innerHTML = parseInt(p2Display.innerHTML) + 1;
    checkWin();
});

resetBtn.addEventListener('click', function (e) {
    resetScore();
});

function resetScore() {
    p1Display.innerHTML = "0";
    p2Display.innerHTML = "0";
    p1Btn.disabled = false;
    p2Btn.disabled = false;
    p1Display.className = "";
    p2Display.className = "";
}

const selectElement = document.querySelector('#playto');

selectElement.addEventListener('change', (event) => {
    const currentValue = event.target.value;
    console.log("Winner Value:", currentValue);
    console.log("Element Value:", selectElement.value);
});

function checkWin() {
    let p1Score = parseInt(p1Display.innerHTML);
    let p2Score = parseInt(p2Display.innerHTML);
    let winScore = parseInt(selectElement.value);
    if (p1Score >= winScore) {
        p1Display.classList.add('has-text-success'); // 使用 CSS Class 而非 Inline Style
        p2Display.classList.add('has-text-danger');
        p1Btn.disabled = true;
        p2Btn.disabled = true;
        setTimeout(() => {
            alert('Player One win');
        }, 50);
    }
    if (p2Score >= winScore) {
        p2Display.classList.add('has-text-success'); // 使用 CSS Class 而非 Inline Style
        p1Display.classList.add('has-text-danger');
        p1Btn.disabled = true;
        p2Btn.disabled = true;
        setTimeout(() => {
            alert('Player Two win');
        }, 50);
    }
}
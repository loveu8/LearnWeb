// 1. 資料結構設計：用物件管理狀態，而不是 DOM
const p1 = {
    score: 0,
    button: document.querySelector('#p1Button'),
    display: document.querySelector('#p1Display')
};

const p2 = {
    score: 0,
    button: document.querySelector('#p2Button'),
    display: document.querySelector('#p2Display')
};

const resetBtn = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');

let isGameOver = false;

// 2. 抽象化邏輯：消除重複的點擊事件
function updateScores(player, opponent) {
    if (!isGameOver) {
        player.score += 1;
        player.display.textContent = player.score; // 更新資料投影

        if (player.score === parseInt(winningScoreSelect.value)) {
            isGameOver = true;
            player.display.classList.add('has-text-success'); // 使用 CSS Class 而非 Inline Style
            opponent.display.classList.add('has-text-danger');
            player.button.disabled = true;
            opponent.button.disabled = true;

            // 關鍵：使用 setTimeout 讓瀏覽器先更新 UI 再彈窗
            setTimeout(() => {
                alert(`勝利者已產生！`);
            }, 50);
        }
    }
}

p1.button.addEventListener('click', () => updateScores(p1, p2));
p2.button.addEventListener('click', () => updateScores(p2, p1));

// 重設邏輯也應該抽象化
resetBtn.addEventListener('click', reset);

function reset() {
    isGameOver = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove('has-text-success', 'has-text-danger');
        p.button.disabled = false;
    }
}
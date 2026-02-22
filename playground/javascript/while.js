/* === While Loop Note ===
  核心風險：Infinite Loop (無限迴圈)
  防禦關鍵：必須確保 Loop 內部的邏輯最終會讓條件變成 false。
*/

// ❌ Bad Use Case (易錯、囉唆)
// 單純數數建議改用 for loop，避免忘記寫 count++
let count = 0;
while (count < 10) {
    console.log(count);
    count++; // 這一行如果忘了，瀏覽器就會當機
}

// ✅ Good Use Case (意圖清晰)
// 當次數未知，依賴外部狀態改變時使用
let fuel = 100;

function drive() {
    fuel--;
    console.log(`fuel left : ${fuel}`);
}

while (fuel > 0) {
    drive(); // 這個動作會消耗油量，最終讓 fuel <= 0
}

let isDataLoaded = false;
let attempts = 0;

// "只要資料還沒載入，且嘗試次數少於 5 次，就繼續跑"
while (!isDataLoaded && attempts < 5) {
    console.log(`Attempting to load data... (Try: ${attempts + 1})`);

    // 模擬：隨機決定是否成功
    if (Math.random() > 0.7) {
        isDataLoaded = true; // 狀態改變：成功了！
    } else {
        attempts++; // 狀態改變：多試了一次
    }
}

if (isDataLoaded) {
    console.log("Success!");
} else {
    console.log("Failed after 5 attempts.");
}
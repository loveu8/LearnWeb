function makeMysteryFunc() {
    const rand = Math.random();
    if (rand > 0.5) {
        return function () {
            console.log("CONTRATS, You win A MILLION DOLLARS!!");
        }
    } else {
        return function () {
            alert("YOU HAVE BEEN INFRETED BY A COMPUTER VIRUS");
            alert("STOP TYRING TO CLOSE THIS WINDOWS!!!");
        }
    }
}

function makeBetweenFunc(min, max) {
    return function (num) {
        return num >= min && num <= max;
    }
}

const testRange = function (num) {
    return num >= 100 && num <= 200;
}

const isAdult = makeBetweenFunc(19, 64);
const isSenior = makeBetweenFunc(65, 120);


// function isBetween(num) {
//     return num >= 50 && num <= 100;
// }

// function isBetween2() {
//     return num >= 1 && num <= 10;
// }

/**
 * Custom Filter HOF (高階函式)
 * 負責：髒活累活 (遍歷陣列、建立新陣列)
 * 不負責：商業邏輯 (誰該留下來)
 * * @param {Array} arr - 資料來源
 * @param {Function} predicateFn - 判斷邏輯 (回傳 true/false)
 */
function myFilter(arr, predicateFn) {
    // 1. 防呆 (Robustness)
    // 如果傳進來的不是陣列，或是 predicateFn 根本不是函式，直接報錯。
    if (!Array.isArray(arr) || typeof predicateFn !== 'function') {
        throw new Error("Invalid arguments: expect (Array, Function)");
    }

    const result = [];

    // 2. 控制流程 (Control Flow)
    // 這裡只寫一次 for 迴圈。以後不管你要過濾什麼，都不用再寫 for 了。
    for (let i = 0; i < arr.length; i++) {
        const currentItem = arr[i];

        // 3. 核心：控制權反轉 (Inversion of Control)
        // myFilter 根本不知道什麼叫 "大於 10"。
        // 它只是問 predicateFn：「這個傢伙要留著嗎？」
        if (predicateFn(currentItem)) {
            result.push(currentItem);
        }
    }

    return result;
}

// --- 執行與驗證 (Verification) ---

const rawData = [4, 15, 2, 30, 9, 12];

// 情境 1: 找出大於 10 的數字
// 這裡我們定義 "規則"，而不是 "流程"
const isGreaterThanTen = function (num) {
    return num > 10;
};

// 執行
const bigNumbers = myFilter(rawData, isGreaterThanTen);

console.log("原始資料:", rawData);
console.log("過濾結果 (>10):", bigNumbers);
// 預期 Output: [15, 30, 12]


// --- 加碼驗證：證明它是通用的 ---

// 情境 2: 找出偶數
// 看到了嗎？我不需要重寫 myFilter，我只需要換一個 "規則"
const isEven = (num) => num % 2 === 0;

console.log("偶數結果:", myFilter(rawData, isEven));
// 預期 Output: [4, 2, 30, 12]
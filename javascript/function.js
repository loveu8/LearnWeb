/*

為了讓這個function完美運作，function必須遵守三個規則：

    Rule 1: 黑盒子 (Abstraction) —— 「我不在乎你怎麼做」

        觀念：Caller 只看「函數名稱」與「參數」。

        意義：隱藏實作細節。你是用 Math.PI 還是手算？是 O(1) 還是 O(n)？不重要，只要結果對就好。

        關鍵字：信任 (Trust)

    Rule 2: 安全區 (Encapsulation) —— 「閒人勿進」

        觀念：函式內部的變數 (State) 只有函式自己能動。

        意義：外部髒手伸不進來，內部變數洩漏不出去。這保證了邏輯的獨立性。

        關鍵字：邊界 (Boundary)

    Rule 3: 契約 (Determinism) —— 「說到做到」

        觀念：給定同樣的 Input，永遠吐出同樣的 Output (Pure Function)。

        意義：沒有驚喜，沒有副作用。這讓程式碼變得可預測、可測試。

        關鍵字：可靠 (Reliability)
*/

/**
 * Area Calculator (Data Transformer)
 * @param {number} radius - 原料 (The only dependency)
 * @returns {number} - 產品 (Deterministic result)
 */
function calculate_area(radius) {
    // Encapsulation: PI 是內部細節，外部管不著
    const PI = 3.14159;

    // Abstraction & Contract: 給我半徑，我承諾給你面積
    return PI * radius * radius;
}

//---------------------
// Define
function singSong() {
    console.log("DO");
    console.log("RE");
    console.log("MI");
}
// Run
singSong();

// practice1
/* 
Heart Function Exercise
 
It's time to write our first function!

    Define a function called printHeart that prints out the string "<3"

    Execute your function once
*/
// Write your function here:
function printHeart() {
    console.log("<3");
}

printHeart();

function greet(firstName) {
    console.log(`Hi there, ${firstName}!`);
}

greet("Lorn");

/**
Rant Exercise

Define a function called rant which accepts a string argument called message.  The function should print out an uppercased version of message 3 times (with 3 separate calls to console.log).  For example, rant("I hate beets") should print out:

    I HATE BEETS
    I HATE BEETS
    I HATE BEETS 
 */

// DEFINE YOUR FUNCTION:
function rant(message) {
    for (let i = 0; i < 3; i++) {
        console.log(message.toUpperCase());
    }
}

rant("I hate beets");


function greet(firstName, lastName) {
    console.log(`Hi there, ${firstName} ${lastName[0]}.!`);
}

greet('Presley', 'Elvis');

function repeat(str, numTimes) {
    let result = '';
    for (let i = 0; i < numTimes; i++) {
        result += str;
    }
    console.log(result);
}

repeat("Hi", 10);

// define isSnakeEyes below:

function isSnakeEyes(arg1, arg2) {
    if (arg1 === 1 && arg2 === 1) {
        console.log("Snake Eyes!");
    } else {
        console.log("Not Snake Eyes!");
    }
}

function add(x, y) {
    if (typeof x !== 'number') {
        return false;
    }
    if (typeof y !== 'number') {
        return false;
    }
    const sum = x + y;
    console.log("add result:", sum);
    return sum;
}
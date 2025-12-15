/* * ==========================================================================
 * JavaScript Survival Guide (Linus Style)
 * 核心哲學：Simplicity (簡潔), Immutability (不可變), No Side Effects (無副作用)
 * ==========================================================================
 */

// ==========================================
// 1. 箭頭函式 (Arrow Functions)
// 核心概念：左邊是原料，右邊是產出。
// ==========================================

// ❌ Garbage (老式寫法)：雜訊太多 (function, return, {})
const oldAdd = function (a, b) {
    return a + b;
};

// ✅ Good Taste (單行)：隱形 return，乾淨俐落
const add = (a, b) => a + b;

// ⚠️ Trap (陷阱)：加上花括號 {} 就必須寫 return
const wrong = (a, b) => { a + b }; // 回傳 undefined (垃圾)
const right = (a, b) => { return a + b }; // 正確，但除非邏輯複雜，否則別這樣寫

// ==========================================
// 2. 陣列處理 (Array Methods) - map & filter
// 核心概念：Pipeline (管線化)，職責分離。
// ==========================================
const prices = [10, 25, 30, 45, 50];

// ❌ Garbage (貪心)：試圖在 filter 裡做 map 的事，或修改外部變數
// 這會導致邏輯混亂和副作用。
let temp = [];
prices.filter(p => {
    if (p > 25) {
        temp.push(p * 0.9); // 🤮 修改外部狀態 (Side Effect)
        return true;
    }
    return false;
});

// ✅ Good Taste (Chaining)：像說故事一樣流暢
// 1. filter: 只負責決定去留
// 2. map:    只負責轉換數據
const finalPrices = prices
    .filter(price => price > 25)  // Step 1: 只要大於 25 的
    .map(price => price * 0.9);   // Step 2: 全部打九折

// ==========================================
// 3. 記憶體與不可變性 (Reference vs Value)
// 核心概念：Filter/Map 是淺拷貝 (Shallow Copy)。
// ==========================================

// Case A: 原始型別 (Number, String) - 安全
const nums = [1, 2, 3];
const newNums = nums.map(n => n * 2);
// nums 還是 [1, 2, 3]，不會被改壞。

// Case B: 物件 (Object) - 危險區 ⚠️
const products = [{ id: 1, val: 10 }, { id: 2, val: 20 }];

// ❌ Fatal Error (直接修改物件)：
// 這會改到原始陣列！因為 map 複製的是「地址 (Reference)」。
const badUpdate = products.map(p => {
    p.val = 999; // 💥 原本的 products 也爆炸了
    return p;
});

// ✅ Good Taste (建立新物件)：
// 使用 Spread Operator (...) 複製內容到新殼
const safeUpdate = products.map(p => ({
    ...p,      // 展開舊屬性
    val: 999   // 覆蓋要改的屬性
}));

// ==========================================
// 4. 邏輯控制 (Control Flow)
// 核心概念：讓特殊情況消失 (Eliminate Special Cases)。
// ==========================================

// ❌ Garbage (巢狀地獄)：閱讀者的負擔
function checkLogin_Bad(user) {
    if (user) {
        if (user.isVerified) {
            if (user.isAdmin) {
                return "Welcome Admin";
            } else {
                return "Welcome User";
            }
        } else {
            return "Verify Email";
        }
    } else {
        return "Please Login";
    }
}

// ✅ Good Taste (Early Return / Guard Clauses)：
// 先處理異常，剩下的就是正常流程。
function checkLogin_Good(user) {
    if (!user) return "Please Login";            // 擋掉沒登入
    if (!user.isVerified) return "Verify Email"; // 擋掉沒驗證

    // 這裡只剩下「已驗證的用戶」
    return user.isAdmin ? "Welcome Admin" : "Welcome User";
}

/* * 結語：
 * 寫程式碼是寫給人看的，順便給機器執行。
 * 如果你需要解釋你的 code，那你的 code 就需要重寫。
 */
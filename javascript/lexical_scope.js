/*
# Lexical Scope (詞法作用域)

## 1. 核心定義 (The Core)
* **決定時機**：在 **代碼撰寫 (Write Time)** 階段就決定了，而不是執行階段 (Run Time)。
* **白話文**：**「函數的勢力範圍，取決於它出生（定義）在哪裡，而不是它被呼叫在哪裡。」**
* **物理定律**：內層可以看到外層，外層看不到內層 (由內向外查找)。

## 2. 作用域鏈 (The Scope Chain)
這是一個 **「往上找爸爸」** 的過程。
當我在函數內使用一個變數 `x`：
1.  **Local**：我肚子裡有沒有 `x`？ (有就用)
2.  **Parent**：我出生的上一層有沒有 `x`？ (有就用)
3.  **Global**：最頂層有沒有 `x`？
4.  **Error**：都沒有？ `ReferenceError`。

## 3. 陷阱 (The Trap)
永遠記住：**別管是誰呼叫了這個函數，只管這個函數寫在哪裡。**
*/

var value = 1; // Global

function foo() {
    console.log(value); // 這裡的 value 是誰？
}

function bar() {
    var value = 2; // Local to bar
    foo(); // 在這裡呼叫 foo
}

bar();
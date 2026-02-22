/* [JS Object] : Unordered Key-Value Map
 -------------------------------------
 本質：Hash Map (類似字典)
 
 ** 核心行為 (Critical Behavior) **
 1. Key 自動轉型：
    即使你寫 obj[123] = true，
    Key 實際上會變成字串 "123"。
    (這就是為什麼 Array index 其實也是字串)

 2. 存取策略 (Access Strategy)：
    - obj.prop      -> 當你知道 Key 的名字時 (Hardcoded)
    - obj[varName]  -> 當 Key 存在變數裡時 (Dynamic)
    
 ** Good Taste Pattern: Lookup Table **
 不要寫 switch-case 或 if-else，用 Object 做查表。
*/

// --- Bad Code (Imperative / Procedural) ---
function getStatus(code) {
    if (code === 1) return 'Start';
    else if (code === 2) return 'Processing';
    else if (code === 3) return 'Done';
    // 每次都要跑完整個 if ，這就是垃圾邏輯
}

// --- Good Code (Declarative / Data-Driven) ---
const STATUS_MAP = {
    1: 'Start',
    2: 'Processing',
    3: 'Done'
};

function getStatusFast(code) {
    // 複雜度 O(1)，沒有邏輯分支，甚至不用 function，直接查表
    return STATUS_MAP[code] || 'Unknown';
}

// 練習題 1
const dictionary = {};

// 我先用數字 1 當 Key
dictionary[1] = 'First Entry';

// 我再用字串 '1' 當 Key
dictionary['1'] = 'Second Entry';

console.log(dictionary[1]);

/*
答案是 B ('Second Entry')。
因為對 JS Object 來說，1 和 '1' 是同一個 Key。 JS 引擎很懶，
它在底層做了一件事：key.toString()。 所以 dictionary[1] 
實際上執行的是 dictionary["1"] = 'First Entry'。 
下一行 dictionary["1"] = 'Second Entry' 直接把前面的值覆蓋掉了。
這就是為什麼我說「Key 一律是字串」。這是硬體限制轉化為軟體抽象時的代價。
*/

// ------------

// 練習題 2
const userA = { name: "Linus" };
const userB = { name: "Bill Gates" };

const config = {};

// 我試圖用 user 物件本身當作 Key
config[userA] = "Linux Kernel";
config[userB] = "Windows BSOD";

// 請問：這行會印出什麼？
console.log(config[userA]);
/**
 *Object 的 Key 一律會被轉成字串。

    當你執行 config[userA] = ... 時，JS 引擎呼叫了 userA.toString()。
        預設的 Object toString 結果是什麼？是字串 "[object Object]"。
        所以記憶體裡存的是：config["[object Object]"] = "Linux Kernel"。

    當你執行 config[userB] = ... 時，JS 引擎呼叫了 userB.toString()。
        結果還是字串 "[object Object]"。
        所以記憶體裡發生了：config["[object Object]"] = "Windows BSOD"。
        蹦！ 前一個值被蓋過去了。

    當你讀取 config[userA]，你其實是在讀取 config["[object Object]"]。
        結果就是最後寫入的那個："Windows BSOD"。
 */

// 補充
/*
☠️ 危險 (Critical Warning)： 不要用 Object 儲存非字串的 Key。
    如果你需要 Number (不轉字串) 當 Key -> 用 Map。
    如果你需要 Object 當 Key -> 用 Map 或 WeakMap。
    Object 只適合用在 Key 確定是簡單字串的場景 (如 Config, Record)。
*/

const person = {
    firstName: 'Mick',
    lastName: 'Jagger'
};

const kitchenSink = {
    favNum: 92319023,
    isFunny: true,
    colors: ['red', 'orange']
};

const years = {
    1999: 'GOOD',
    2020: 'BAD'
};

years['1999'];  // it works
years[1999];    // it still works

const midterms = {
    danielle: 96,
    thomas: 78
};

midterms.thomas = 79;
midterms.danielle = 'A';
midterms.thomas = 'C+';

const commets = [
    { username: 'Tammy', text: 'lololo', votes: 9 },
    { username: 'FishBoi', text: 'glub glub', votes: 12387 },
]

commets[1].text;
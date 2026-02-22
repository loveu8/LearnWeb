/**
 * 檔案名稱: GoodTastePromise.js
 * 描述: 如何像個專業工程師一樣處理 Promise 與 Error Context
 * 核心哲學: 錯誤不是意外，是預期中的狀態。讓錯誤自己帶上身分證。
 */

// 1. 定義結構化錯誤 (Semantic Error)
// 不要只是 throw new Error("failed")，那是給業餘玩家用的。
class RequestError extends Error {
    constructor(message, { stage, url, cause }) {
        // 使用 ES2022 的 'cause' 來保留原始錯誤鏈 (Error Chaining)
        super(message, { cause });
        this.name = "RequestError";
        this.stage = stage; // 業務邏輯階段 (例如: FETCH_USER, UPDATE_CART)
        this.url = url;     // 發生問題的現場 URL
        this.timestamp = Date.now();
    }
}

// 2. 模擬 API (模擬你那段不負責任的請求)
const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const isSuccess = Math.random() > 0.3;
        setTimeout(() => {
            isSuccess ? resolve(`Data from ${url}`) : reject(new Error("Network Timeout"));
        }, 500);
    });
};

// 3. 好品味的 Wrapper
// 它的工作只有一個：確保任何錯誤噴出來時，都帶著足夠的「現場證據」。
async function requestWithContext(stage, url) {
    try {
        console.log(`[Executing] ${stage} -> ${url}`);
        return await fakeRequest(url);
    } catch (err) {
        // 這裡就是我說的「重新規劃錯誤處理」
        // 我們不處理它，我們「包裝」它後拋出，讓上層知道是誰在鬧事。
        throw new RequestError(`${stage} 失敗了`, { stage, url, cause: err });
    }
}

// 4. 業務邏輯層 (The Workflow)
// 這裡保持極致乾淨，沒有任何一個 if (error) 判斷。
async function coffeeWorkflow() {
    // 透過資料結構化，讓流程像一首詩一樣線性。
    const page1 = await requestWithContext("GET_COFFEE_LIST", "api/v1/coffee/page1");
    const page2 = await requestWithContext("GET_DETAILS", "api/v1/coffee/page2");
    const page3 = await requestWithContext("GET_REVIEWS", "api/v1/coffee/page3");

    return [page1, page2, page3];
}

// 5. 統一錯誤處理器 (The Dispatcher)
// 這就是我說的 Lookup Table，消滅那堆噁心的 if-else。
const ErrorHandlers = {
    "GET_COFFEE_LIST": (err) => console.error("🛑 列表都拿不到，直接引導用戶去首頁。"),
    "GET_DETAILS": (err) => console.error("⚠️ 詳情失敗，顯示暫時無法讀取，URL:", err.url),
    "GET_REVIEWS": (err) => console.warn("💡 評論不重要，靜默失敗，不干擾用戶。"),
    "DEFAULT": (err) => console.error("💥 未知崩潰，發送警報到 Sentry。")
};

// 執行與監控
coffeeWorkflow()
    .then(data => console.log("✅ 任務全數完成:", data))
    .catch(err => {
        // 好品味的體現：根據錯誤的 metadata (stage) 決定行為
        // 這裡不需要判斷 URL，不需要比對錯誤字串。
        const handler = ErrorHandlers[err.stage] || ErrorHandlers.DEFAULT;
        handler(err);

        // 如果你需要原始錯誤，它還在 cause 裡面
        // console.error("原始屍體:", err.cause);
    });

/**
 * 
 * * 1. 你還在用 String 判斷錯誤嗎？
 * - 我的範例用 err.stage (Enum 概念)，這才是穩定結構。
 * * 2. 你的錯誤處理跟業務邏輯混在一起嗎？
 * - 看到 ErrorHandlers 了嗎？那叫「解耦」。
 * * 3. Talk is cheap. 把這套邏輯帶進你的生產環境，別再寫那種
 * .catch(e => console.log(e)) 了。
 */
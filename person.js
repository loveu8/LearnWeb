/**
 * Mongoose demo: virtual / methods / statics / middleware
 *
 * 執行前確認：
 * 1) MongoDB 有在跑（127.0.0.1:27017）
 * 2) npm i mongoose
 */

const mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/shopA';

(async function main() {
    try {
        // 1) 連線：用 await 確保後面操作都有連線
        await mongoose.connect(DB_URL);
        console.log('CONNECTION OPEN!!');

        /**
         * 2) Schema：定義資料結構
         *
         * 補充觀念：
         * - Schema 定義「會存進 DB 的欄位」
         * - virtual 定義「不存 DB、讀取時動態算出來的欄位」
         * - method / static 定義「行為（function）」
         */
        const personSchema = new mongoose.Schema(
            {
                first: { type: String, required: true },
                last: { type: String, required: true },
            },
            {
                strict: true, // schema 沒寫的欄位，預設會丟掉（不會存）
                timestamps: true, // 自動 createdAt / updatedAt（可選）
                /**
                 * virtual 預設不會出現在 JSON / object 輸出
                 * 要看得到可以開 virtuals: true
                 * 參考官方文件：Virtuals in JSON / console.log :contentReference[oaicite:2]{index=2}
                 */
                toJSON: { virtuals: true },
                toObject: { virtuals: true },
            }
        );

        /**
         * 3) Virtual（虛擬欄位）
         * - 這個欄位不會存到資料庫
         * - 像「property」一樣用：doc.fullName（不是 doc.fullName()）
         */
        personSchema.virtual('fullName')
            .get(function () {
                return `${this.first} ${this.last}`;
            })
            .set(function (v) {
                // 額外展示：virtual 也可以做 setter
                // 例如：doc.fullName = "Tammy Chow" => 自動拆 first/last
                const [first, ...rest] = String(v).trim().split(/\s+/);
                this.first = first || this.first;
                this.last = rest.join(' ') || this.last;
            });

        /**
         * 4) Instance method（文件方法）
         * - 掛在「單筆 document」上：tammy.greet()
         */
        personSchema.methods.greet = function () {
            console.log(`HELLO from ${this.fullName}`);
        };

        /**
         * 5) Static method（模型方法）
         * - 掛在 Model 上：Person.findByFullName("Tammy Chow")
         */
        personSchema.statics.findByFullName = function (name) {
            const [first, ...rest] = String(name).trim().split(/\s+/);
            const last = rest.join(' ');
            return this.findOne({ first, last });
        };

        /**
         * 6) Middleware（pre / post hooks）
         *
         * 重點：同一個操作，可能是「document middleware」或「query middleware」
         * - document middleware：this 是 document
         * - query middleware：this 是 query（你拿到的是 filter / update）
         *
         * 官方文件：middleware 類型與 deleteMany/deleteOne 行為 :contentReference[oaicite:3]{index=3}
         */

        // --- save：document middleware（this 是 document）
        personSchema.pre('save', function () {
            console.log('[pre save] ABOUT TO SAVE:', this.fullName);
        });

        personSchema.post('save', function (doc) {
            console.log('[post save] JUST SAVED:', doc.fullName);
        });

        // --- deleteMany：通常是 query middleware（this 是 query）
        personSchema.pre('deleteMany', function () {
            // 在 query middleware，this.getFilter() 拿查詢條件 :contentReference[oaicite:4]{index=4}
            console.log('[pre deleteMany] filter =', this.getFilter());
        });

        personSchema.post('deleteMany', function (res) {
            console.log('[post deleteMany] result =', res);
        });

        /**
         * --- deleteOne：預設會被當成 query middleware（this 是 query）
         * 如果你要「刪除某個 document 前」(doc.deleteOne())，要這樣註冊成 document middleware
         * 官方文件/issue 有提到要用 { document: true, query: false } :contentReference[oaicite:5]{index=5}
         */
        personSchema.pre('deleteOne', { document: true, query: false }, function () {
            console.log('[pre doc deleteOne] ABOUT TO DELETE DOC:', this.fullName);
        });

        personSchema.post('deleteOne', { document: true, query: false }, function () {
            console.log('[post doc deleteOne] JUST DELETED DOC');
        });

        // 7) Model
        const Person = mongoose.model('Person', personSchema);

        /**
         * ✅ 使用前刪除（你想要的）
         * - 先刪掉舊的資料，避免每次重跑檔案資料越堆越多
         */
        await Person.deleteMany({ first: 'Tammy' });

        // 8) 建立並存入
        const tammy = await Person.create({ first: 'Tammy', last: 'Chow' });

        // virtual 是 property，不是 function
        console.log('tammy.fullName =', tammy.fullName);

        // method：做事
        tammy.greet();

        // 展示：virtual 預設不會在 console.log(doc) 出現，但你可以：
        console.log('toObject(with virtuals) =', tammy.toObject()); // schema 已開 toObject.virtuals=true :contentReference[oaicite:6]{index=6}

        // 展示：static：Model 上的方法
        const found = await Person.findByFullName('Tammy Chow');
        console.log('found by static =', found ? found.fullName : null);

        /**
         * ✅ 刪除前（doc deleteOne）會觸發 document middleware
         * 注意：是 doc.deleteOne()，不是 Person.deleteOne(...)
         */
        await tammy.deleteOne();

    } catch (err) {
        console.error('ERROR:', err);
    } finally {
        await mongoose.disconnect();
        console.log('DISCONNECTED');
    }
})();

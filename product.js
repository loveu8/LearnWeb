/**
 * Mongoose demo: schema methods + save + find + call instance method
 * 執行前確認：
 * 1) MongoDB 有在跑（本機 127.0.0.1:27017）
 * 2) 安裝 mongoose：npm i mongoose
 */

const mongoose = require('mongoose');

const DB_URL = 'mongodb://127.0.0.1:27017/shopA';

(async function main() {
    try {
        // 1) 連線：用 await 確保連線完成後才做後續動作
        await mongoose.connect(DB_URL);
        console.log('CONNECTION OPEN!!');

        // 2) Schema：定義資料結構與驗證規則
        const productSchema = new mongoose.Schema(
            {
                name: {
                    type: String,
                    required: true,     // 必填
                    maxlength: 20       // 最長 20 字
                },
                price: {
                    type: Number,
                    required: true,     // 必填
                    min: [0, 'Price must be positive ya!!!'] // 最小值 0，否則自訂錯誤訊息
                },
                onSale: {
                    type: Boolean,
                    default: false
                },
                categories: [String],

                // qty 是巢狀物件（subdocument）
                qty: {
                    online: { type: Number, default: 0 },
                    isStore: { type: Number, default: 0 } // 注意：欄位名是 isStore
                },

                size: {
                    type: String,
                    enum: ['S', 'M', 'L'] // 只能是 S/M/L，不是 XS
                }
            },
            {
                // strict: true 是預設行為：
                // 任何不在 schema 的欄位（像 color, qty.store）會被丟掉，不會存進 DB
                strict: true,
                timestamps: true // 額外加：自動產生 createdAt/updatedAt（可有可無）
            }
        );

        // 3) Instance method：會掛在「文件實例」上（foundProduct.greet() 這種）
        productSchema.methods.greet = function () {
            console.log('HELLO HI HOWDY!!!');
            console.log(` - from ${this.name}`);
        };

        productSchema.methods.toggleOnSale = function () {
            this.onSale = !this.onSale;
            return this.save();
        }

        productSchema.methods.addCategory = function (newCat) {
            this.categories.push(newCat);
            // when we return like this. It will represent the product object
            return this.save();
        }

        productSchema.statics.fireSale = function () {
            return this.updateMany({}, { onSale: true, price: 0 });
        }

        // 4) Model：對應 MongoDB collection（預設會是 products）
        const Product = mongoose.model('Product', productSchema);

        // 5) 先清掉同名資料（避免你重跑檔案，資料越堆越多）
        await Product.deleteMany({ name: 'Cycing Jeresy' });

        // 6) 建立並存入資料：用 create = new + save 的簡寫
        //    這裡一定要用合法 size，且 qty 要用 isStore
        const created = await Product.create({
            name: 'Cycing Jeresy',
            price: 10,
            categories: ['A', 'B', 1],  // 1 會被轉成 '1'（因為 schema 是 String）
            qty: {
                online: 10,
                isStore: 2               // ✅ 正確欄位名
            },
            size: 'S',                 // ✅ enum 允許（XS 會 validation fail）
            color: 'red'               // ❌ 不在 schema，strict 模式下會被丟掉
        });

        console.log('SAVED DOC:', created.toObject());

        // 7) 查詢：findOne 找不到會回 null
        const foundProduct = await Product.findOne({ name: 'Cycing Jeresy' });

        if (!foundProduct) {
            console.log('Not found: Cycing Jeresy');
            return;
        }

        // 8) 呼叫 instance method：這裡一定可以跑（因為 foundProduct 是 Mongoose document）
        foundProduct.greet();
        await foundProduct.toggleOnSale();
        console.log("foundProduct : " + foundProduct);
        await foundProduct.addCategory('Outdoors');
        console.log("foundProduct change : " + foundProduct);

        Product.fireSale().then(res => console.log("quick sale : " + JSON.stringify(res)));

        // 9) 測試更新
        // Product.findOneAndUpdate(
        //     { name: 'Tire Pump' },
        //     { price: -10.99 },
        //     { new: true })
        //     .then(data => {
        //         console.log("IT WORKED!");
        //         console.log(data);
        //     })
        //     .catch(err => {
        //         console.log("ON NO!!!!");
        //         console.error(err);
        //     });
    } catch (err) {
        // 任何一步出錯（連線/驗證/查詢）都會被這裡抓到
        console.error('ERROR:', err);
    } finally {
        // 9) 關閉連線：避免 node 程序掛著不結束
        await mongoose.disconnect();
        console.log('DISCONNECTED');
    }
})();



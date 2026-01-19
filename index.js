const express = require('express');
const path = require('path');
const redditData = require('./data.json');
const app = express();
const { v4: uuid } = require('uuid'); //For generating ID's
const console = require('console');
const port = 3000;
const methodOverride = require('method-override');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/movie');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('CONNECTION OPEN!!');
});

// this can us to see form request body
app.use(express.urlencoded({ extended: true }));
// this can us to see request json body
app.use(express.json());
// 告訴 Express 檢查網址有沒有 ?_method=PATCH
app.use(methodOverride('_method'));


// we can define a folder to put some static file
// and this way can help server to find the file location
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use((req, res, next) => {
    console.log(`Time:, ${Date.now()}. We got a RQ!. Path:${req.path}`);
    next();
})

// every request , it will have req and res as args
app.get('/', (req, res) => {
    res.render("home");
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render("random", { rand: num });
})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render("subreddit", { ...data });
    } else {
        res.render("notfound", { subreddit })
    }

})

app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit}<h1>`);
})

app.get('/r/:subreddit/:postId', (req, res) => {
    const { postId, subreddit } = req.params;
    res.send(`<h1>Viewing Post ID : ${postId} on the ${subreddit} subreddit<h1>`);
})

app.get('/search', (req, res) => {
    const { q } = req.query;
    // Early Return: 如果沒有 q，就不要繼續做無謂的處理
    if (!q) {
        return res.send('Nothing found if nothing searched.');
    }
    res.send(`Search Result : ${q}`);
})

app.get('/cats', (req, res) => {
    res.send('MEOW!!');
})

app.get('/moreCats', (req, res) => {
    const cats = [
        'Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'
    ];
    res.render('moreCats', { cats });
})

app.post('/cats', (req, res) => {
    res.send('MEOW!! , It is different!! This is POST Method !');
})

app.get('/dogs', (req, res) => {
    res.send('WOOF!!');
})

// ch.35 RestFul API
app.get('/getpost', (req, res) => {
    res.render("getpost");
});

app.get('/tacos', (req, res) => {
    res.send("GET /tacos response");
});

app.post('/tacos', (req, res) => {
    const { meat, qty } = req.body;
    res.send(`Ok, here are your order. meat : ${meat} , qty : ${qty}`);
});

// Our fake database:
let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
];

app.get('/comments', (req, res) => {
    res.render("comments/index", { comments });
});

app.get('/comments/new', (req, res) => {
    res.render("comments/new");
});

app.post('/comments/new', (req, res) => {
    const { username, comment } = req.body;
    const userComment = {
        id: uuid(),
        username: username,
        comment: comment
    };
    console.log(userComment);
    comments.push(userComment);
    console.log(comments);
    // when user comment post will help them to redirect to comments page
    res.redirect("/comments?" + Date.now());
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    // for (let c of comments) {
    //     if (c.id === commentId) {
    //         data = c;
    //         break;
    //     }
    // }
    let data = comments.find(c => c.id === id);
    if (data) {
        res.render("comments/show", { data });
    } else {
        console.log("not found");
        res.render("comments/notFound", { commentId });
    }
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    let data = comments.find(c => c.id === id);
    if (data) {
        res.render("comments/edit", { data });
    } else {
        console.log("not found");
        res.render("comments/notFound", { commentId });
    }
});

app.patch('/comments/:id', (req, res) => {
    // 1. Debug 第一步：先印出來確認進來了沒
    console.log("PATCH route hit!");

    const { id } = req.params; // ID 在網址
    const { username, comment } = req.body; // 內容在表單 Body

    // 2. 找到 Array 裡的物件
    const foundComment = comments.find(c => c.id === id);

    if (foundComment) {
        // 3. 直接修改屬性 (Pass by Reference)
        foundComment.username = username; // 如果允許改名的話
        foundComment.comment = comment;
        console.log("Updated:", foundComment);
        res.redirect("/comments");
    } else {
        console.log("Comment not found for update");
        res.status(404).send("Not Found");
    }
});

app.delete('/comments/:id', (req, res) => {
    // 0. Debug 第一步：先印出來確認進來了沒
    console.log("DELETE route hit!");
    const { id } = req.params; // ID 在網址
    // 1. 過濾掉不要的 (記得這是最簡單的刪除法)
    // 注意：這裡假設 comments 是全域變數 (let comments = [...])
    comments = comments.filter(c => c.id !== id);

    // 2. 不需要 redirect，因為是 fetch 請求。
    // 回傳一個簡單的 JSON 或文字就好。
    res.json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// mongoose
// this help us to set up Schema
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

// TOPIC : 新增資料
// 目標 : 新增1筆
// 1. 確保你的 Model 名字改對了 (不要再用 Moive 了)
const Movie = mongoose.model('Movie', movieSchema);

// 2. 這是你要的 GET Route
// 瀏覽器訪問： http://localhost:3000/seed-movie
// 如果要清除，再mongo shell輸入db.movies.deleteMany({})，會全部清掉
app.get('/movies/seed-movie', async (req, res) => {

    // 步驟 A: 準備資料
    const movie = new Movie({
        title: 'Amadeus',
        year: 1986,
        score: 9.2,
        rating: 'R'
    });

    // 步驟 B: 寫入資料庫 (用 await 等它做完，不要瞎跑)
    await movie.save();

    // 步驟 C: 告訴瀏覽器結果
    res.send('OK! 資料寫入成功，快去 MongoDB Shell 檢查！');
});

// 目標 : 新增多筆
// 1. 把你的資料整理成一個漂亮的 Array (資料結構)
// 這樣以後要加電影，只要改這個 Array，不用動邏輯程式碼
const seedData = [
    {
        title: 'Amadeus',
        year: 1986,
        score: 9.2,
        rating: 'R'
    },
    {
        title: 'Sharknado',
        year: 2013,
        score: 3.3,
        rating: 'TV-14'
    },
    {
        title: 'Alien',
        year: 1979,
        score: 8.1,
        rating: 'R'
    },
    {
        title: 'Stand By Me',
        year: 1986,
        score: 8.6,
        rating: 'R'
    }
];

// 2. 建立一個 API 來執行寫入
// 瀏覽器訪問：http://localhost:3000/seed
app.get('/movies/seed', async (req, res) => {
    try {
        // insertMany 是 Mongoose 的神器，一次寫入全部，效率比迴圈 save() 高一百倍
        await Movie.insertMany(seedData);

        console.log("資料庫播種成功！");
        res.send("OK! 電影資料已全部寫入！");
    } catch (e) {
        console.log("寫入失敗", e);
        res.send("ERROR: " + e.message);
    }
});

// TOPIC : 查詢資料
// 查詢全部
app.get('/movies', async (req, res) => {
    // 沒有條件 = 找全部
    const allMovies = await Movie.find({});

    // 把找到的資料直接用 JSON 格式丟回給瀏覽器，方便看
    res.json(allMovies);
});

app.get('/movies/query', async (req, res) => {
    // 1. 從 query string 拿資料 (不是 params!)
    const { id, title, year, score, rating } = req.query;

    // 2. 建立一個空的過濾器物件 (Data Structure)
    const filter = {};

    // 3. 動態填入條件
    // 只有當用戶真的傳了 year，我們才把 year 加進過濾器
    if (id) {
        filter._id = id;
    }

    if (year) {
        filter.year = year;
    }

    if (rating) {
        filter.rating = rating;
    }

    if (score) {
        filter.score = score;
    }

    // 進階：標題通常想做 "模糊搜尋" (包含字串就算)，而不是完全相等
    if (title) {
        // $regex 是 MongoDB 的正規表達式搜尋
        // $options: 'i' 代表忽略大小寫 (Case Insensitive)
        filter.title = { $regex: title, $options: 'i' };
    }

    // Debug: 看看我們最後組出了什麼鬼東西
    console.log("搜尋條件:", filter);

    // 4. 把乾淨的過濾器丟給資料庫
    const matchMovies = await Movie.find(filter);

    res.json(matchMovies);
});

// 更新資料
app.patch('/movies/:id', async (req, res) => {
    const { id } = req.params;

    // req.body 就是你要改的內容，例如 { score: 10, year: 2024 }
    // Data Structures > Code: 直接把物件傳進去，不要一個個欄位解構
    const updatePayload = req.body;

    try {
        const updateMovie = await Movie.findByIdAndUpdate(
            id, // 1.更新哪一筆
            updatePayload, // 2.改什麼
            {
                new: true,           // 關鍵設定A : 回傳更新後的資料
                runValidators: true  // 關鍵設定 B: 依然要檢查 Schema 規則 (例如 score 不能是字串)
            }
        );

        if (!updateMovie) {
            return res.status(404).json({ error: "找不到這部電影" });
        }

        console.log("更新成功", updateMovie);
        res.json(updateMovie);
    } catch (e) {
        res.status(404).json({ error: "更新失敗: " + e.message });
    }
});

// TOPIC: 進階更新 - findOneAndUpdate
// 場景：我不知道 ID，但我知道標題 (Title)，我想改它的分數
// URL: PATCH /movies/title/Alien
app.patch('/movies/title/:title', async (req, res) => {
    // 1. 準備查詢條件 (Query Condition)
    // Data Structures > Code: 這裡的 Key 必須對應資料庫欄位名稱
    const filter = { title: req.params.title };

    // 2. 準備更新內容 (Update Payload)
    const updatePayload = req.body;

    try {
        // findOneAndUpdate 接收三個參數：
        // (1) 條件: 找不到就拉倒
        // (2) 內容: 要改什麼
        // (3) 選項: 設定回傳行為與驗證
        const updatedMovie = await Movie.findOneAndUpdate(
            filter,
            updatePayload,
            {
                new: true,           // 重要：回傳「改完後」的資料 (預設是回傳舊的)
                runValidators: true  // 重要：依然要檢查 Schema (例如 score 不能 > 10)
            }
        );

        // 防呆：如果找不到該標題的電影
        if (!updatedMovie) {
            return res.status(404).json({ error: "找不到標題為 " + req.params.title + " 的電影" });
        }

        console.log("更新成功:", updatedMovie);
        res.json(updatedMovie);

    } catch (e) {
        // 捕捉驗證錯誤 (例如 score 給了 100 分)
        res.status(400).json({ error: "更新失敗: " + e.message });
    }
});


// TOPIC: 根據條件刪除單筆 - findOneAndDelete
// 場景：用戶輸入電影名稱來刪除
// URL: DELETE /movies/title/Sharknado
app.delete('/movies/:id', async (req, res) => {
    // Data Structures > Code: 
    // 這裡的 key "title" 對應資料庫欄位，value 對應網址參數
    const { id } = req.params;
    try {

        // 找到符合條件的第一筆，刪掉它，並把屍體帶回來
        const deletedMovie = await Movie.findByIdAndDelete(id);

        if (!deletedMovie) {
            return res.status(404).json({ error: "找不到這部電影，無法刪除" });
        }

        console.log("已刪除:", deletedMovie);
        res.json(deletedMovie);
    } catch (e) {
        res.status(400).json({ error: "刪除失敗: " + e.message });
    }
});

// TOPIC: 批次刪除 - deleteMany
// 場景：刪除所有爛片 (評分低於 5 分)
// URL: DELETE /movies/bad-movies
app.delete('/movies/bad-movies', async (req, res) => {
    try {
        // 1. 定義什麼是爛片 (Data Structure)
        // $lt 是 Less Than (小於)
        const filter = { score: { $lt: 5 } };

        // 2. 執行刪除
        // 注意：這裡回傳的不是電影資料，而是「刪除報告」
        const result = await Movie.deleteMany(filter);

        // result 會長這樣： { "acknowledged": true, "deletedCount": 3 }
        console.log("大屠殺報告:", result);

        if (result.deletedCount === 0) {
            return res.json({ message: "沒有爛片可以刪，你的品味真好！" });
        }

        res.json({
            message: "大掃除完成！",
            count: result.deletedCount
        });

    } catch (e) {
        res.status(500).json({ error: "大屠殺失敗: " + e.message });
    }
});
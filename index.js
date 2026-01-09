const express = require('express');
const path = require('path');
const redditData = require('./data.json');
const app = express();
const { v4: uuid } = require('uuid'); //For generating ID's
const console = require('console');
const port = 3000;
const methodOverride = require('method-override');

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

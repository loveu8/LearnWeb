const express = require('express');
const path = require('path');
const redditData = require('./data.json');
const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

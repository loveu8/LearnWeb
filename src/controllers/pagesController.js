const redditData = require('../../data/data.json');

function renderHome(req, res) {
    res.render('home');
}

function renderRandom(req, res) {
    const num = Math.floor(Math.random() * 10) + 1;
    res.render('random', { rand: num });
}

function renderSubreddit(req, res) {
    const { subreddit } = req.params;
    const data = redditData[subreddit];
    if (data) {
        res.render('subreddit', { ...data });
    } else {
        res.render('notfound', { subreddit });
    }
}

function renderSubredditText(req, res) {
    const { subreddit } = req.params;
    res.send(`<h1>Browsing the ${subreddit}<h1>`);
}

function renderSubredditPost(req, res) {
    const { postId, subreddit } = req.params;
    res.send(`<h1>Viewing Post ID : ${postId} on the ${subreddit} subreddit<h1>`);
}

function search(req, res) {
    const { q } = req.query;
    if (!q) {
        return res.send('Nothing found if nothing searched.');
    }
    res.send(`Search Result : ${q}`);
}

function getCats(req, res) {
    res.send('MEOW!!');
}

function getMoreCats(req, res) {
    const cats = ['Blue', 'Rocket', 'Monty', 'Stephanie', 'Winston'];
    res.render('moreCats', { cats });
}

function postCats(req, res) {
    res.send('MEOW!! , It is different!! This is POST Method !');
}

function getDogs(req, res) {
    res.send('WOOF!!');
}

function renderGetPost(req, res) {
    res.render('getpost');
}

function getTacos(req, res) {
    res.send('GET /tacos response');
}

function postTacos(req, res) {
    const { meat, qty } = req.body;
    res.send(`Ok, here are your order. meat : ${meat} , qty : ${qty}`);
}

module.exports = {
    renderHome,
    renderRandom,
    renderSubreddit,
    renderSubredditText,
    renderSubredditPost,
    search,
    getCats,
    getMoreCats,
    postCats,
    getDogs,
    renderGetPost,
    getTacos,
    postTacos,
};
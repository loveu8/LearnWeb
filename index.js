const express = require('express');
const path = require('path');
const redditData = require('./data.json');
const app = express();
const { v4: uuid } = require('uuid'); //For generating ID's
const console = require('console');
const port = 3000;

// this can us to see form request body
app.use(express.urlencoded({ extended: true }));
// this can us to see request json body
app.use(express.json());


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
const comments = [
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
        uuid: uuid(),
        username: username,
        comment: comment
    };
    comments.push(userComment);
    // when user comment post will help them to redirect to comments page
    res.redirect("/comments");
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

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

const express = require('express');
const pagesController = require('../controllers/pagesController');

const router = express.Router();

router.get('/', pagesController.renderHome);
router.get('/rand', pagesController.renderRandom);
router.get('/r/:subreddit', pagesController.renderSubreddit);
router.get('/r/:subreddit', pagesController.renderSubredditText);
router.get('/r/:subreddit/:postId', pagesController.renderSubredditPost);
router.get('/search', pagesController.search);
router.get('/cats', pagesController.getCats);
router.get('/moreCats', pagesController.getMoreCats);
router.post('/cats', pagesController.postCats);
router.get('/dogs', pagesController.getDogs);
router.get('/getpost', pagesController.renderGetPost);
router.get('/tacos', pagesController.getTacos);
router.post('/tacos', pagesController.postTacos);

module.exports = router;
const express = require('express');
const moviesController = require('../controllers/moviesController');

const router = express.Router();

router.get('/seed-movie', moviesController.seedMovie);
router.get('/seed', moviesController.seedMovies);
router.get('/', moviesController.listMovies);
router.get('/query', moviesController.queryMovies);
router.patch('/:id', moviesController.updateMovieById);
router.patch('/title/:title', moviesController.updateMovieByTitle);
router.delete('/:id', moviesController.deleteMovieById);
router.delete('/bad-movies', moviesController.deleteBadMovies);

module.exports = router;
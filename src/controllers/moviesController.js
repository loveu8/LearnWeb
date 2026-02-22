const mongoose = require('mongoose');
const Movie = require('../models/movie');
const seedData = require('../utils/seedData');

const localMovieUri = 'mongodb://127.0.0.1:27017/movie';
let moviesDbConnectPromise;

async function ensureMoviesDbConnection() {
    if (process.env.MONGO_URI) {
        return;
    }

    if (mongoose.connection.readyState === 1) {
        return;
    }

    if (!moviesDbConnectPromise) {
        moviesDbConnectPromise = mongoose.connect(localMovieUri).then(() => {
            console.log('Movies controller connected to local MongoDB.');
        });
    }

    await moviesDbConnectPromise;
}

async function seedMovie(req, res) {
    await ensureMoviesDbConnection();
    const movie = new Movie({
        title: 'Amadeus',
        year: 1986,
        score: 9.2,
        rating: 'R',
    });

    await movie.save();

    res.send('OK! movie saved.');
}

async function seedMovies(req, res) {
    await ensureMoviesDbConnection();
    try {
        await Movie.insertMany(seedData);
        console.log('Movies seeded.');
        res.send('OK! Seed data inserted.');
    } catch (e) {
        console.log('Seed error:', e);
        res.send(`ERROR: ${e.message}`);
    }
}

async function listMovies(req, res) {
    await ensureMoviesDbConnection();
    const allMovies = await Movie.find({});
    res.json(allMovies);
}

async function queryMovies(req, res) {
    await ensureMoviesDbConnection();
    const { id, title, year, score, rating } = req.query;
    const filter = {};

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

    if (title) {
        filter.title = { $regex: title, $options: 'i' };
    }

    console.log('Movie query filter:', filter);
    const matchMovies = await Movie.find(filter);
    res.json(matchMovies);
}

async function updateMovieById(req, res) {
    await ensureMoviesDbConnection();
    const { id } = req.params;
    const updatePayload = req.body;

    try {
        const updateMovie = await Movie.findByIdAndUpdate(id, updatePayload, {
            new: true,
            runValidators: true,
        });

        if (!updateMovie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        console.log('Updated movie:', updateMovie);
        res.json(updateMovie);
    } catch (e) {
        res.status(404).json({ error: `Update error: ${e.message}` });
    }
}

async function updateMovieByTitle(req, res) {
    await ensureMoviesDbConnection();
    const filter = { title: req.params.title };
    const updatePayload = req.body;

    try {
        const updatedMovie = await Movie.findOneAndUpdate(filter, updatePayload, {
            new: true,
            runValidators: true,
        });

        if (!updatedMovie) {
            return res.status(404).json({ error: `Movie title ${req.params.title} not found` });
        }

        console.log('Updated movie by title:', updatedMovie);
        res.json(updatedMovie);
    } catch (e) {
        res.status(400).json({ error: `Update error: ${e.message}` });
    }
}

async function deleteMovieById(req, res) {
    await ensureMoviesDbConnection();
    const { id } = req.params;
    try {
        const deletedMovie = await Movie.findByIdAndDelete(id);

        if (!deletedMovie) {
            return res.status(404).json({ error: 'Movie not found and cannot delete' });
        }

        console.log('Deleted:', deletedMovie);
        res.json(deletedMovie);
    } catch (e) {
        res.status(400).json({ error: `Delete error: ${e.message}` });
    }
}

async function deleteBadMovies(req, res) {
    await ensureMoviesDbConnection();
    try {
        const filter = { score: { $lt: 5 } };
        const result = await Movie.deleteMany(filter);

        console.log('Delete many result:', result);

        if (result.deletedCount === 0) {
            return res.json({ message: 'No low-scoring movies found to delete.' });
        }

        res.json({
            message: 'Deleted movies successfully.',
            count: result.deletedCount,
        });
    } catch (e) {
        res.status(500).json({ error: `Delete many error: ${e.message}` });
    }
}

module.exports = {
    seedMovie,
    seedMovies,
    listMovies,
    queryMovies,
    updateMovieById,
    updateMovieByTitle,
    deleteMovieById,
    deleteBadMovies,
};

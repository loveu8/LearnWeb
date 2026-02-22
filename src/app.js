const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const requestLogger = require('./middlewares/requestLogger');
const pagesRoutes = require('./routes/pages');
const commentsRoutes = require('./routes/comments');
const moviesRoutes = require('./routes/movies');

const app = express();
const projectRoot = path.join(__dirname, '..');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(projectRoot, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(projectRoot, 'views'));

app.use(requestLogger);

app.get('/health', (req, res) => {
    res.send('ok');
});

app.use('/', pagesRoutes);
app.use('/comments', commentsRoutes);
app.use('/movies', moviesRoutes);

module.exports = app;
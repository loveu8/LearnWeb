const { v4: uuid } = require('uuid');
const { getComments, pushComment, removeCommentById } = require('../utils/commentsStore');

function listComments(req, res) {
    const comments = getComments();
    res.render('comments/index', { comments });
}

function newCommentForm(req, res) {
    res.render('comments/new');
}

function createComment(req, res) {
    const { username, comment } = req.body;
    const userComment = {
        id: uuid(),
        username: username,
        comment: comment,
    };
    console.log(userComment);
    pushComment(userComment);
    console.log(getComments());
    res.redirect(`/comments?${Date.now()}`);
}

function showComment(req, res) {
    const { id } = req.params;
    const comments = getComments();
    const data = comments.find((c) => c.id === id);
    if (data) {
        res.render('comments/show', { data });
    } else {
        console.log('not found');
        res.render('comments/notFound', { commentId });
    }
}

function editCommentForm(req, res) {
    const { id } = req.params;
    const comments = getComments();
    const data = comments.find((c) => c.id === id);
    if (data) {
        res.render('comments/edit', { data });
    } else {
        console.log('not found');
        res.render('comments/notFound', { commentId });
    }
}

function updateComment(req, res) {
    console.log('PATCH route hit!');

    const { id } = req.params;
    const { username, comment } = req.body;

    const comments = getComments();
    const foundComment = comments.find((c) => c.id === id);

    if (foundComment) {
        foundComment.username = username;
        foundComment.comment = comment;
        console.log('Updated:', foundComment);
        res.redirect('/comments');
    } else {
        console.log('Comment not found for update');
        res.status(404).send('Not Found');
    }
}

function deleteComment(req, res) {
    console.log('DELETE route hit!');
    const { id } = req.params;
    removeCommentById(id);
    res.json({ status: 'ok' });
}

module.exports = {
    listComments,
    newCommentForm,
    createComment,
    showComment,
    editCommentForm,
    updateComment,
    deleteComment,
};
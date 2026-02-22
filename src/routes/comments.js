const express = require('express');
const commentsController = require('../controllers/commentsController');

const router = express.Router();

router.get('/', commentsController.listComments);
router.get('/new', commentsController.newCommentForm);
router.post('/new', commentsController.createComment);
router.get('/:id', commentsController.showComment);
router.get('/:id/edit', commentsController.editCommentForm);
router.patch('/:id', commentsController.updateComment);
router.delete('/:id', commentsController.deleteComment);

module.exports = router;
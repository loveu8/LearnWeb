const { v4: uuid } = require('uuid');

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!',
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog',
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd',
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof',
    },
];

function getComments() {
    return comments;
}

function pushComment(comment) {
    comments.push(comment);
}

function removeCommentById(id) {
    comments = comments.filter((c) => c.id !== id);
}

module.exports = {
    getComments,
    pushComment,
    removeCommentById,
};
console.log("TEST");

setTimeout(() => {
    console.log("Db finished");
}, 3000);

console.log("End");

// Call back hell
getUser(1, (user) => {
    getPosts(user.id, (posts) => {
        getComments(posts[0].id, (comments) => {
            getLikes(comments[0].id, (likes) => {
                console.log("終於拿到資料了:", likes);
                // 如果這裡還要再做下一步，你的螢幕就不夠寬了
            }, (err) => {
                console.error("Likes 錯誤", err);
            });
        }, (err) => {
            console.error("Comments 錯誤", err);
        });
    }, (err) => {
        console.error("Posts 錯誤", err);
    });
}, (err) => {
    console.error("User 錯誤", err);
});
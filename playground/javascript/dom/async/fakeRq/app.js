// THE CALLBACK VERSION
const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout(() => {
        if (delay > 4000) {
            failure('Connection Timeout :(')
        } else {
            success(`Here is your fake data from ${url}`)
        }
    }, delay)
}
// THE PROMISE VERSION 
const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * (4500)) + 500;
        setTimeout(() => {
            if (delay > 4000) {
                reject('Connection Timeout :(')
            } else {
                resolve(`Here is your fake data from ${url}`)
            }
        }, delay)
    })
}

// this will happen call back hell
fakeRequestCallback('books.com',
    function (response) {
        console.log("IT WORKED!!!!");
        console.log(response);
    }, function (err) {
        console.log("ERROR!!!");
        console.log(err);
    }
);

// 1. Promises help us avoid "Callback Hell" by flattening asynchronous code.
// 2. A Promise starts in the "Pending" state, meaning the operation is still ongoing.
// 3. Once the task completes, it settles into one of two final states:
//    - "Fulfilled" (often called Resolved): The operation succeeded, and we have the result.
//    - "Rejected": The operation failed, and we have an error message.

// This way doesn't change more, let's improve
fakeRequestPromise('yelp.com/api/coffee/page1').then(() => {
    console.log("It worked!!!(page1)");
    fakeRequestPromise('yelp.com/api/coffee/page2').then(() => {
        console.log("It worked!!!(page2)");
        fakeRequestPromise('yelp.com/api/coffee/page3').then(() => {
            console.log("It worked!!!(page3)");
        }).catch(() => {
            console.log("OH NO, ERROR!(page3)");
        })
    }).catch(() => {
        console.log("OH NO, ERROR!(page2)");
    })
}).catch(() => {
    console.log("OH NO, ERROR!(page1)");
});


// promise better version
fakeRequestPromise('yelp.com/api/coffee/page1')
    .then(() => {
        console.log("It worked!!!(page1)");
        return fakeRequestPromise('yelp.com/api/coffee/page2');
    })
    .then(() => {
        console.log("It worked!!!(page2)");
        return fakeRequestPromise('yelp.com/api/coffee/page3');
    })
    .then(() => {
        console.log("It worked!!!(page3)");
    }).catch(() => {
        // this way can catch all promise like this.
        console.log("OH NO, A REQUEST FAILING!!!");
    });


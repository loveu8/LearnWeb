const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// filter , we push array to filter data , and then we will get array back.
numbers.filter(n => {
    return n < 10;
})

const movies = [
    {
        title: 'Amadeus',
        score: 99,
        year: 1986
    },
    {
        title: 'Sharknado',
        score: 35,
        year: 2013
    },
    {
        title: '13 Going On 30',
        score: 70,
        year: 2004
    },
    {
        title: 'Stand By Me',
        score: 85,
        year: 1986
    },
    {
        title: 'Waterworld',
        score: 62,
        year: 1995
    },
    {
        title: 'Jingle All The Way',
        score: 71,
        year: 1996
    },
    {
        title: 'Alien',
        score: 90,
        year: 1979
    }
];


const goodmovie = movies.filter(moive => {
    return moive.score >= 80;
});

const badmovie = movies.filter(moive => {
    return moive.score < 70;
});

const recentMovies = movies.filter(movie => movie.year > 2000);

// we also can do one filter and use map to get good movie titles array
const goodMovieTile = movies.filter(m => m.score > 80).map(m => m.title);

const usernames = ['mark', 'staceysmom1978', 'q29832128238983', 'carrie98', 'MoanaFan'];

function validUserNames(usernames) {
    // your code here
    return usernames.filter(user => user.length < 10);
}

validUserNames(usernames);

// every or some , it will test all array element return true / false
const exams = [80, 98, 92, 78, 70, 90, 89, 84, 81, 77];

// every , all elements must test pass
exams.every(score => score >= 75);
// some , if one element can pass , it will return true
exams.some(score => score >= 75);

/*

我有這個陣列： const prices = [10, 20, 30, 40];

任務 1： 用 map 和箭頭函式，把所有價格打 9 折 (乘以 0.9)，產生一個新陣列。

任務 2： (進階) 用箭頭函式寫一個 filter，只保留大於 25 的價格，但是，
我要你在保留之前，用 console.log 印出原本的價格。 
(提示：你需要用到大括號 {} 和 return，因為你有兩行代碼要跑。)
*/

// Task 1
const newPrices = prices.map(price => price * 0.9);

// Task 2
// 任務 2：過濾大於 25 的價格，並印出 log
const result = prices.filter(price => {
    // 1. 執行雜事 (Side Effect)
    if (price > 25) {
        console.log(`original price: ${price}`);
    }
    // 2. 回傳明確的 Boolean (Yes/No)
    return price > 25;
});
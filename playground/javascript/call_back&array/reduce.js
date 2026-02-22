const prices = [9.99, 1.50, 19.99, 49.99, 30.50];

// old way
let total = 0;
for (let price of prices) {
    total += price;
}
console.log(total);

// new way
let total2 = prices.reduce((total, price) => {
    return total + price;
})

const minPrice = prices.reduce((min, price) => {
    if (price < min) {
        return price;
    }
    return min;
});

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

movies.reduce((bestMovie, currMovie) => {
    if (currMovie.score > bestMovie.score) {
        return bestMovie;
    }
    return bestMovie;
})

const evens = [2, 4, 6, 8];
// sencod argements , initial value
evens.reduce((sum, num) => sum + num, 100);

const empty = [];

// ✅ 有初始值：安全回傳 100
const safe = empty.reduce((acc, cur) => acc + cur, 100);

// ❌ 沒初始值：崩潰 (TypeError: Reduce of empty array with no initial value)
const crash = empty.reduce((acc, cur) => acc + cur);

// 型別轉換 (Type Transformation)

const fruits = ['apple', 'banana', 'apple'];

// 我們想算出：{ apple: 2, banana: 1 }
// 這裡初始值必須是空物件 {}，否則 sum 一開始會是字串 'apple'
const count = fruits.reduce((obj, fruit) => {
    obj[fruit] = (obj[fruit] || 0) + 1;
    return obj;
}, {}); // <--- 這個 {} 絕對不能省
// old way to use XMLHttpRequest get data
// but it is not promise function
// const req = new XMLHttpRequest();

// req.onload = function () {
//     console.log("IT LOADED!!!");
//     console.log(JSON.parse(this.responseText));
// };

// req.onerror = function () {
//     console.log("ERROR!!!");
//     console.log(this);
// }

// req.open("GET", "https://swapi.tech/api/people/1");
// req.send();

// New way to get data to use Fetch
// Fetch is promise
// fetch("https://swapi.tech/api/people/1")
//     .then(res => {
//         console.log("RESOLVED!", res);
//         // res.json().then(data => console.log("JSON DONE", data));
//         return res.json();
//     })
//     .then(data => {
//         console.log('people1:', data);
//         return fetch("https://swapi.tech/api/people/2");
//     })
//     .then(data => {
//         console.log('people2:', data);
//     })
//     .catch((e) => {
//         console.warn("ERROR!", e);
//     });


// Morden way to use feteh with async and await
const loadStarWarsPeople = async () => {
    try {
        const res = await fetch("https://swapi.tech/api/people/1");
        // show error
        // const res = await fetch("https://swapi.tech/api/pebreberople/1");
        const data = await res.json();
        console.log(data);
    } catch (e) {
        console.log("ERROR!!!", e);
    }
};


// 1. 修正回傳（移除大括號或加上 return）
// 2. 統一使用 await 處理 Promise
const getGreeting = async () => "Hello";

const run = async () => {
    const res = await getGreeting();
    console.log(res);
};

run();

// 如果不需要 async 特性，就不要濫用關鍵字
const test = Promise.resolve("Hello");
test.then(console.log);
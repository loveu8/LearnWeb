import figlet from "figlet";

// ESM / 現代寫法
// Node.js 直接支援頂層 await
const text = await figlet.text("Hello World!!");
console.log(text);
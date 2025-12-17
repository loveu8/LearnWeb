// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

const container = document.querySelector('#container');
const baseURL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'


for (let i = 1; i <= 151; i++) {
    // create div
    const div = document.createElement("div");
    div.classList.add("pokemon");
    // create img
    const img = document.createElement("img");
    img.src = `${baseURL}${i}.png`;
    // create div
    const label = document.createElement("span");
    label.innerText = "#" + i;

    // setting img,label, and last div
    div.append(img);
    div.append(label);
    container.append(div);
}

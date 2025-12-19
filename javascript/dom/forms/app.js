const form = document.querySelector('#shelterForm');
const input = document.querySelector('#catName');
const list = document.querySelector('#list');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    catName = input.value;
    const newLi = document.createElement("li");
    newLi.innerText = cancelAnimationFrame;
    newLi.innerText = catName;
    list.append(newLi);
    input.value = "";
});
const btn = document.querySelector("#v2");

btn.onclick = function () {
    console.log("YOU CHICKED ME!");
    console.log("I HOPE IT WORKED!!");
}

function scream() {
    console.log("AAAAAAAAHHHHH");
    console.log("STOPPPPPPP!!!");
}

btn.onmouseenter = scream;

document.querySelector('h1').onclick = () => {
    alert('you clicked the h1!');
}
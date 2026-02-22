const btn = document.querySelector("#v2");

btn.onclick = function () {
    console.log("YOU CHICKED ME!");
    console.log("I HOPE IT WORKED!!");
}


// add onclick events
function scream() {
    console.log("AAAAAAAAHHHHH");
    console.log("STOPPPPPPP!!!");
}

btn.onmouseenter = scream;

document.querySelector('h1').onclick = () => {
    alert('you clicked the h1!');
}

// add addEventListener
const btn3 = document.querySelector('#v3');
btn3.addEventListener('click', function () {
    alert("CLICKED!!!");
});

function twist() {
    console.log("TWIST!");
}

function shout() {
    console.log("SHOUT!");
}

const tasBtn = document.querySelector('#tas');
// any object's property can accept one function
// tasBtn.onclick = twist;
// tasBtn.onclick = shout;
// addEventListener can add more than one event
tasBtn.addEventListener('click', twist, { once: true });
tasBtn.addEventListener('click', shout);

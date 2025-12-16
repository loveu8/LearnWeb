const allLinks = document.querySelectorAll('a');

// for (let link of allLinks) {
//     link.innerText = 'I AM A LINK!!!!'
// }


for (let link of allLinks) {
    link.style.color = 'rgb(0, 108, 134)';
    link.style.textDecorationColor = 'magenta';
    link.style.textDecorationStyle = 'wavy'
}

const toc = document.getElementById('toc');

const allImages = document.getElementsByTagName('img');

// for (let img of allImages) {
//     console.log(img.src);
//     img.src = 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80';
// }


// const squareImages = document.getElementsByClassName('square');

// for (let img of squareImages) {
//     img.src = 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80';
// }

// get the first one correct
// we can select by html tag name
// select id => '#id'
// select class name => '.className'
// select element => 'a[title="Java"]'
document.querySelector('p');

// we also can select by html's attribute
document.querySelector('a[title="Java"]');

// get all match HTML elements
const links = document.querySelectorAll('p a');
for (let link of links) {
    console.log(link.href);
}
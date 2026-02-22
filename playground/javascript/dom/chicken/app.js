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

// innerText
// document.querySelector('p').innerText = 'lolololo'; 

const allLinks = document.querySelectorAll('a');

// for (let link of allLinks) {
//     link.innerText = 'I AM A LINK!!!!'
// }

// document.querySelector('h1').innerText = '<i>123123</i>';
// document.querySelector('h1').innerHTML = '<i>123123</i>';

// If we use js selector to select html element
// we can use or change element's attribute.
document.querySelector('#banner').id;

const firstLink = document.querySelector("a");
firstLink.href;
firstLink.getAttribute('href');

// when you use select a html
// it only show inline style
const h1 = document.querySelector('h1');

h1.style.color = 'green';
h1.style.fontSize = '3em';
h1.style.bored = '2px solid pink';

const allLinks2 = document.querySelectorAll('a');

for (let link of allLinks2) {
    link.style.color = 'rgb(0,108,134)';
    link.style.textDecorationColor = 'magenta';
    link.style.textDecorationStyle = 'wavy';
}

// set class way 1
const h2 = document.querySelector('h2');

// h2.getAttribute('class');
// h2.setAttribute('class', 'purple');
// h2.setAttribute('class', 'border');

// let currentClasses = h2.getAttribute('class');
// h2.setAttribute('class', `${currentClasses} purple`);

// set class way 2
h2.classList.add('purple');
h2.classList.add('border');

h2.classList.remove('border');

// 測試是否存在 purple 屬性
h2.classList.toggle('purple');
h2.classList.contains('purple');

// find parent or child
const firstBold = document.querySelector('b');

const paragrapth = firstBold.parentElement;

paragrapth.children;

const squareImg = document.querySelector('.square');

// createElement , appendChild
const newImg = document.createElement('img');

newImg.src = 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_2999,h_1687/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/nabd3lsoifdkrmfifqrn/IMGWorldsofAdventureAdmissionTicketinDubai-Klook-KlookAustralia.jpg';

document.body.appendChild(newImg);

newImg.classList.add('square');

// append text in the element's content
const p = document.querySelector('p');
p.append('I am new text yayyyyayaya!!!');

// preappend
const newB = document.createElement('b');

newB.append('Hi!');

p.prepend(newB);

const h2_1 = document.createElement('h2');

h2_1.append("Are adorable chickens");

h1.insertAdjacentElement('afterend', h2_1);

// remove element

// const firstLi = document.querySelector('li');

// const ul = firstLi.parentElement;

// ul.removeChild(firstLi);
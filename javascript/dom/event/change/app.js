const input = document.querySelector('input');

const h1 = document.querySelector('h1');

// it only detect user leave the input.
input.addEventListener('change', function (e) {
    console.log('type leave');
});

// it will detect user input
input.addEventListener('input', function (e) {
    if (!input.value) {
        return;
    }
    h1.innerText = input.value;
});
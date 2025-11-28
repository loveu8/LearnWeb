let movieLine = ['tom', 'nancy'];
movieLine[2] = 'pablo';
console.log(movieLine);

// array method : push , add to end
movieLine.push('oliver');
console.log(movieLine);

let cat = "blue";

cat.toUpperCase();

movieLine.push('eva');
console.log(movieLine);
movieLine.push('harry', 'hermione');
console.log(movieLine);

// array method : pop , remove from end
barbell.push(65);
barbell.push(45);
barbell.push(25);
barbell.push(10);
barbell.push(2.5);

barbell.pop();
barbell.pop();
barbell.pop();
barbell.pop();
barbell.pop();

// array method : shift , remove from start
movieLine.shift();
console.log(movieLine);

// array method : unshift , add to start
movieLine.unshift('lorn');
console.log(movieLine);

// practice

const planets = ['The Moon', 'Venus', 'Earth', 'Mars', 'Jupiter']; //DO NOT TOUCH THIS LINE!

// YOUR CODE GOES BELOW THIS LINE:
planets.shift();
planets.push('Saturn');
planets.unshift('Mercury');
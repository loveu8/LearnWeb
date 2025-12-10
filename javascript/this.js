const cat = {
    name: 'Blue Steele',
    color: 'grey',
    breed: 'scottish old',
    meow() {
        console.log(`${this.name} says MEOWWWW`);
    }
}

const hen = {
    name: "Helen",
    eggCount: 0,
    layAnEgg() {
        this.eggCount++;
        return "EGG";
    }
}
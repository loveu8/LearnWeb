axios
  .get("https://swapi.tech/api/people/1")
  .then(res => {
    // console.log("RESPONSE: ", res);
  })
  .catch(e => {
    console.log("ERROR!", e);
  });


const getStarWarsPerson = async (id) => {
  try {
    const res = await axios.get("https://swapi.tech/api/people/1");
    console.log(res.data);
  } catch (e) {
    console.log("ERROR", e);
  }
}

// getStarWarsPerson(5);
// getStarWarsPerson(10);

// axios set header
const addNewJoke = async () => {
  const jokeText = await getDadJoke();
  const newLI = document.createElement('LI');
  const jokes = document.querySelector("#jokes");
  newLI.append(jokeText);
  jokes.append(newLI);
}

const getDadJoke = async () => {
  try {
    const config = {
      headers: {
        Accept: 'application/json'
      }
    };
    const res = await axios.get("https://icanhazdadjoke.com/", config);
    return res.data.joke;
  } catch (e) {
    return "NO JOKES AVAILABLE! SORRY :("
  }
};

const button = document.querySelector('button');
button.addEventListener('click', addNewJoke);
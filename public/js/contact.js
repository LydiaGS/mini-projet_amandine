let starters = [];

let header = document.getElementById('header');
let pokeballs = document.querySelector('.pokeball-container');
let card = document.getElementById('card');
let pokemon = document.getElementById('pokemon');
let name = document.getElementById('pokemon-name');
let fact = document.getElementById('pokemon-fact');

function getRegionStarters(regionID, regionName){
  let pokedex = `https://pokeapi.co/api/v2/pokedex/${regionID}/`;
  
  header.innerHTML = `${regionName} Starters`;
  pokeballs.style.visibility = 'visible';
  
  let request = new XMLHttpRequest()
request.open('GET', pokedex, true)
request.onload = function() {
  // Begin accessing JSON data here
  let data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
      starters[0] = data.pokemon_entries[0];
      starters[1] = data.pokemon_entries[3];
      starters[2] = data.pokemon_entries[6];
      console.log(starters);
  } else {
    console.log("Gah, it's not working!");
  }
}
request.send();
}

function getPokemon(starter){
  let image = `https://img.pokemondb.net/artwork/${starters[starter].pokemon_species.name}.jpg`
  
  let request = new XMLHttpRequest()
  request.open('GET', starters[starter].pokemon_species.url, true)
  request.onload = function() {
  // Begin accessing JSON data here
  let data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
      pokemon.src = image;
      name.innerHTML = starters[starter].pokemon_species.name.toUpperCase();
      fact.innerHTML = data.flavor_text_entries[1].flavor_text;
      showPokemon();
  } else {
    console.log("Gah, it's not working!");
  }
}
request.send();
}

function showPokemon(){
  card.style.display = 'block';
}

function closeCard(){
  card.style.display = 'none';
}

window.onclick = function(event) {
  if (event.target == card) {
    card.style.display = "none";
  }
}
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_img');
const pokemonElement = document.querySelector('.pokemon_element');
const pokemonHp = document.querySelector('.pokemon_hp');
const pokemonAtack = document.querySelector('.pokemon_atack');
const pokemonDefence = document.querySelector('.pokemon_defence');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

// Seach the data in the API
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
}

// Graphically show the user API information
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = 'Loading ...';
  pokemonNumber.innerHTML = '';

  const data = await fetchPokemon(pokemon);
  if (data) {
    pokemonImg.style.display = 'block';
    pokemonName.innerHTML = data['name'];
    pokemonNumber.innerHTML = data['id'];
    pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    if (pokemonElement.innerHTML = '') {
      pokemonElement.innerHTML = data['types']['0']['type']['name'];
      pokemonHp.innerHTML = data['stats']['0']['base_stat'];
      pokemonAtack.innerHTML = data['stats']['1']['base_stat'];
      pokemonDefence.innerHTML = data['stats']['2']['base_stat'];
      input.value = '';
      searchPokemon = data.id;
    } else {
      pokemonElement.innerHTML = [data['types']['0']['type']['name'], data['types']['1']['type']['name']];
      pokemonHp.innerHTML = data['stats']['0']['base_stat'];
      pokemonAtack.innerHTML = data['stats']['1']['base_stat'];
      pokemonDefence.innerHTML = data['stats']['2']['base_stat'];
      input.value = '';
      searchPokemon = data.id;
    }
  } else {
    pokemonName.innerHTML = 'Not found';
    pokemonNumber.innerHTML = '';
    pokemonImg.style.display = 'none';
    pokemonElement.innerHTML = '';
    pokemonHp.innerHTML = '';
    pokemonAtack.innerHTML = '';
    pokemonDefence.innerHTML = '';
  }
}

// Capture user information input
form.addEventListener('submit', (event) => {
  event.preventDefault();
  renderPokemon(input.value.toLowerCase());
});

// Prev button
buttonPrev.addEventListener('click', () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

// Next button
buttonNext.addEventListener('click', () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);

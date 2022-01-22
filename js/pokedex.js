const inputSection=document.getElementById("input-section");
const pokemonSection=document.querySelector(".pokemon-container");
const pokemonName=document.querySelector(".pokemon-name");
const pokemonImage=document.querySelector(".pokemon-image");
const pokemonNumber=document.querySelector(".pokemon-number");
const pokemonHeight=document.querySelector(".pokemon-heigth");
const pokemonWeight=document.querySelector(".pokemon-weigth");
const pokemonType=document.querySelector(".pokemon-type");
const pokemonPower=document.querySelector(".pokemon-power");
const pokedexTheme=document.getElementById("pokedex-sng");
const click=document.getElementById("click-sound");

const typesWithColor = {
    bug:'#209a12',
    dark:'#747c74',
    dragon:'#67ccf9',
    electric:'#f4f129',
    fairy:'#e398d6',
    fighting:'#b46d10',
    fire:'#fa2e14',
    flying:'#9fbdc3',
    ghost:'#997da2',
    grass:'#28a762',
    ground:'#735107',
    ice:'#21d5f6',
    normal:'#c5c3cf',
    poison:'#b404d2',
    psychic:'#df50c1',
    rock:'#582603',
    steel:'#7caaa7',
    water:'#3835e6'
};

let musicFlag='n';
let requestedPokemon=-1;
let secondColor="black";

function startStopMusic() {
    click.play();
    if(musicFlag==='s'){
        pokedexTheme.pause();
        musicFlag='n';
    }else{
        pokedexTheme.play();
        musicFlag='s';
    }
}

function searchPokemon()
{
    click.play();
    let input=document.getElementById("input-section");

    if(input.type==="text")
    {
        requestedPokemon=input.value.toLowerCase();
        
    } else
    {
        requestedPokemon=input.value;
    }
    fetchPokemon(requestedPokemon)
    document.querySelector(".main-footer").classList.add("footer-battle");
    document.querySelector(".button-container").classList.add("button-container-show");
}

function fetchPokemon(value) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${value}/`)
    .then((res) => res.json())
    .then((data) => {
       showPokemon(data);
    }).catch(err=>alert(err));
}


function showPokemon(pokemon) {

    pokemonSection.classList.add("pokemon-container-show");
    pokemonName.innerText=`${pokemon.name.toUpperCase()}`;
    pokemonImage.firstElementChild.src= `${pokemon.sprites.front_default}`
    pokemonNumber.innerText=`Number: #${pokemon.id}`;
    pokemonHeight.innerText=`Height: ${(pokemon.height)*10} cm`;
    pokemonWeight.innerText=`Weight: ${(pokemon.weight)/10} kg`;
    pokemonType.innerText=`Type: ${pokemon.types[0].type.name}`;
    pokemonPower.innerText=`Power: ${pokemon.stats[0].base_stat}`;

    setCardColor(pokemon.types[0].type.name);
    requestedPokemon=pokemon.id;
}

function setCardColor(type)
{
    let color=typesWithColor[type];
    pokemonImage.style.background = `linear-gradient(122deg, ${color}  24%, ${secondColor}  81%)`;
}

function nextPokemon()
{
    click.play();
    requestedPokemon++;
    fetchPokemon(requestedPokemon);
}

function previousPokemon()
{
    click.play();
    if(requestedPokemon>0)
    {
        requestedPokemon--;
        fetchPokemon(requestedPokemon);
    }
    
}
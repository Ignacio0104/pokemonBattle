const inputSection=document.getElementById("input-section");
const pokemonSection=document.querySelector(".pokemon-container");
const pokemonName=document.querySelector(".pokemon-name");
const pokemonImage=document.querySelector(".pokemon-image");
const pokemonNumber=document.querySelector(".pokemon-number");
const pokemonHeight=document.querySelector(".pokemon-heigth");
const pokemonWeight=document.querySelector(".pokemon-weigth");
const pokemonType=document.querySelector(".pokemon-type");
const pokemonPower=document.querySelector(".pokemon-power");

let requestedPokemon=-1;

function searchPokemon()
{
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
    document.querySelector(".button-container").classList.toggle("button-container-show");
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
}

function nextPokemon()
{
    requestedPokemon++;
    fetchPokemon(requestedPokemon);
}

function previousPokemon()
{
    if(requestedPokemon>0)
    {
        requestedPokemon--;
        fetchPokemon(requestedPokemon);
    }
    
}
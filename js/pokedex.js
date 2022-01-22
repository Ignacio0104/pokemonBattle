const inputSection=document.getElementById("input-section");
const pokemonSection=document.querySelector(".pokemon-container");
const pokemonName=document.querySelector(".pokemon-name");
const pokemonImage=document.querySelector(".pokemon-image");
const pokemonNumber=document.querySelector(".pokemon-number");
const pokemonHeight=document.querySelector(".pokemon-heigth");
const pokemonWeight=document.querySelector(".pokemon-weigth");
const pokemonType=document.querySelector(".pokemon-type");
const pokemonPower=document.querySelector(".pokemon-power");



function showInput(value)
{
    switch(value)
    {
        case "pokemonName":
            inputSection.type="text";
            break;
        
        case "pokemonId":
            inputSection.type="number";
            break;

    }
}

function searchPokemon()
{
    let input=document.getElementById("input-section");

    if(input.type==="text")
    {
        fetchPokemonName(input.value.toLowerCase());
    } else
    {
        fetchPokemonId(input.value);
    }


}

function fetchPokemonId(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
       showPokemon(data);
        alert(data.name);
    }).catch(err=>alert(err));
}

function fetchPokemonName(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
    .then((res) => res.json())
    .then((data) => {
        showPokemon(data);
        alert(data.name);
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
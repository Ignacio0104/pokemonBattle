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
    bug:'rgba(32,154,18,0.5102415966386555)',
    dark:'rgba(116,124,116,0.5550595238095238)',
    dragon:'rgba(103,204,249,0.5270483193277311)',
    electric:'rgba(237,232,51,0.5018382352941176)',
    fairy:'rgba(227,152,214,0.5018382352941176)',
    fighting:'rgba(180,109,16,0.5522584033613445)',
    fire:'rgba(250,46,20,0.5494572829131652)',
    flying:'rgba(159,189,195,0.5522584033613445)',
    ghost:'rgba(153,125,162,0.5578606442577031)',
    grass:'rgba(40,167,98,0.5634628851540616)',
    ground:'rgba(115,81,7,0.5578606442577031)',
    ice:'rgba(33,213,246,0.5522584033613445)',
    normal:'rgba(197,195,207,0.5410539215686274)',
    poison:'rgba(180,4,210,0.5494572829131652)',
    psychic:'rgba(223,80,193,0.5326505602240896)',
    rock:'rgba(88,38,3,0.5382528011204482)',
    steel:'rgba(124,170,167,0.5326505602240896)',
    water:'rgba(56,53,230,0.5242471988795518) '
};

let musicFlag='n';
let requestedPokemon=-1;
let secondColor="rgba(9,9,9,0.6306897759103641)";

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
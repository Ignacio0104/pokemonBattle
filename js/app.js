mainContainer=document.querySelector(".container");

let playerHand=[];
let computerHand=[];
let playerCardsDealt='n';
let computerCardsDealt='n';

function fetchPokemon(id) {
fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
    createPokemon(data);
    })
}

function displayPokemon (array)
{
    for(i=0;i<array.length;i++)
    {
        fetchPokemon(array[i]); 
        console.log(array[i]);
    }
    array=[];
}

function drawCards(array)
{
   
    let i=0
    while(i<=4)
    {
        id=Math.round(Math.random() * (386- 1) + 1);
        array.push(id);
        i++;
    }
    
}

function drawPlayerHand()
{
   if(playerCardsDealt==='n')
    {
        drawCards(playerHand);
        displayPokemon(playerHand);
        playerCardsDealt='s';

    }else
    {
        alert("Cards has already been dealt");
    }
}

function drawComputerHand()
{
    if(computerCardsDealt==='n')
    {
        drawCards(computerHand);
        displayPokemon(computerHand);
        computerCardsDealt='s';

    }else
    {
        alert("Cards has already been dealt");
    }
}


function createPokemon(pokemon)
{
    const cardContainer = document.createElement("div")
    cardContainer.classList.add('card-container');
    mainContainer.appendChild(cardContainer);

    const pokemonName = document.createElement("div");
    pokemonName.classList.add('name');
    pokemonName.innerText=`El pokemon es ${pokemon.name}`;
    cardContainer.appendChild(pokemonName);

    const imageContainer=document.createElement("div");
    imageContainer.classList.add("pokemon-image-container");
    cardContainer.appendChild(imageContainer);

    const image = document.createElement("img");
    image.classList.add("pokemon-image");
    image.src= pokemon.sprites.front_default;
    imageContainer.appendChild(image);
    
    const power = document.createElement("div");
    power.innerText=`El poder del pokemon es ${pokemon.stats[0].base_stat}`;
    cardContainer.appendChild(power);
}
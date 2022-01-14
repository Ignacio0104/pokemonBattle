mainContainer=document.querySelector(".container");

let playerHand=[];

function fetchPokemon(id) {
fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
    createPokemon(data);
    })
}

function drawPokemon()
{
    let i=0
    let pokemon;
    while(i<=4)
    {
        id=Math.round(Math.random() * (386- 1) + 1);
        playerHand.push(id);
        i++;
    }

    for(j=0;j<playerHand.length;j++)
    {
        fetchPokemon(playerHand[j]);  
    }

    playerHand=[];
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

    console.log("List");
}
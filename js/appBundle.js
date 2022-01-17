mainContainer=document.querySelector(".container");
resultsContainer=document.querySelector(".results");

let playerHand=[];
let computerHand=[];
let playerCardsDealt='n';
let computerCardsDealt='n';
let selectedPokemon=1;

//Eventlisteners

function show()
{

    for(i=0;i<playerHand.length;i++)
    {
        displayPokemon(playerHand[i]);
    }
    
    for(i=0;i<computerHand.length;i++)
    {
        displayPokemon(computerHand[i]);
    }

}

function test()
{
    for(i=0;i<playerHand.length;i++)
    {
        console.log(playerHand[i]);
    }
    
    for(i=0;i<computerHand.length;i++)
    {
        console.log(computerHand[i]);
  
    }
}

function drawPlayerHand()
{
   if(playerCardsDealt==='n')
    {
        drawCards();
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
        drawCards();
        computerCardsDealt='s';

    }else
    {
        alert("Cards has already been dealt");
    }
}

function drawCards()
{
    let i=0
    while(i<5)
    {
        id=Math.round(Math.random() * (386- 1) + 1);
        fetchPokemon(id); 
        i++;
    }

    alert("Cards dealt");

    return i;
}

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createPokemon(data);
    }).catch(err=>alert(err));
}

function createPokemon(pokemon)
{
    newPokemon = new Pokemon(pokemon.id,pokemon.name,pokemon.stats[0].base_stat,pokemon.sprites.front_default);
    
    if(playerHand.length<5)
    {
        playerHand.push(newPokemon);
  
    }else
    {
        computerHand.push(newPokemon);
    }
}



function displayPokemon(pokemon)
{
    const cardContainer = document.createElement("div")
    cardContainer.classList.add('card-container');
    mainContainer.appendChild(cardContainer);

    const pokemonNumber = document.createElement("div");
    pokemonNumber.classList.add('number');
    pokemonNumber.innerText=`${pokemon.id}`;
    cardContainer.appendChild(pokemonNumber);

    const pokemonName = document.createElement("div");
    pokemonName.classList.add('name');
    pokemonName.innerText=`${pokemon.name}`;
    cardContainer.appendChild(pokemonName);

    const imageContainer=document.createElement("div");
    imageContainer.classList.add("pokemon-image-container");
    cardContainer.appendChild(imageContainer);

    const image = document.createElement("img");
    image.classList.add("pokemon-image");
    image.src= `${pokemon.image}`
    imageContainer.appendChild(image);
    
    const power = document.createElement("div");
    power.innerText=`Pokemon Power: ${pokemon.power}`;
    cardContainer.appendChild(power);

    pokemonNumber.addEventListener("click",selectPokemon);

}

function battle(number)
{
    const results = document.createElement("div");
    resultsContainer.appendChild(results);
    let result;

    result=statComparison(playerHand[selectedPokemon].power,computerHand[number].power);

    if(result==1)
    {
        results.innerText=
        `El pokemon ${playerHand[selectedPokemon].name} venció a ${computerHand[number].name}. Punto para el jugador`;
    } else
    {
        if(result==-1)
        {
            results.innerText
            =`El pokemon ${computerHand[number].name} venció a ${playerHand[selectedPokemon].name}. Punto para la computadora`;
        } else
        {
            results.innerText=`Hubo un empate`;
        }
    }
}

function statComparison (statUno,statDos)
{
    let result=0;
    if(statUno>statDos)
    {
        result=1;
    } else
    {
        if(statUno<statDos)
        {
            result=-1
        }
    } 

    return result;
}

function selectPokemon (event)
{
    const item = event.target; //item = where we clicked
    let index;
    for(i=0;i<5;i++)
    {
        if(playerHand[i].id==item.innerText)
        {
            index=i;
        }
    }
    selectedPokemon=index;
    console.log(selectedPokemon);
}



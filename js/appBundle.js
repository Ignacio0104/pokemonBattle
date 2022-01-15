mainContainer=document.querySelector(".container");
resultsContainer=document.querySelector(".results");

let playerHand=[];
let computerHand=[];
let playerCardsDealt='n';
let computerCardsDealt='n';

//Eventlisteners


function fetchPokemon(id) {
fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
    createPokemon(data)
    }).catch(err=>alert(err));
}


function displayPokemon (array)
{
    for(i=0;i<array.length;i++)
    {
        fetchPokemon(array[i]); 
        console.log(array[i]);
    }
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
    image.src= pokemon.sprites.front_default;
    imageContainer.appendChild(image);
    
    const power = document.createElement("div");
    power.innerText=`Pokemon Power: ${pokemon.stats[0].base_stat}`;
    cardContainer.appendChild(power);

    pokemonNumber.addEventListener("click",test);
}

function battle(number)
{
    const results = document.createElement("div");
    resultsContainer.appendChild(results);

    let pokemonUnoStats;
    let pokemonDosStats;
    let pokemonUnoName;
    let pokemonDosName;
    let result;

        fetch(`https://pokeapi.co/api/v2/pokemon/${playerHand[number]}/`)
        .then((res) => res.json())
        .then((data) => {
            pokemonUnoStats=data.stats[0].base_stat;
            pokemonUnoName=data.name;
            fetch(`https://pokeapi.co/api/v2/pokemon/${computerHand[number]}/`)
            .then((res) => res.json())
            .then((data) => {
                pokemonDosStats=data.stats[0].base_stat
                pokemonDosName=data.name;

                result=statComparison(pokemonUnoStats,pokemonDosStats);

                if(result==1)
                {
                    results.innerText=`El pokemon ${pokemonUnoName} venció a ${pokemonDosName}. Punto para el jugador`;
                } else
                {
                    if(result==-1)
                    {
                        results.innerText=`El pokemon ${pokemonDosName} venció a ${pokemonUnoName}. Punto para la computadora`;
                    } else
                    {
                        results.innerText=`Hubo un empate`;
                    }
                }

            }).catch(err=>console.log(err));

        }).catch(err=>alert(err));
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

function test (event)
{
    const item = event.target; //item = where we clicked
    console.log(item.innerText);

}
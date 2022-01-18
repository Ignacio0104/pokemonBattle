const mainContainer=document.querySelector(".container");
const resultsContainer=document.querySelector(".results");
const indexScoreContainer=document.querySelector(".score-container");
const startButton=document.querySelector(".start-btn");
const showCardsButton=document.querySelector(".show-btn");


let playerHand=[];
let computerHand=[];
let pokemonUsed=[];
let playerCardsDealt='n';
let computerCardsDealt='n';
let selectedPokemon=-1;
let computerPokemon=0;
let playerPoints=0;
let computerPoints=0;

//Eventlisteners

function show()
{
    for(i=0;i<5;i++)
    {
        const backSide = document.querySelector(".card-container-back");
        backSide.parentNode.removeChild(backSide);
    }
    for(i=0;i<playerHand.length;i++)
    {
        displayPokemon(playerHand[i]);
    }

    showCardsButton.style.transform="scale(0)";
   

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

    alert("Cards dealt");

    startButton.style.transform="scale(0)";


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

    for(i=0;i<5;i++)
    {
        const cardContainerBack = document.createElement("img")
        cardContainerBack.classList.add('card-container-back');
        cardContainerBack.src="/assets/pokemon-card-back-3.png";
        mainContainer.appendChild(cardContainerBack);

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
    pokemonNumber.classList.add('pokemon-number');
    pokemonNumber.innerText=`${pokemon.id}`;
    cardContainer.appendChild(pokemonNumber);

    const pokemonName = document.createElement("div");
    pokemonName.classList.add('pokemon-name');
    pokemonName.innerText=`${pokemon.name.toUpperCase()}`;
    cardContainer.appendChild(pokemonName);

    const imageContainer=document.createElement("div");
    imageContainer.classList.add("pokemon-image-container");
    cardContainer.appendChild(imageContainer);

    const image = document.createElement("img");
    image.classList.add("pokemon-image");
    image.src= `${pokemon.image}`
    imageContainer.appendChild(image);
    
    const power = document.createElement("div");
    power.classList.add("pokemon-power");
    power.innerText=`Pokemon Power: ${pokemon.power}`;
    cardContainer.appendChild(power);

    pokemonNumber.addEventListener("click",selectPokemon);

}

function battle()
{
    if(selectedPokemon>-1)
    {
        if(pokemonUsed.indexOf(selectedPokemon)===-1)
        {
            const results = document.createElement("div");
            resultsContainer.appendChild(results);
            let result;
        
            displayPokemon(computerHand[computerPokemon]);
            result=statComparison(playerHand[selectedPokemon].power,computerHand[computerPokemon].power);
            
            if(result==1)
            {
                results.innerText=
                `${playerHand[selectedPokemon].name.toUpperCase()} has beaten ${computerHand[computerPokemon].name.toUpperCase()}. Point for the player`;
                playerPoints++;

            } else
            {
                if(result==-1)
                {
                    results.innerText
                    =`${computerHand[computerPokemon].name.toUpperCase()} has beaten ${playerHand[selectedPokemon].name.toUpperCase()}. Point for the computer`;
                    computerPoints++;
                } else
                {
                    results.innerText=`There was a tie`;
                }
            } 
            pokemonUsed.push(selectedPokemon);
            computerPokemon++;
            showScoreBoard();

        }else
        {
            alert("This pokemon has already been used");
        }

    }else
    {
        alert("Please select your Pokemon");
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

function showScoreBoard()
{
    indexScoreContainer.innerText="Scoreboard";

    const playerScore = document.createElement("div")
    playerScore.classList.add('player-container');
    playerScore.innerText=`Player: ${playerPoints}`;
    indexScoreContainer.appendChild(playerScore);
   
    const computerScore = document.createElement("div")
    computerScore.classList.add('computer-container');
    computerScore.innerText=`Computer: ${computerPoints}`;
    indexScoreContainer.appendChild(computerScore);

}



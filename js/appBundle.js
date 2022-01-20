const mainContainer=document.querySelector(".container");
//const resultsContainer=document.querySelector(".results");
const indexScoreContainer=document.querySelector(".score-container");
const startButton=document.querySelector(".start-btn");
const showCardsButton=document.querySelector(".show-btn");
const battleButton=document.querySelector(".battle-btn");
const keypad=document.querySelector(".button-container");
const messageBoard=document.querySelector(".messages");
const openingSong= document.getElementById("start-sng");
const battleSong= document.getElementById("battle-sng");
const wonRound=document.getElementById("won-snd");
const lostRound= document.getElementById("lose-snd");
const wonGame=document.getElementById("victory-sng");
const lostGame=document.getElementById("lose-sng");

let playerHand=[];
let computerHand=[];
let pokemonUsed=[];
let playerCardsDealt='n';
let computerCardsDealt='n';
let pokemonSelection='n';
let musicFlag='s';
let selectedPokemon=-1;
let computerPokemon=0;
let playerPoints=0;
let computerPoints=0;
let roundNumber=0;


function startStopMusic()
{
    if(musicFlag==='s')
    {
        musicFlag='n';
    }else
    {
        musicFlag='s';
    }

    if(playerCardsDealt==='s')
    {   
        battleSongTheme();
    }else
    {
        startSong();
    }
}

function startSong()
{
    if(musicFlag==='s')
    {
        openingSong.play();
    }else
    {
        openingSong.pause();
    } 
}

function battleSongTheme()
{
    if(musicFlag==='s')
    {
        openingSong.pause();
        battleSong.play();
    }else
    {
        battleSong.pause();
    } 

}
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

    showCardsButton.style.display="none";
    messageBoard.style.display="flex";
    battleButton.style.display="flex";

   

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

    startButton.style.display="none";
    showCardsButton.style.display="flex";
    
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
        cardContainerBack.src="/assets/img/pokemon-card-back-3.png";
        mainContainer.appendChild(cardContainerBack);

    }

    alert("Good luck!");
    battleSongTheme();


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
    power.innerText=`Power: ${pokemon.power}`;
    cardContainer.appendChild(power);

    pokemonNumber.addEventListener("click",selectPokemon);
  

}

function battle()
{
    if(selectedPokemon>-1)
    {
        if(pokemonUsed.indexOf(selectedPokemon)===-1)
        {
            let result=statComparison(playerHand[selectedPokemon].power,computerHand[computerPokemon].power);
            messageBoard.innerText="";
            displayPokemon(computerHand[computerPokemon]);
            
            if(result==1)
            {
                messageBoard.innerText=
                `${playerHand[selectedPokemon].name.toUpperCase()} has beaten ${computerHand[computerPokemon].name.toUpperCase()}. Point for the player`;
                playerPoints++;
                wonRound.play();
                messageBoard.style.background="#3ad5c1";
                

            } else
            {
                if(result==-1)
                {
                    messageBoard.innerText
                    =`${computerHand[computerPokemon].name.toUpperCase()} has beaten ${playerHand[selectedPokemon].name.toUpperCase()}. Point for the computer`;
                    computerPoints++;
                    lostRound.play();
                    messageBoard.style.background="#ec604a";
                    
                } else
                {
                    messageBoard.innerText=`There was a tie`;
                    messageBoard.style.background="black";
                }
            } 
            pokemonUsed.push(selectedPokemon);
            pokemonSelection='n';
            showScoreBoard();
            computerPokemon++;
        }else
        {
            alert("This pokemon has already been used");
        }

    }else
    {
        messageBoard.innerText="No Pokemon Selected";
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
    if(pokemonSelection==='n')
    {
        const item = event.target; //item = where we clicked
        item.parentElement.style.opacity="0.3";
        let index;
        for(i=0;i<5;i++)
        {
            if(playerHand[i].id==item.innerText)
            {
                index=i;
            }
        }
        selectedPokemon=index;
        pokemonSelection='s';
    } else
    {
        alert("You've already selected a Pokemon!");
    }

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
    
    roundNumber++;
    
    if(roundNumber>5)
    {
        if(computerPoints>playerPoints)
        {
            messageBoard.innerText="Better luck next time!";

            if(musicFlag==='s')
            {
                battleSong.pause();
                lostGame.play();
            }

            messageBoard.style.background="black";
        } else 
        {
            if(playerPoints>computerPoints)
            {
                messageBoard.innerText="Congratulations!! You won!";
                if(musicFlag==='s')
                {
                    battleSong.pause();
                    wonGame.play();
                }
                messageBoard.style.background="black";
            } else
            {
                messageBoard.innerText="There was a tie!";
                messageBoard.style.background="black";
            }
        }

    }

}

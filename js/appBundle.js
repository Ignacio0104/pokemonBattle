function startStopMusic() {
    if(musicFlag==='s'){
        musicFlag='n';
    }else{
        musicFlag='s';
    }
    if(playerCardsDealt==='s'){   
        battleSongTheme();
    }else{
        startSong();
    }
}


function startSong() {
    if(musicFlag==='s'){
        openingSong.play();
    }else{
        openingSong.pause();
    } 
}

function battleSongTheme() {
    if(musicFlag==='s'){
        openingSong.pause();
        battleSong.play();
    }else{
        battleSong.pause();
    } 

}
function show() {
    for(i=0;i<5;i++){
        const backSide = document.querySelector(".card-container-back");
        backSide.parentNode.removeChild(backSide);
    }
    for(i=0;i<playerHand.length;i++){
        displayPokemon(playerHand[i]);
    }
    showCardsButton.style.display="none";
    battleButton.style.display="flex";
}

function drawPlayerHand() {
   if(playerCardsDealt==='n'){
        drawCards();
        playerCardsDealt='s';
    }else{
        alert("Cards has already been dealt");
    }

    startButton.style.display="none";
    showCardsButton.style.display="flex";
}

function drawComputerHand() {
    if(computerCardsDealt==='n'){
        drawCards();
        computerCardsDealt='s';
    }else{
        alert("Cards has already been dealt");
    }
    for(i=0;i<5;i++)
    {
        const cardContainerBack = document.createElement("img")
        cardContainerBack.classList.add('card-container-back');
        cardContainerBack.src="./assets/img/pokemon-card-back-3.png";
        mainContainer.appendChild(cardContainerBack);
    }
    alert("Good luck!");
    battleSongTheme();
}

function drawCards() {
    let i=0
    while(i<5){
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

function createPokemon(pokemon) {
    newPokemon = new Pokemon(pokemon.id,pokemon.name,pokemon.stats[0].base_stat,pokemon.sprites.front_default);
    
    if(playerHand.length<5){
        if(repeatedPokemon(newPokemon.id)===0){
            playerHand.push(newPokemon);
        }else{
            console.log("pokemonRepetido");
        }
    }else{
        computerHand.push(newPokemon);
    }
}

function repeatedPokemon(id) {
    let repeated = 0;
    for(i=0;i<playerHand.length;i++){
        if(playerHand[i].id===id){
            repeated=-1;
        }
    }
    return repeated;
}

function displayPokemon(pokemon) {
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

    if(pokemon.power>50&&pokemon.power<90){
        imageContainer.classList.add('medium-power');
    } else if (pokemon.power>90&&pokemon.power<110){
            imageContainer.classList.add('high-power');
        } else if(pokemon.power>110){
                imageContainer.classList.add('super-power');
            } else{
                imageContainer.classList.add('low-power');
            }

    image.addEventListener("click",selectPokemon);

}


function battle() {
    messageBoard.style.display="flex";
    if(selectedPokemon>-1){
        if(pokemonUsed.indexOf(selectedPokemon)===-1){
            let result=statComparison(playerHand[selectedPokemon].power,computerHand[computerPokemon].power);
            messageBoard.innerText="";
            displayPokemon(computerHand[computerPokemon]);
            
            switch(result)
            {
                case 1:
                    messageBoard.innerText=
                    `${playerHand[selectedPokemon].name.toUpperCase()} has beaten ${computerHand[computerPokemon].name.toUpperCase()}. Point for the player`;
                    playerPoints++;
                    wonRound.play();
                    messageBoard.style.background="#3ad5c1";
                    break;
                case -1:
                    messageBoard.innerText
                    =`${computerHand[computerPokemon].name.toUpperCase()} has beaten ${playerHand[selectedPokemon].name.toUpperCase()}. Point for the computer`;
                    computerPoints++;
                    lostRound.play();
                    messageBoard.style.background="#ec604a";
                    break;
                default:
                    messageBoard.innerText=`There was a tie`;
                    messageBoard.style.background="black";
                    break;
            }
            pokemonUsed.push(selectedPokemon);
            pokemonSelection='n';
            showScoreBoard();
            computerPokemon++;
        }else{
            alert("This pokemon has already been used");
        }

    }else{
        messageBoard.innerText="No Pokemon Selected";
        alert("Please select your Pokemon");
    }
}

function statComparison (statUno,statDos) {
    let result=0;
    if(statUno>statDos){
        result=1;
    } else{
        if(statUno<statDos){
            result=-1
        }
    } 
    return result;
}

function selectPokemon (event) {
    if(pokemonSelection==='n'){
        const item = event.target; //item = where we clicked
        item.parentElement.parentElement.style.opacity="0.3";
        let clickedPokemon=item.parentElement.parentElement.firstChild.innerText;
        let index;
        for(i=0;i<5;i++){
            if(playerHand[i].id==clickedPokemon){
                index=i;
            }
        }
        selectedPokemon=index;
        pokemonSelection='s';
    } else{
        alert("You've already selected a Pokemon!");
    }

}

function showScoreBoard() {
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
    
    if(roundNumber>5){
        messageBoard.style.background="black";
        battleSong.pause();
        if(computerPoints>playerPoints){
            messageBoard.innerText="Better luck next time!";

            if(musicFlag==='s'){
                lostGame.play();
            } 

        } else {
            if(playerPoints>computerPoints){
                messageBoard.innerText="Congratulations!! You won!";
                if(musicFlag==='s'){
                    wonGame.play();
                }
            } else{
                tieGame.play();
                messageBoard.innerText="There was a tie!";
            }
        }

    }

}

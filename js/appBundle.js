
/**
 * Function to change the music flag and to select the correct song
 */
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

/**
 * Function to pause or play the start Song
 */

function startSong() {
    if(musicFlag==='s'){
        openingSong.play();
    }else{
        openingSong.pause();
    } 
}

/**
 * Function to pause o play the battle song
 */

function battleSongTheme() {
    if(musicFlag==='s'){
        openingSong.pause();
        battleSong.play();
    }else{
        battleSong.pause();
    } 

}
/**
 * Function to show the cards and remove the backside carts
 */
function show() {
    for(i=0;i<5;i++){
        const backSide = document.querySelector(".card-container-back");
        backSide.parentNode.removeChild(backSide);//Remove the element with the backside img
    }
    for(i=0;i<playerHand.length;i++){
        displayPokemon(playerHand[i]);
    }
    showCardsButton.style.display="none";
    battleButton.style.display="flex";
}

/**
 * Function to call drawCards and change the flag (player)
 */
function drawPlayerHand() {
   if(playerCardsDealt==='n'){
        drawCards();
        playerCardsDealt='s';
    }else{
        alert("Cards has already been dealt"); //Not used now since the start botton desapear
    }

    startButton.style.display="none";
    showCardsButton.style.display="flex";
}
/**
 * Function to call drawCards and change the flag (computer)
 */

function drawComputerHand() {
    if(computerCardsDealt==='n'){
        drawCards();
        computerCardsDealt='s';
    }else{
        alert("Cards has already been dealt"); //Not used now since the start botton desapear
    }
    for(i=0;i<5;i++)
    {
        const cardContainerBack = document.createElement("img") //Create the elements where the backside cards will be shown
        cardContainerBack.classList.add('card-container-back');
        cardContainerBack.src="./assets/img/pokemon-card-back-3.png";
        mainContainer.appendChild(cardContainerBack);
    }
  
    battleSongTheme();
}

/**
 * Function to pick a random ID within the limits and call fetchPokemon
 */

function drawCards() {
    let i=0
    while(i<5){
        id=Math.round(Math.random() * (386- 1) + 1);
        fetchPokemon(id); 
        i++;
    }

}

/**
 * 
 * @param {*} id -> receives the random id previously generates
 * Function to comunicate with the API and bring the pokemon information
 */

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then((res) => res.json())
    .then((data) => {
        createPokemon(data);
    }).catch(err=>alert(err));
}

/**
 * 
 * @param {*} pokemon receives the fetched pokemon
 * Function to create a new object from the class Pokemon with the fetched data
 */
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

/**
 * 
 * @param {*} id receives an id
 * @returns 0 if the id isn't in the array or -1 if is repeated
 * Function to check if the created pokemon is already in the player hand
 */

function repeatedPokemon(id) {
    let repeated = 0;
    for(i=0;i<playerHand.length;i++){
        if(playerHand[i].id===id){
            repeated=-1;
        }
    }
    return repeated;
}

/**
 * 
 * @param {*} pokemon receives the pokemon
 * Function to manipulate the DOM and create all the necessary element to show the pokemon information
 */
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

    if(pokemon.power>50&&pokemon.power<=90){ //Assign a background color according to the pokemon's power
        imageContainer.classList.add('medium-power');
    } else if (pokemon.power>90&&pokemon.power<=110){
            imageContainer.classList.add('high-power');
        } else if(pokemon.power>110){
                imageContainer.classList.add('super-power');
            } else{
                imageContainer.classList.add('low-power');
            }

    image.addEventListener("click",selectPokemon); //Creates the event listener to select the pokemon

}

/**
 * Function to call the comparison function and show the correct message according to the result
 */
function battle() {
    messageBoard.style.display="flex";

    if(selectedPokemon>-1){
        if(pokemonUsed.indexOf(selectedPokemon)===-1){
            let result=statComparison(playerHand[selectedPokemon].power,computerHand[computerPokemon].power);
            messageBoard.innerText="";
            document.querySelector(".main-footer").classList.add("footer-battle"); //Change the position of the footer
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
/**
 * 
 * @param {*} statUno receives the first pokemon's power
 * @param {*} statDos receives the second pokemon's power
 * @returns 0 if they are equal, -1 if the second one is bigger than the first or 1 if the first one is bigger than the second one
 * Function to compare the computer's pokemon vs the player's pokemon
 */
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

/**
 * 
 * @param {*} event receives the event (click)
 * Function called by the event listener and assign the index of the pokemon to the selectedPokemon var
 */

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

/**
 * Function to create all the necessary elements to show the scoreboard 
 */

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

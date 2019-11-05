import Game from './models/Game';
import { elements, sfx } from './views/base';
import * as gameView from './views/gameView'
import * as playerView from './views/playerView';
import * as dealerView from './views/dealerView';
import './../styles/main.css';


// Global variable to store state
const state = {};

init();

// Handle bet
elements.betControl.addEventListener('click', e => {
    // Get bet amount from UI
    const input = gameView.getBet(e);

    // Add bet amount to state
    const bet = state.game.player.addBet(input);
    
    // Play sound effects
    if (!state.game.isMuted) sfx.chips.play();

    // Update UI
    playerView.renderPlayer(state.game.player);

    gameView.displayBet(bet);
    gameView.displayBankTotal(state.game.player.bank);
});

elements.actionControl.addEventListener('click', e => {
    const action = e.target.dataset.action;
    let gameStatus = '';

    if (!state.game.isPlaying) {

        if (action === 'deal') controlDeal();
        
        // Disable bet buttons during play
        gameView.toggleBetButtons(state.game.isPlaying);

        speak('no more bets');
    } 

    if (state.game.isPlaying) { 
 
        if (action === 'hit') state.game.hit();
        if (action === 'double') controlDouble();
        if (action === 'split') controlSplit();
        if (action === 'stand') controlStand();
        
        state.game.player.calcScore();

        playerView.clear();
        dealerView.clear();
        playerView.renderPlayer(state.game.player);
        dealerView.renderDealer(state.game.dealer);

        
        speak(state.game.getCurrentHandScore());
    }

    if (state.game.isTooMany()) {

        speak('too many');
        state.game.nextHand();
        gameStatus = 'Bust!'
        
        // playerView.renderPlayer(state.game.player);
        
    } 

    if (state.game.isGameOver()) {
        
        setTimeout(function() {
            gameView.displayGameOverScreen(gameStatus);   
        }, 2000);
    }

});

elements.gameEndScreen.addEventListener('click', e => {
    const action = e.target.dataset.action;

    if (action === 'replay') {
        // Reset game
        state.game.reset();

        // Prepare UI for changes
        playerView.clear();
        dealerView.clear();
        gameView.clear();
        gameView.toggleBetButtons();
    }

});

elements.muteBtn.addEventListener('click', e => {
    state.game.toggleMute();
    gameView.toggleMute(state.game.isMuted);
});



function controlDeal() {
    // Deal cards to players
    state.game.deal();

    if (!state.game.isMuted) sfx.cards.play();
}

function controlDouble() {
    // Deal next card to player
    state.game.hit();

    // Double bet size
    state.game.double();

    // Update Bank display;
    gameView.displayBankTotal(state.game.player.bank);

    // Go to next hand
    state.game.nextHand();

    console.log(state.game);

    if (state.game.isGameOver()) {
        state.game.endPlayerTurn();
        
        state.game.dealerTurn();

        const gameStatus = state.game.checkScore();

        speak(gameStatus);

        gameView.displayBankTotal(state.game.player.bank);

       
        gameView.displayGameOverScreen(gameStatus);
    }

}

function controlSplit() {
    // Check if hand can be split
    if (state.game.isPair()) {
        // Create a new hand
        state.game.split();

        gameView.displayBankTotal(state.game.player.bank);
    }
}

function controlStand() {
    // Go to next hand
    state.game.nextHand();


    if (state.game.isGameOver()) {

        state.game.endPlayerTurn();
        
        state.game.dealerTurn();

        const gameStatus = state.game.checkScore();

        speak(gameStatus);

        gameView.displayBankTotal(state.game.player.bank);

        
        setTimeout(function() {
            gameView.displayGameOverScreen(gameStatus);   
        }, 2000);

    }
}


function speak(str) {
    if (!state.game.isMuted) responsiveVoice.speak(str);
}

function init() {
  
    // Create new game
    state.game = new Game();
    state.game.startGame();

    // Show bank total on UI
    gameView.displayBankTotal(state.game.player.bank);

    speak('place your bets');

    // TESTING
/*     state.game.player.bet = 50;
    controlDeal();

    state.game.player.calcScore();

    playerView.renderPlayer(state.game.player);
    dealerView.renderDealer(state.game.dealer); */
}






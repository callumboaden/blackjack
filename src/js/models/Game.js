import Player from './Player';
import Dealer from './Dealer';
import Deck from './Deck';
import Hand from './Hand';

export default class Game {
    constructor() {
        this.player = new Player();
        this.dealer = new Dealer();
        this.deck = new Deck();
        this.gameOver = false;
        this.isMuted = true;
        this.isPlaying = false;
    }

    startGame() { 
        this.deck.createDeck();
        this.deck.shuffleDeck()
    }

    reset() {
        this.player.reset();
        this.dealer = new Dealer();
        this.gameOver = false;
        this.isPlaying = false;
        this.winner = {};
    }

    getCurrentHandScore() {
        
        return this.player.getCurrentHand().score.toString(10);
    }

    toggleMute() {
        if (this.isMuted) {
            this.isMuted = false;
        } else if (!this.isMuted) {
            this.isMuted = true;
        }

        return this.isMuted;
    }

    deal() {

        // Player must place bet before cards are dealt
        if (this.player.bet) {
            this.isPlaying = true;
            const playerHand = new Hand(this.deck.createHand(), this.player.bet);
            
            // TESTING SPLIT HAND
           /*  const card1 = {suit: "hearts", value: "A", weight: 1, string: "AH"}
            const card2 = {suit: "clubs", value: "A", weight: 1, string: "AD"}
            
            const playerHand = new Hand([card1, card2], this.player.bet);
             */
            console.log(playerHand);
            /* /TESTING */

            this.player.hands.push(playerHand);
            this.dealer.cards.push(this.deck.getNextCard(), this.deck.getNextCard());
            
        }
        
    
    }

    hit() {
        if (this.player.getCurrentHand().score <= 21) {
            this.player.getCurrentHand().cards.push(this.deck.getNextCard());
        }  
    }

    double() {
        // Get bet amount from current hand & double
        // const currentHand = this.player.hands[this.player.currentHand];
        
        const bet = this.player.getCurrentHand().bet;
        this.player.getCurrentHand().bet += bet;
        this.player.bank -= bet;

    }

    // Check if hand has cards with the same weight
    isPair() {
        return this.player.getCurrentHand().cards.every((c, i, arr) => c.weight === arr[0].weight);
    }

    // Check if player has score > 21 in current hand
    isTooMany() {
        if (this.player.getCurrentHand()) {
            return this.player.getCurrentHand().score > 21;
        }
    }

    isGameOver() {
        return this.gameOver && this.player.currentHand === this.player.hands.length;
    }

    endPlayerTurn() {
        this.isPlaying = false;
        this.dealer.isTurn = true;
    }

    nextHand() {
        this.player.currentHand++;

        if (this.player.currentHand === this.player.hands.length) this.gameOver = true;
    }

    checkScore() {
        const playerName = this.player.constructor.name;
        const dealerName = this.dealer.constructor.name;
        const dealerScore = this.dealer.score;

        let gameStatus = '';
        let win = 0;

        // Loop through players hands and check score
        this.player.hands.forEach(hand => {

            if (hand.score > 21) {
                hand.status = `Bust`;
                
                gameStatus = `Too many`;
            }

            else if (hand.score === dealerScore) {
                win = hand.bet;
                this.player.bank += win;
                hand.status = `Push`;
                
                gameStatus = `${hand.status}`;
                
            } else if (hand.score === 21 && hand.cards.length === 2) {
                win = (hand.bet * 2) * 1.5;
                this.player.bank += win;
                hand.status = `Blackjack!`;
                
                gameStatus = `${hand.status}`;

            } else if (dealerScore < hand.score && hand.score <= 21) {
                win = (hand.bet * 2);
                this.player.bank += win;
                hand.status = `Win`;

                gameStatus = `${hand.score}. ${playerName} wins!`;

            } else if (dealerScore > 21 && hand.score <= 21) {
                win = (hand.bet * 2);
                this.player.bank += win;
                hand.status = `Win`;

                gameStatus = `${hand.score}. ${playerName} wins!`;

            } else if (hand.score < dealerScore) {
                hand.status = `Lose`;

                gameStatus = `${dealerName} has ${dealerScore}`

            } 

        });

        
        return gameStatus;
    }

    dealerTurn() {

        while (this.dealer.getScore() < 16) {
            this.dealer.cards.push(this.deck.getNextCard());
        }

    }

    split() {
        let bet = this.player.getCurrentHand().bet;
        const newCards = [];


        // Remove card from current cards and push into new cards array
        const removedCard = this.player.getCurrentHand().cards.shift();
        newCards.push(removedCard, this.deck.getNextCard());
        // Create new hand object and push into hands array
        const newHand = new Hand(newCards, bet);
        this.player.hands.push(newHand);
        
        // Get new card and push into current cards array
        this.player.getCurrentHand().cards.push(this.deck.getNextCard());
        console.log(this.player.getCurrentHand());

        // Update bank
        this.player.bank -= bet;
    
    }
   
}
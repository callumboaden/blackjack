import Hand from './Hand';
import Deck from './Deck';

export default class Player {
    constructor() {
        this.hands = [];
        this.chips = [];
        this.bet = 0; 
        this.bank = 1000;
        this.currentHand = 0;
    }

    // update player total bet + bank;
    addBet(bet) {
        this.chips.push(bet);
        // add new bet to total bet amount if bet !> bank
        if (bet <= this.bank) {
            // add bet to total
            this.bet += parseInt(bet, 10);
            // minus bet from bank
            this.bank -= parseInt(bet, 10);
        } 
        
        if (this.hands.length === 1) {
            this.hands[this.currentHand].bet += parseInt(bet, 10);
        }

        return this.bet;

    }

    clearBet() {
        // add bet to bank and reset bet to 0
        this.bank += this.bet;
        this.bet = 0;
    }

    calcScore() {
       let score = 0;

       // calculate score of hand
        this.hands.forEach(hand => {
            score = 0;
            hand.cards.forEach(el => {
                score += el.weight;
            })
            hand.score = score;
        });

        // if score > 21 check if hand has an ace
        this.hands.forEach(hand => {
            if (hand.score > 21) {
                hand.score = 0;
                hand.cards.forEach(card => {
                    if (card.value === 'A') {   
                        card.weight = 1;
                    }
                    hand.score += card.weight;
                });
            }
        });
    }

    getCurrentHand() {
        return this.hands[this.currentHand];
    }

    reset() {
        this.hands = [];
        this.bet = 0;
        this.currentHand = 0;
        this.chips = [];
    }
}
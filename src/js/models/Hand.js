export default class Hand {
    constructor(cards, bet) {
        this.chips = [];
        this.cards = cards;
        this.score = 0;
        this.status = '';
        this.bet = bet;
    }
}
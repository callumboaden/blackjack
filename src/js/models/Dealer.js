
export default class Dealer {
    constructor() {
        this.cards = [];
        this.score = 0;
        this.isTurn = false;
        this.isWinner = false;
    }

    getScore() {
        let score = 0;
 
        // calculate score of hand
        this.cards.forEach(card => { score += card.weight; });

        this.score = score;

        return this.score;

    }
}
export default class Deck {

    createDeck() {
        let deck = [];
        let card = {};
        const suits = ['hearts', 'diamonds', 'spades', 'clubs']
        const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        suits.forEach(suit => {
            values.forEach(value => {
                card = {
                    suit: suit,
                    value: value
                }

                // set card weight
                if (card.value === 'A') {
                    card.weight = 11;
                } else if (card.value === 'J' || card.value === 'Q' || card.value === 'K') {
                    card.weight = 10;
                } else {
                    card.weight = parseInt(card.value, 10);
                }

                card.string = `${value}${suit.slice(0, 1).toUpperCase()}`;  
                
                deck.push(card);
            });

        });

        this.deck = deck;
        return deck;
    }

    shuffleDeck() {
        this.deck.forEach((card, i) => {
            let swapIndex = Math.floor(Math.random() * this.deck.length);
            let randomCard = this.deck[swapIndex];
            this.deck[i] = randomCard;
            this.deck[swapIndex] = card;
        })
    }

    createHand() {
        return [this.deck.shift(), this.deck.shift()];
    }
    
    getNextCard() {
        return this.deck.shift();
    }

}
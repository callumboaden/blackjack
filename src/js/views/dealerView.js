import { elements } from './base';


export const clear = () => elements.dealerDisplay.innerHTML = '';

export const renderDealer = obj => {
    createHand(obj);
}

const createHand = obj => {
    let isTurn = obj.isTurn;

    let markup = `
        <div class="dealer__hand">${createCards(obj.cards, isTurn)}</div>
        <div class="dealer__score">${isTurn ? showScore(obj.score) : ''}</div>
    `;

    elements.dealerDisplay.insertAdjacentHTML('beforeend', markup)
}

const createCards = (cards, isTurn) => {
    let markup = '';

    cards.map((card, i) => {
        if (i === 0 && !isTurn) {
            markup += `<img src="./img/svg/BC.svg">`
        } else {
            markup += `<img class src="./img/svg/${card.string}.svg">`
        }
    });

    return markup;
}

const showScore = score => {
    let markup = `<div class="dealer__score">${score}</div>`;

    elements.dealerDisplay.insertAdjacentHTML('beforeend', markup);
}


import { elements } from "./base";

export const clear = () => elements.playerHandDisplay.innerHTML = '';

export const renderPlayer = obj => {
    // console.log(obj)
    createHand(obj.chips, obj.hands, obj.currentHand);

    if (obj.hands.length === 0) {
        renderChips(obj.chips);
    } else {
        elements.chipDisplay.innerHTML = '';
    }
}

const renderChips = chips => {
    
    let markup = chips.map(el => renderChip(el)).join(' ');

    elements.chipDisplay.innerHTML = '';
    elements.chipDisplay.insertAdjacentHTML('beforeend', markup);
}

const createHand = (chips, hands, currentHand) => {
    let markup = '';
    
    hands.map((hand, i) => {
        markup += `
            <div class="player__hand hand-${i} ${i === currentHand ? 'active' : 'inactive'}">
                <div class="hand__chips">
                    ${chips.map(el => renderChip(el)).join(' ')}
                </div>
                <div class="hand__cards">
                    ${hand.cards.map(el => createCard(el)).join(' ')} 
                </div>
                <div class="hand__status">
                    <div class="hand__score">Score: ${hand.score}</div> 
                    <div class="hand__bet">Bet: ${hand.bet}</div>
                    <div class ="hand__status">${hand.status}</div>
                </div>
            </div>
        `;
    });

    elements.playerHandDisplay.insertAdjacentHTML('beforeend', markup);

    return markup;
}

// const createCard = card => `<img src="./img/svg/${card.string}.svg">`;
const renderChip = chip => `<div class="chip chip-${chip}"></div>`;

const createCard = card => `
    <div class="card">
        <div class="card__inner">
            <div class="card__front">
                <img src="./img/svg/BC.svg">
            </div>
            <div class="card__back">
                <img src="./img/svg/${card.string}.svg" alt="Ace of Hearts">
            </div>
        </div>
    </div>
`;
import { elements } from './base';

export const clear = () => {
    elements.betDisplay.innerHTML = '';
    elements.gameEndScreen.innerHTML = '';
    elements.gameEndScreen.classList.remove('active');
}

export const getBet = e => e.target.dataset.bet;

export const displayBet = bet => elements.betDisplay.innerHTML = bet;

export const displayBankTotal = bank => elements.bankDisplay.innerHTML = bank;

export const displayGameOverScreen = gameStatus => {
    let markup = `
        <div class="game__info">
            <h3 class="game__status">${gameStatus}</h3>
            <button class="btn btn-replay" data-action="replay">Play again?</button>
        </div>
    `;


    elements.gameEndScreen.classList.add('active');
    elements.gameEndScreen.insertAdjacentHTML('beforeend', markup);
}

export const toggleMute = isMuted => {
    let icon = elements.muteBtn.firstChild;

    if (!isMuted) {
        icon.classList.remove('fa-volume-mute');
        icon.classList.add('fa-volume-up');
    } else {
        icon.classList.add('fa-volume-mute');
        icon.classList.remove('fa-volume-up');
    }

}

export const toggleBetButtons = isPlaying => {
    let buttons = elements.betControl.childNodes;

    buttons.forEach(el => {
        if (el.dataset) {
            if (isPlaying) {
                el.disabled = true;
                el.classList.add('disabled');
            } else {
                el.disabled = false;
                el.classList.remove('disabled');
            }
        }
    });
}
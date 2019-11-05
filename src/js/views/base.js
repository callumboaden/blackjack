export const elements = {
    betControl: document.querySelector('.game__buttons--bet'),
    betDisplay: document.querySelector('.player__bet span'),
    bankDisplay: document.querySelector('.bank__total'),
    actionControl: document.querySelector('.game__buttons--play'),
    playerHandDisplay: document.querySelector('.player__hand__list'),
    chipDisplay: document.querySelector('.player__chips'),
    dealerDisplay: document.querySelector('.dealer'),
    gameEndScreen: document.querySelector('.game__screen'),
    muteBtn: document.querySelector('.mute__btn, .mute-btn *')
}

export const sfx = {
    chips: new Audio('./../audio/chips.wav'),
    cards: new Audio('./../audio/play-card.wav')
}
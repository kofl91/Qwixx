import {DICE_COLORS} from "./Game/DiceBoard";
import * as QwixxGame from "./Game/Quinx";

export const rollDiceAction = () => ({
    type: 'ADD_TODO'
});

export const addToGamecardAction = (player,digit,color) => ({
    type: 'ADD_TO_GAMECARD',
    player,
    digit,
    color
});

const playerDefault = {
    enteredWhites: false,
    enteredAll: false,
    RED: [],
    BLUE: [],
    YELLOW: [],
    GREEN: [],
    failthrows: 0,
    lockedRowsCounter: 0,
};

export const diceDefault = {
    WHITE1: 0,
    WHITE2: 0,
    RED: 0,
    YELLOW: 0,
    GREEN: 0,
    BLUE: 0,
};
const defaultState = {
    phase: QwixxGame.DICE_ROLL,
    allPlayer: ['IVET', 'KIM'],
    activePlayer: 'IVET',
    IVET: playerDefault,
    KIM: playerDefault,
    diceRolls: diceDefault,
    lockedRows: [],
};



const qwixx = (state = defaultState, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                phase: 'ENTER_WHITE',
                diceRolls: rollDice(),
            };
        case 'ADD_TO_GAMECARD':
            let phase = state.phase;
            if (action.player === state.activePlayer) {
                phase = QwixxGame.WAIT_FOR_PLAYERS;
            }
            return {
                ...state,
                [action.player]: addToGameCard(state, action.player, action.digit, action.color),
                phase
            };
        default:
            return state;
    }
};

const addToGameCard = (state, player, digit, color) => {
    let gamecard = state[player];
    gamecard[color].push(parseInt(digit));
    gamecard[color] = gamecard[color].sort((a, b) => a - b);
    if (QwixxGame.isWhiteOnlyChoice(state.diceRolls, digit)) {
        gamecard.enteredWhites = true;
        if (state.activePlayer !== player) {
            gamecard.enteredAll = true;
        }
    } else {
        gamecard.enteredAll = true;
    }
    return gamecard;
};

const rollDice = () => {
    let diceRolls = {};
    DICE_COLORS.forEach(color => {
        diceRolls[color] = Math.floor(Math.random() * 6) + 1;
    });
    return diceRolls;
};

export default qwixx
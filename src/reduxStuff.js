import {DICE_COLORS} from "./Game/DiceBoard";
import * as QwixxGame from "./Game/Quinx";

export const rollDiceAction = () => ({
    type: 'ADD_TODO'
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

let diceDefault = {
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
    console.log(state);
    console.log(action);
    switch (action.type) {
        case 'ADD_TODO':
            return {
                phase: 'ENTER_WHITE',
                dices: rollDice(),
            };
        default:
            return state;
    }
};

const rollDice = () => {
    let diceRolls = {};
    DICE_COLORS.forEach(color => {
        diceRolls[color] = Math.floor(Math.random() * 6) + 1;
    });
    return diceRolls;
};

export default qwixx
import {DICE_COLORS} from "./Game/DiceBoard";

export const rollDiceAction = () => ({
    type: 'ADD_TODO'
});

const qwixx = (state = {}, action) => {
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
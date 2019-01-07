import {calculateScore, canLockRow, generateNumbers, generatePossibleEntries, isDisabled, isReversed, isWhiteOnlyChoice} from './Quinx'

describe('Quinxx', () => {
    describe('disables values that are not permitted', () => {
        it('contains a higher value', () => {
            expect(isDisabled([5], 2, false)).toEqual(true);
            expect(isDisabled([5], 6, false)).toEqual(false);
        });
        it('assumes the list is sorted', () => {
            expect(isDisabled([5, 2], 3, false)).toEqual(false);
            expect(isDisabled([2, 5], 3, false)).toEqual(true);
        });
        it('contains a lower number and is reversed (and expects number to be sorted)', () => {
            expect(isDisabled([10, 12], 11, true)).toEqual(true);
            expect(isDisabled([10, 12], 9, true)).toEqual(false);
        });
        it('is a locked row', () => {
            expect(isDisabled([10, 12], 11, true, true)).toEqual(true);
            expect(isDisabled([10, 12], 9, true, true)).toEqual(true);
        })
    });
    it('generates a list of numbers from 2 to 12', () => {
        expect(generateNumbers(false)).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
    });
    it('generates a list of numbers from 12 to 2', () => {
        expect(generateNumbers(true)).toEqual([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2])
    });

    it('identifies who is reversed', () => {
        expect(isReversed('RED')).toEqual(false);
        expect(isReversed('YELLOW')).toEqual(false);
        expect(isReversed('GREEN')).toEqual(true);
        expect(isReversed('BLUE')).toEqual(true);
    });

    it('calculates the score correctly', () => {
        expect(calculateScore(0)).toEqual(0);
        expect(calculateScore(1)).toEqual(1);
        expect(calculateScore(2)).toEqual(3);
        expect(calculateScore(3)).toEqual(6);
        expect(calculateScore(4)).toEqual(10);
        expect(calculateScore(5)).toEqual(15);
        expect(calculateScore(6)).toEqual(21);
        expect(calculateScore(7)).toEqual(28);
        expect(calculateScore(8)).toEqual(36);
        expect(calculateScore(9)).toEqual(45);
        expect(calculateScore(10)).toEqual(55);
        expect(calculateScore(11)).toEqual(66);
        expect(calculateScore(12)).toEqual(78);
    });

    it('disables the lock button until the last entry is put in', () => {
        expect(canLockRow({RED: [2, 3, 4, 5]}, 'RED', [])).toEqual(false);
        expect(canLockRow({RED: [2, 3, 4, 5, 6]}, 'RED', [])).toEqual(false);
        expect(canLockRow({RED: [2, 3, 4, 5, 6, 12]}, 'RED', [])).toEqual(true);
        expect(canLockRow({BLUE: [3, 4, 5, 6]}, 'BLUE', [])).toEqual(false);
        expect(canLockRow({BLUE: [3, 4, 5, 6, 7]}, 'BLUE', [])).toEqual(false);
        expect(canLockRow({BLUE: [2, 3, 4, 5, 6, 7]}, 'BLUE', [])).toEqual(true);
        expect(canLockRow({BLUE: [2, 3, 4, 5, 6, 7]}, 'BLUE', ['BLUE'])).toEqual(false);
    });

    describe('generates a list of available numbers to enter from a dice throw', () => {
        it('checks if white dice can be entered', () => {
            let diceRolls = {
                WHITE1: 2,
                WHITE2: 2,
                RED: 2,
                YELLOW: 2,
                GREEN: 2,
                BLUE: 2,
            };
            let gamecard = {
                RED: [],
                BLUE: [],
                YELLOW: [],
                GREEN: [],
                lockedRows: []
            };
            let possibleEntries = {
                RED: [4],
                YELLOW: [4],
                GREEN: [4],
                BLUE: [4],
            };
            expect(generatePossibleEntries(diceRolls, gamecard)).toEqual(possibleEntries);
            gamecard.RED.push(4);
            possibleEntries.RED = [];
            expect(generatePossibleEntries(diceRolls, gamecard)).toEqual(possibleEntries);
            gamecard.YELLOW.push(5);
            possibleEntries.YELLOW = [];
            expect(generatePossibleEntries(diceRolls, gamecard)).toEqual(possibleEntries);
            gamecard.GREEN.push(5);
            expect(generatePossibleEntries(diceRolls, gamecard)).toEqual(possibleEntries);
            gamecard.BLUE.push('locked');
            possibleEntries.BLUE = [];
            expect(generatePossibleEntries(diceRolls, gamecard)).toEqual(possibleEntries);
        });
        it('checks if colored dice can be entered', () => {
            let diceRolls = {
                WHITE1: 2,
                WHITE2: 3,
                RED: 3,
                YELLOW: 4,
                GREEN: 5,
                BLUE: 6,
            };
            let gamecard = {
                RED: [],
                BLUE: [],
                YELLOW: [],
                GREEN: [],
                lockedRows: []
            };
            let possibleEntries = {
                RED: [5, 6],
                YELLOW: [5, 6, 7],
                GREEN: [5, 7, 8],
                BLUE: [5, 8, 9],
            };
            expect(generatePossibleEntries(diceRolls, gamecard)).toEqual(possibleEntries);
        });

        it('should not contain white only entries if white was already entered', () => {
            let diceRolls = {
                WHITE1: 2,
                WHITE2: 3,
                RED: 3,
                YELLOW: 4,
                GREEN: 5,
                BLUE: 6,
            };
            let gamecard = {
                RED: [],
                BLUE: [],
                YELLOW: [],
                GREEN: [],
                lockedRows: []
            };
            let possibleEntries = {
                RED: [5, 6],
                YELLOW: [6, 7],
                GREEN: [7, 8],
                BLUE: [8, 9],
            };
            expect(generatePossibleEntries(diceRolls, gamecard, true)).toEqual(possibleEntries);
        });

        it('should contain white only entries if not active player', () => {
            let diceRolls = {
                WHITE1: 2,
                WHITE2: 3,
                RED: 3,
                YELLOW: 4,
                GREEN: 5,
                BLUE: 6,
            };
            let gamecard = {
                RED: [],
                BLUE: [],
                YELLOW: [],
                GREEN: [],
                lockedRows: []
            };
            let possibleEntries = {
                RED: [5],
                YELLOW: [5],
                GREEN: [5],
                BLUE: [5],
            };
            expect(generatePossibleEntries(diceRolls, gamecard, false, true)).toEqual(possibleEntries);
        });

        it('should detect wether the chosen entry was a white one', () => {
            let diceRolls = {
                WHITE1: 2,
                WHITE2: 3,
            };
            expect(isWhiteOnlyChoice(diceRolls, 5)).toEqual(true);
            expect(isWhiteOnlyChoice(diceRolls, 6)).toEqual(false);
        });
    });
});
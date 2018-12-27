import {calculateScore, canLockRow, generateNumbers, isDisabled, isReversed} from './Quinx'

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
        expect(canLockRow({RED: [2, 3, 4, 5], lockedRows: []}, 'RED')).toEqual(false);
        expect(canLockRow({RED: [2, 3, 4, 5, 6], lockedRows: []}, 'RED')).toEqual(false);
        expect(canLockRow({RED: [2, 3, 4, 5, 6, 12], lockedRows: []}, 'RED')).toEqual(true);
        expect(canLockRow({BLUE: [3, 4, 5, 6], lockedRows: []}, 'BLUE')).toEqual(false);
        expect(canLockRow({BLUE: [3, 4, 5, 6, 7], lockedRows: []}, 'BLUE')).toEqual(false);
        expect(canLockRow({BLUE: [2, 3, 4, 5, 6, 7], lockedRows: []}, 'BLUE')).toEqual(true);
        expect(canLockRow({BLUE: [2, 3, 4, 5, 6, 7], lockedRows: ['BLUE']}, 'BLUE')).toEqual(false);
    });
});
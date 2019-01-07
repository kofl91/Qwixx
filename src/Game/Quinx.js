export function isDisabled(punchedInDigits, askedDigit, reversed, locked) {
    if (reversed) {
        return (punchedInDigits[0] <= askedDigit) || locked === true;
    }
    return (punchedInDigits[punchedInDigits.length - 1] >= askedDigit) || locked === true;
}

export function generateNumbers(reverse) {
    let numbers = [...Array(11).keys()].map((digit) => digit + 2);
    if (reverse) {
        return numbers.reverse();
    }
    return numbers;
}

export function isReversed(color) {
    return color === 'GREEN' || color === 'BLUE';
}

export function calculateScore(numberOfCrosses) {
    let score = 0;
    for (let i = 0; i <= numberOfCrosses; i++) {
        score = score + i;
    }
    return score;
}

export function canLockRow(gamecard, color, lockedRows) {
    const row = gamecard[color];
    const length = row.length;
    return length >= 5 &&
        !lockedRows.includes(color) &&
        (row.includes(12) && (color === 'RED' || color === 'YELLOW') ||
            row.includes(2) && (color === 'BLUE' || color === 'GREEN'));
}

export function calculateTotalScore(gamecard, failthrows) {
    return calculateScore(gamecard['RED'].length) +
        calculateScore(gamecard['YELLOW'].length) +
        calculateScore(gamecard['BLUE'].length) +
        calculateScore(gamecard['GREEN'].length) -
        failthrows * 5;
}

let notYetIncluded = function (possibleResult, color, possibleWhite) {
    return !possibleResult[color].includes(possibleWhite);
};

function isLocked(punchedInDigits) {
    return punchedInDigits.includes('locked');
}

export function generatePossibleEntries(diceRolls, gamecard, whiteOnlyEntered, notActivePlayer) {
    let possibleResult = {
        RED: [],
        YELLOW: [],
        GREEN: [],
        BLUE: [],
    };

    let allPossibleColor = {};
    if (whiteOnlyEntered) {
        if (!notActivePlayer){
            allPossibleColor = {
                RED: [diceRolls.WHITE1 + diceRolls.RED, diceRolls.WHITE2 + diceRolls.RED],
                YELLOW: [diceRolls.WHITE1 + diceRolls.YELLOW, diceRolls.WHITE2 + diceRolls.YELLOW],
                BLUE: [diceRolls.WHITE1 + diceRolls.BLUE, diceRolls.WHITE2 + diceRolls.BLUE],
                GREEN: [diceRolls.WHITE1 + diceRolls.GREEN, diceRolls.WHITE2 + diceRolls.GREEN],
            };
        }
    } else {
        if (notActivePlayer){
            allPossibleColor = {
                RED: [diceRolls.WHITE1 + diceRolls.WHITE2],
                YELLOW: [diceRolls.WHITE1 + diceRolls.WHITE2],
                BLUE: [diceRolls.WHITE1 + diceRolls.WHITE2],
                GREEN: [diceRolls.WHITE1 + diceRolls.WHITE2],
            };
        }else{
            allPossibleColor = {
                RED: [diceRolls.WHITE1 + diceRolls.WHITE2, diceRolls.WHITE1 + diceRolls.RED, diceRolls.WHITE2 + diceRolls.RED],
                YELLOW: [diceRolls.WHITE1 + diceRolls.WHITE2, diceRolls.WHITE1 + diceRolls.YELLOW, diceRolls.WHITE2 + diceRolls.YELLOW],
                BLUE: [diceRolls.WHITE1 + diceRolls.WHITE2, diceRolls.WHITE1 + diceRolls.BLUE, diceRolls.WHITE2 + diceRolls.BLUE],
                GREEN: [diceRolls.WHITE1 + diceRolls.WHITE2, diceRolls.WHITE1 + diceRolls.GREEN, diceRolls.WHITE2 + diceRolls.GREEN],
            };
        }
    }


    const COLORS = ['RED', 'YELLOW', 'GREEN', 'BLUE'];
    COLORS.forEach((color) => {
        allPossibleColor[color].forEach(possibleDigit => {
            if (notYetIncluded(gamecard, color, possibleDigit) &&
                notYetIncluded(possibleResult, color, possibleDigit) &&
                !isDisabled(gamecard[color], possibleDigit, isReversed(color)) &&
                !isLocked(gamecard[color])
            ) {
                possibleResult[color].push(possibleDigit);
            }
        });
    });
    return possibleResult;
}

export function isWhiteOnlyChoice(diceRolls, choice) {
    return diceRolls.WHITE1 + diceRolls.WHITE2 === choice;
}
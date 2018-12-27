
export function isDisabled (punchedInDigits, askedDigit, reversed, locked) {
    if (reversed){
        return (punchedInDigits[0] <= askedDigit) || locked === true;
    }
    return (punchedInDigits[punchedInDigits.length-1] >= askedDigit) || locked === true;
}

export function generateNumbers (reverse) {
    let numbers = [...Array(11).keys()].map( (digit) => digit+2);
    if (reverse){
        return numbers.reverse();
    }
    return numbers;
}

export function isReversed (color) {
    return color === 'GREEN' || color === 'BLUE';
}

export function calculateScore (numberOfCrosses) {
    let score = 0;
    for (let i = 0; i <= numberOfCrosses; i++) {
        score = score + i;
    }
    return score;
}

export function canLockRow (gamecard,color) {
    const row = gamecard[color];
    const length = row.length;
    return length >= 5 &&
        !gamecard.lockedRows.includes(color) &&
        (row.includes(12) && (color ==='RED' || color === 'YELLOW') ||
        row.includes(2) && (color ==='BLUE' || color === 'GREEN'));
}
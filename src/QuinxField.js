import React from 'react';
import {Button} from 'react-bootstrap';
import {isDisabled,isReversed} from "./Quinx";

export const QuinxField = ({color, digit, gamecard, addToGamecard, lastField, possibleFromDiceThrow}) => {
    if (gamecard[color].includes(digit)) {
        return (
            <Button
                bsStyle="info"
                disabled={
                    isDisabled(
                        gamecard[color],
                        digit,
                        isReversed(color),
                        gamecard.lockedRows.includes(color)
                    )
                }
                onClick={() => {
                }}
            >
                X
            </Button>
        );
    } else if (isDisabled(gamecard[color], digit, isReversed(color), gamecard.lockedRows.includes(color))) {
        return (
            <Button
                disabled={true}
                onClick={() => {
                }}
            >
                -
            </Button>
        );
    }
    return (
        <Button
            onClick={addToGamecard}
            disabled={(lastField && gamecard[color].length < 5) || !possibleFromDiceThrow[color].includes(digit)}
        >
            {digit}
        </Button>
    );
};
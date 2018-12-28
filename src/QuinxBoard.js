import React from 'react';
import {
    calculateScore,
    calculateTotalScore,
    canLockRow,
    generateNumbers,
    generatePossibleEntries,
    isReversed
} from "./Quinx";
import {Button, Table} from 'react-bootstrap';
import {QuinxField} from "./QuinxField";

export const QuinxBoard = (props) => {
    const possibleEntries = generatePossibleEntries(props.diceRolls, props.gamecard);
    return (<Table striped bordered condensed hover>
        <thead>
            <tr>
                <th>Score</th>
            </tr>
        </thead>
        <tbody>
        {['RED', 'YELLOW', 'GREEN', 'BLUE'].map(color => (
            <tr key={color} style={{backgroundColor: color}}>
                <td>
                    <input value={calculateScore(props.gamecard[color].length)} size={3}
                           disabled={true}/>
                </td>
                {generateNumbers(isReversed(color)).map((digit, index) => {
                        return (
                            <td key={digit + color}>
                                <QuinxField
                                    color={color}
                                    digit={digit}
                                    gamecard={props.gamecard}
                                    possibleFromDiceThrow={possibleEntries}
                                    addToGamecard={props.addToGamecard(digit, color)}
                                    lastField={index === 10}
                                />
                            </td>);
                    }
                )}
                <td>
                    <Button
                        bsStyle="danger"
                        disabled={!canLockRow(props.gamecard, color)}
                        onClick={props.lockRow(color)}
                    >
                        LOCK
                    </Button>
                </td>
            </tr>
        ))}
        <tr>
            <td>
                {calculateTotalScore(props.gamecard)}
            </td>
        </tr>
        </tbody>
    </Table>);
};
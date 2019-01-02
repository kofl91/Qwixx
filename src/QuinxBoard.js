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
        <tbody>
        {['RED', 'YELLOW', 'GREEN', 'BLUE'].map(color => (
            <tr key={color} style={{backgroundColor: color}}>
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
            {['RED', 'YELLOW', 'GREEN', 'BLUE'].map(color => {
                return (<td key={color}>
                    <input value={calculateScore(props.gamecard[color].length)} size={3}
                           disabled={true}/>
                </td>);
            })}
            <td>
                {calculateTotalScore(props.gamecard)}
            </td>
            <td/>
            <td/>
            <td/>
            <td>
                <Button
                    onClick={props.acceptFailthrow}
                    disabled={props.failthrows > 0}>
                    {props.failthrows > 0 ? 'X' : 'O'}
                </Button>
            </td>
            <td>
                <Button
                    onClick={props.acceptFailthrow}
                    disabled={props.failthrows > 1}>
                    {props.failthrows > 1 ? 'X' : 'O'}
                </Button>
            </td>
            <td>
                <Button
                    onClick={props.acceptFailthrow}
                    disabled={props.failthrows > 2}>
                    {props.failthrows > 2 ? 'X' : 'O'}
                </Button>
            </td>
            <td>
                <Button
                    onClick={props.acceptFailthrow}
                    disabled={props.failthrows > 3}>
                    {props.failthrows > 3 ? 'X' : 'O'}
                </Button>
            </td>
        </tr>
        </tbody>
    </Table>);
};
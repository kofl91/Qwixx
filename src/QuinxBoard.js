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

const FailThrow = (props) => {
    return (<Button
        onClick={props.onClick}
        disabled={props.failthrows > props.index}>
        {props.failthrows > props.index ? 'X' : 'O'}
    </Button>);
};

const FailThrows = (props) => {
    return ([...Array(4).keys()].map((index) => (<td key={'failthrowno' + index}>
        <FailThrow
            onClick={props.acceptFailthrow}
            index={index}
            failthrows={props.failthrows}
        />
    </td>)));
};

const QuinxSheet = (props) => {
    return (['RED', 'YELLOW', 'GREEN', 'BLUE'].map(color => (
        <tr key={color} style={{backgroundColor: color}}>
            {generateNumbers(isReversed(color)).map((digit, index) => {
                    return (
                        <td key={digit + color}>
                            <QuinxField
                                color={color}
                                digit={digit}
                                gamecard={props.gamecard}
                                possibleFromDiceThrow={props.possibleEntries}
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
    )));
};

const ScoreCard = (props) => {
    let singleScores = ['RED', 'YELLOW', 'GREEN', 'BLUE'].map(color => {
        return (<td key={color}>
            <input value={calculateScore(props.gamecard[color].length)} size={3}
                   disabled={true}/>
        </td>);
    });
    singleScores.push(<td key={'totalscore'}>
        {calculateTotalScore(props.gamecard)}
    </td>);
    return (singleScores);
};

export const QuinxBoard = ({gamecard, failthrows, diceRolls, lockRow, addToGamecard, acceptFailthrow}) => {
    const possibleEntries = generatePossibleEntries(diceRolls, gamecard);
    return (
        <Table striped bordered condensed hover>
            <tbody>
            <QuinxSheet
                gamecard={gamecard}
                lockRow={lockRow}
                addToGamecard={addToGamecard}
                possibleEntries={possibleEntries}
            />
            <tr>
                <ScoreCard
                    gamecard={gamecard}
                />
                <td/>
                <td/>
                <td/>
                <FailThrows
                    acceptFailthrow={acceptFailthrow}
                    failthrows={failthrows}
                />
            </tr>
            </tbody>
        </Table>);
};
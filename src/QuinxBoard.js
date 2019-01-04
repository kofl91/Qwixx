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
                                lockedRows={props.lockedRows}
                            />
                        </td>);
                }
            )}
            <td>
                <Button
                    bsStyle="danger"
                    disabled={!canLockRow(props.gamecard, color, props.lockedRows)}
                    onClick={props.lockRow(color)}
                >
                    LOCK
                </Button>
            </td>
        </tr>
    )));
};

const ScoreCard = (props) => {
    let scoreCard = ['RED', 'YELLOW', 'GREEN', 'BLUE'].map(color => {
        return (<td key={color}>
            <input value={calculateScore(props.gamecard[color].length)} size={3}
                   disabled={true}/>
        </td>);
    });
    scoreCard.push(<td key={'negativeScore'}>
        <input value={5 * props.failthrows * -1} size={3}
               disabled={true}/>
    </td>);
    scoreCard.push(<td key={'totalscore'}>
        {calculateTotalScore(props.gamecard, props.failthrows)}
    </td>);
    scoreCard.push(<td key={'emptycoloum1'}/>);
    scoreCard.push(<td key={'emptycoloum2'}/>);
    scoreCard.push(<FailThrows key={'failthrows'}
                               acceptFailthrow={props.acceptFailthrow}
                               failthrows={props.failthrows}
    />);

    return (scoreCard);
};

export const QuinxBoard = ({gamecard, failthrows, diceRolls, lockRow, addToGamecard, acceptFailthrow, lockedRows, possibleEntries}) => {
    return (
        <Table striped bordered condensed hover>
            <tbody>
            <QuinxSheet
                gamecard={gamecard}
                lockedRows={lockedRows}
                lockRow={lockRow}
                addToGamecard={addToGamecard}
                possibleEntries={possibleEntries}
            />
            <tr>
                <ScoreCard
                    gamecard={gamecard}
                    failthrows={failthrows}
                    acceptFailthrow={acceptFailthrow}
                />
            </tr>
            </tbody>
        </Table>);
};
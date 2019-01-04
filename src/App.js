import React, {Component} from 'react';
import './App.css';
import {QuinxBoard} from './QuinxBoard';
import {DICE_COLORS, DiceBoard} from './DiceBoard';
import {Button, Table} from 'react-bootstrap';
import {BootstrapStyled} from "./BootstrapStyled";
import {calculateScore, generatePossibleEntries, isWhiteOnlyChoice} from "./Quinx";

const DICE_ROLL = 'Roll the dice';
const ENTER_WHITE = 'Make a cross. Use either both white dice or a white and a colored one. You can not enter a combination of only the white dices after using a colored one';
const ENTER_COLOR = 'Make a cross. You already put in a white one. Now put in the colored one. (optional)';
const WAIT_FOR_PLAYERS = 'We are waiting for other players to finish. Press next player when everyone set their marks or decided not to';
const PLAYER_WON = 'A player has won. Check the scoreboard for the highest score.';

const GAME_PHASES = [
    DICE_ROLL,
    ENTER_WHITE,
    ENTER_COLOR,
    WAIT_FOR_PLAYERS,
    PLAYER_WON,
];


const ScoreLegend = () => {
    return (
        <Table striped bordered condensed hover>
            <tbody>
            <tr>
                <td>Number of crosses:</td>
                {[...Array(12).keys()].map(digit => digit + 1).map((crosses) =>
                    <td>{crosses}</td>)}
            </tr>
            <tr>
                <td>Points for that row:</td>
                {[...Array(12).keys()].map(digit => digit + 1).map((crosses) =>
                    <td>{calculateScore(crosses)}</td>)}
            </tr>
            </tbody>
        </Table>);
};

class App extends Component {
    state = {
        allPlayer: ['IVET', 'KIM'],
        phase: DICE_ROLL,
        activePlayer: 'IVET',
        IVET: {
            enteredWhites: false,
            enteredAll: false,
            RED: [],
            BLUE: [],
            YELLOW: [],
            GREEN: [],
            failthrows: 0,
            lockedRowsCounter: 0,
        },
        KIM: {
            enteredWhites: false,
            enteredAll: false,
            RED: [],
            BLUE: [],
            YELLOW: [],
            GREEN: [],
            failthrows: 0,
            lockedRowsCounter: 0,
        },
        lockedRows: [],
        diceRolls: {
            WHITE1: 0,
            WHITE2: 0,
            RED: 0,
            YELLOW: 0,
            GREEN: 0,
            BLUE: 0,
        },
    };

    acceptFailthrow = (playerId) => (event) => {
        let playerGamecard = this.state[playerId];
        playerGamecard.failthrows = playerGamecard.failthrows + 1;
        this.setState({
            phase: WAIT_FOR_PLAYERS,
            [playerId]: playerGamecard
        });
        if (playerGamecard.failthrows === 4){
            this.setState({
                phase: PLAYER_WON,
            });
        }
    };

    addToGamecard = (playerId) => (digit, color) => (event) => {
        let gamecard = this.state[playerId];
        gamecard[color].push(parseInt(digit));
        gamecard[color] = gamecard[color].sort((a, b) => a - b);
        if (isWhiteOnlyChoice(this.state.diceRolls, digit)) {
            gamecard.enteredWhites = true;
            if (this.state.activePlayer !== playerId) {
                gamecard.enteredAll = true;
            }
        } else {
            gamecard.enteredAll = true;
        }
        this.setState({
            [playerId]: gamecard
        });
        if (playerId === this.state.activePlayer) {
            this.setState({
                phase: WAIT_FOR_PLAYERS,
            });
        }
    };

    nextPlayer = () => {
        this.state.allPlayer.map((player) => {
            let playerToSet = this.state[player];
            playerToSet.enteredWhites = false;
            playerToSet.enteredAll = false;
        });
        this.setState({
            phase: DICE_ROLL,
            activePlayer: this.state.allPlayer[((this.state.allPlayer.indexOf(this.state.activePlayer) + 1) % this.state.allPlayer.length)]
        });
        this.rollDice();
    };

    rollDice = () => {
        let diceRolls = {};
        DICE_COLORS.forEach(color => {
            diceRolls[color] = Math.floor(Math.random() * 6) + 1;
        });
        this.setState({
            phase: ENTER_WHITE,
            diceRolls: diceRolls,
        });
    };

    lockRow = (playerId) => (color) => () => {
        let lockedRows = this.state.lockedRows;
        lockedRows.push(color);
        let gamecard = this.state[playerId];
        gamecard[color].push('LOCKED');
        gamecard.lockedRowsCounter = gamecard.lockedRowsCounter + 1;
        this.setState({
            [playerId]: gamecard,
            lockedRows
        });
        if (gamecard.lockedRowsCounter){
            this.setState({
                phase: PLAYER_WON
            });
        }
    };

    render() {
        return (
            <div className="App">
                <BootstrapStyled/>
                <div>
                    <p>WELCOME TO QUINXX</p>
                    <p>It is <b>{this.state.activePlayer}</b>'s turn</p>
                    <p>Instructions: {this.state.phase}</p>
                    <Button
                        disabled={this.state.phase !== WAIT_FOR_PLAYERS}
                        onClick={this.nextPlayer}>
                        Next Player
                    </Button>
                    <Button
                        disabled={this.state.phase !== DICE_ROLL}
                        onClick={this.rollDice}>
                        Roll Dice
                    </Button>
                    <ScoreLegend/>
                    <DiceBoard
                        white1={this.state.diceRolls.WHITE1}
                        white2={this.state.diceRolls.WHITE2}
                        red={this.state.diceRolls.RED}
                        yellow={this.state.diceRolls.YELLOW}
                        green={this.state.diceRolls.GREEN}
                        blue={this.state.diceRolls.BLUE}
                    />
                    {this.state.allPlayer.map((playerId) => {
                            return (<QuinxBoard playerId={playerId}
                                                gamecard={this.state[playerId]}
                                                addToGamecard={this.addToGamecard(playerId)}
                                                lockRow={this.lockRow(playerId)}
                                                diceRolls={this.state.diceRolls}
                                                failthrows={this.state[playerId].failthrows}
                                                lockedRows={this.state.lockedRows}
                                                acceptFailthrow={this.acceptFailthrow(playerId)}
                                                possibleEntries={this.state[playerId].enteredAll ?
                                                    {
                                                        RED: [],
                                                        YELLOW: [],
                                                        BLUE: [],
                                                        GREEN: [],
                                                    } :
                                                    generatePossibleEntries(
                                                        this.state.diceRolls,
                                                        this.state[playerId],
                                                        this.state[playerId].enteredWhites,
                                                        this.state.activePlayer !== playerId
                                                    )
                                                }
                            />);
                        }
                    )}
                </div>
            </div>
        );
    }
}

export default App;

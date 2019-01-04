import React, {Component} from 'react';
import './App.css';
import {QuinxBoard} from './QuinxBoard';
import {DICE_COLORS, DiceBoard} from './DiceBoard';
import {Button} from 'react-bootstrap';
import {BootstrapStyled} from "./BootstrapStyled";
import {generatePossibleEntries, isWhiteOnlyChoice} from "./Quinx";

const DICE_ROLL = 'DICE_ROLL';
const ENTER_WHITE = 'ENTER_WHITE_OR_COLOR';
const ENTER_COLOR = 'ENTER_COLOR';
const WAIT_FOR_PLAYERS = 'WAIT_FOR_PLAYERS';
const PLAYER_WON = 'PLAYER_WON_OR_LOST';

const GAME_PHASES = [
    DICE_ROLL,
    ENTER_WHITE,
    ENTER_COLOR,
    WAIT_FOR_PLAYERS,
    PLAYER_WON,
];

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
            lockedRows: [],
        },
        KIM: {
            enteredWhites: false,
            enteredAll: false,
            RED: [],
            BLUE: [],
            YELLOW: [],
            GREEN: [],
            failthrows: 0,
            lockedRows: [],
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
            [playerId]: playerGamecard
        });
    };

    addToGamecard = (playerId) => (digit, color) => (event) => {
        let gamecard = this.state[playerId];
        gamecard[color].push(parseInt(digit));
        gamecard[color] = gamecard[color].sort((a, b) => a - b);
        if (isWhiteOnlyChoice(this.state.diceRolls, digit)) {
            gamecard.enteredWhites = true;
            if (this.state.activePlayer !== playerId){
                gamecard.enteredAll = true;
            }
        } else {
            gamecard.enteredAll = true;
        }
        this.setState({
            phase: WAIT_FOR_PLAYERS,
            [playerId]: gamecard
        });
    };

    nextPlayer = () => {
        this.state.allPlayer.map((player) => {
            let playerToSet = this.state[player];
            playerToSet.enteredWhites= false;
            playerToSet.enteredAll = false;
        });
        this.setState({
            phase: DICE_ROLL,
            activePlayer: this.state.allPlayer[((this.state.allPlayer.indexOf(this.state.activePlayer) + 1) % this.state.allPlayer.length)]
        });
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
        this.setState({
            [playerId]: gamecard,
            lockedRows
        });
    };

    render() {
        return (
            <div className="App">
                <BootstrapStyled/>
                <div>
                    <p>WELCOME TO QUINXX</p>
                    <p>It is {this.state.activePlayer}'s turn</p>
                    <p>The player is in phase {this.state.phase}</p>
                    <Button
                        disabled={this.state.phase !== WAIT_FOR_PLAYERS}
                        onClick={this.nextPlayer}>
                        Next Player
                    </Button>
                    <DiceBoard
                        white1={this.state.diceRolls.WHITE1}
                        white2={this.state.diceRolls.WHITE2}
                        red={this.state.diceRolls.RED}
                        yellow={this.state.diceRolls.YELLOW}
                        green={this.state.diceRolls.GREEN}
                        blue={this.state.diceRolls.BLUE}
                    />
                    <Button
                        disabled={this.state.phase !== DICE_ROLL}
                        onClick={this.rollDice}>
                        Roll Dice
                    </Button>
                    {this.state.allPlayer.map((playerId) => {
                            return (<QuinxBoard gamecard={this.state[playerId]}
                                                addToGamecard={this.addToGamecard(playerId)}
                                                lockRow={this.lockRow(playerId)}
                                                diceRolls={this.state.diceRolls}
                                                failthrows={this.state[playerId].failthrows}
                                                lockedRows={this.state.lockedRows}
                                                acceptFailthrow={this.acceptFailthrow(playerId)}
                                                possibleEntries={ this.state[playerId].enteredAll ?
                                                    {
                                                        RED:[],
                                                        YELLOW:[],
                                                        BLUE:[],
                                                        GREEN:[],
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

import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { QuinxBoard } from './Game/QuinxBoard';
import DiceBoard from './Game/DiceBoard';
import { Button } from 'react-bootstrap';
import { BootstrapStyled } from "./BootstrapStyled";
import * as QwixxGame from "./Game/Quinx";
import { ScoreLegend } from "./Game/ScoreLegend";
import { rollDiceAction, addToGamecardAction } from "./reduxStuff";

export class App extends Component {
    state = {
        allPlayer: ['IVET', 'KIM'],
        phase: QwixxGame.DICE_ROLL,
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
    };

    acceptFailthrow = (playerId) => (event) => {
        let playerGamecard = this.state[playerId];
        playerGamecard.failthrows = playerGamecard.failthrows + 1;
        this.setState({
            phase: QwixxGame.WAIT_FOR_PLAYERS,
            [playerId]: playerGamecard
        });
        if (playerGamecard.failthrows === 4) {
            this.setState({
                phase: QwixxGame.PLAYER_WON,
            });
        }
    };

    addToGamecard = (playerId) => (digit, color) => (event) => {
        this.props.dispatch(addToGamecardAction(playerId, digit, color));
        let gamecard = this.state[playerId];
        gamecard[color].push(parseInt(digit));
        gamecard[color] = gamecard[color].sort((a, b) => a - b);
        if (QwixxGame.isWhiteOnlyChoice(this.props.diceRolls, digit)) {
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
                phase: QwixxGame.WAIT_FOR_PLAYERS,
            });
        }
    };

    nextPlayer = () => {
        this.state.allPlayer.map((player) => {
            let playerToSet = this.state[player];
            playerToSet.enteredWhites = false;
            playerToSet.enteredAll = false;
            return playerToSet
        });
        this.setState({
            phase: QwixxGame.DICE_ROLL,
            activePlayer: this.state.allPlayer[((this.state.allPlayer.indexOf(this.state.activePlayer) + 1) % this.state.allPlayer.length)]
        });
        this.rollDice();
    };

    rollDice = () => {
        this.props.dispatch(rollDiceAction());
        this.setState({
            phase: QwixxGame.ENTER_WHITE,
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
        if (gamecard.lockedRowsCounter === 2) {
            this.setState({
                phase: QwixxGame.PLAYER_WON
            });
        }
    };
    getPossibleEntries(playerId) {
        return this.state[playerId].enteredAll ?
            {
                RED: [],
                YELLOW: [],
                BLUE: [],
                GREEN: [],
            } :
            QwixxGame.generatePossibleEntries(
                this.props.diceRolls,
                this.state[playerId],
                this.state[playerId].enteredWhites,
                this.state.activePlayer !== playerId
            );
    }

    render() {
        return (
            <div className="App">
                <BootstrapStyled />
                <div>
                    <p>WELCOME TO QUINXX</p>
                    <p>It is <b>{this.state.activePlayer}</b>'s turn</p>
                    <p>Instructions: {this.state.phase}</p>
                    <Button
                        disabled={this.state.phase !== QwixxGame.WAIT_FOR_PLAYERS}
                        onClick={this.nextPlayer}>
                        Next Player
                    </Button>
                    <Button
                        disabled={this.state.phase !== QwixxGame.DICE_ROLL}
                        onClick={this.rollDice}>
                        Roll Dice
                    </Button>
                    <ScoreLegend />
                    <DiceBoard />
                    {this.state.allPlayer.map((playerId) => {
                        return (<QuinxBoard key={playerId}
                            playerId={playerId}
                            gamecard={this.state[playerId]}
                            addToGamecard={this.addToGamecard(playerId)}
                            lockRow={this.lockRow(playerId)}
                            failthrows={this.state[playerId].failthrows}
                            lockedRows={this.state.lockedRows}
                            acceptFailthrow={this.acceptFailthrow(playerId)}
                            possibleEntries={this.getPossibleEntries(playerId)}
                        />);
                    }
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state = {}) => {
    return state;
};

export default connect(mapStateToProps)(App);

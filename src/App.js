import React, {Component} from 'react';
import './App.css';
import {QuinxBoard} from './QuinxBoard';
import {DICE_COLORS, DiceBoard} from './DiceBoard';
import {Button} from 'react-bootstrap';
import {BootstrapStyled} from "./BootstrapStyled";

// const DICE_ROLL = 'DICE_ROLL';
// const ENTER_WHITE = 'ENTER_WHITE_OR_COLOR';
// const ENTER_COLOR = 'ENTER_COLOR';
// const WAIT_FOR_PLAYERS = 'WAIT_FOR_PLAYERS';
// const PLAYER_WON = 'PLAYER_WON_OR_LOST';
//
// const GAME_PHASES = [
//     DICE_ROLL,
//     ENTER_WHITE,
//     ENTER_COLOR,
//     WAIT_FOR_PLAYERS,
//     PLAYER_WON,
// ];

class App extends Component {
    state = {
        PLAYER1: {
            RED: [],
            BLUE: [],
            YELLOW: [],
            GREEN: [],
            failthrows: 0,
            lockedRows: [],
        },
        PLAYER2: {
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
        console.log(playerId);
        console.log(event);
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
        this.setState({
            [playerId]: gamecard
        });
    };

    rollDice = () => {
        let diceRolls = {};
        DICE_COLORS.forEach(color => {
            diceRolls[color] = Math.floor(Math.random() * 6) + 1;
        });
        this.setState({
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
                    <QuinxBoard gamecard={this.state['PLAYER1']}
                                addToGamecard={this.addToGamecard('PLAYER1')}
                                lockRow={this.lockRow('PLAYER1')}
                                diceRolls={this.state.diceRolls}
                                failthrows={this.state['PLAYER1'].failthrows}
                                lockedRows={this.state.lockedRows}
                                acceptFailthrow={this.acceptFailthrow('PLAYER1')}
                    />
                    <DiceBoard
                        white1={this.state.diceRolls.WHITE1}
                        white2={this.state.diceRolls.WHITE2}
                        red={this.state.diceRolls.RED}
                        yellow={this.state.diceRolls.YELLOW}
                        green={this.state.diceRolls.GREEN}
                        blue={this.state.diceRolls.BLUE}
                    />
                    <Button onClick={this.rollDice}>
                        Roll Dice
                    </Button>

                    <QuinxBoard gamecard={this.state['PLAYER2']}
                                addToGamecard={this.addToGamecard('PLAYER2')}
                                lockRow={this.lockRow('PLAYER2')}
                                diceRolls={this.state.diceRolls}
                                failthrows={this.state['PLAYER2'].failthrows}
                                lockedRows={this.state.lockedRows}
                                acceptFailthrow={this.acceptFailthrow('PLAYER2')}
                    />
                </div>
            </div>
        );
    }
}

export default App;

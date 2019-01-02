import React, {Component} from 'react';
import './App.css';
import {QuinxBoard} from './QuinxBoard';
import {DiceBoard, DICE_COLORS} from './DiceBoard';
import {Button} from 'react-bootstrap';
import {BootstrapStyled} from "./BootstrapStyled";

class App extends Component {
    state = {
        GAMECARD: {
            RED: [],
            BLUE: [],
            YELLOW: [],
            GREEN: [],
            lockedRows: []
        },
        diceRolls:{
            WHITE1:0,
            WHITE2:0,
            RED:0,
            YELLOW:0,
            GREEN:0,
            BLUE:0,
        },
        failthrows: 0,
    };

    acceptFailthrow = (event) => {
        let failthrows = this.state.failthrows;
        failthrows = failthrows + 1;
        this.setState({
            failthrows
        });
    };

    addToGamecard = (digit, color) => (event) => {
        let gamecard = this.state.GAMECARD;
        gamecard[color].push(parseInt(digit));
        gamecard[color] = gamecard[color].sort((a, b) => a - b);
        this.setState({
            GAMECARD: gamecard
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

    lockRow = (color) => () => {
        let gamecard = this.state.GAMECARD;
        gamecard.lockedRows.push(color);
        gamecard[color].push('LOCKED');
        this.setState({
            GAMECARD: gamecard
        });
    };

    render() {
        return (
            <div className="App">
                <BootstrapStyled/>
                <div>
                    <p>WELCOME TO QUINXX</p>
                    <QuinxBoard gamecard={this.state.GAMECARD}
                                addToGamecard={this.addToGamecard}
                                lockRow={this.lockRow}
                                diceRolls={this.state.diceRolls}
                                failthrows={this.state.failthrows}
                                acceptFailthrow={this.acceptFailthrow}
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
                </div>
            </div>
        );
    }
}

export default App;

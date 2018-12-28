import React, {Component} from 'react';
import './App.css';
import {QuinxBoard} from './QuinxBoard';
import {Button} from 'react-bootstrap';
import {BootstrapStyled} from "./BootstrapStyled";

const DiceBoard = (props) => {
    return (<div>
        <button disabled style={{backgroundColor:'WHITE'}}>{props.white1}</button>
        <button disabled style={{backgroundColor:'WHITE'}}>{props.white2}</button>
        <button disabled style={{backgroundColor:'RED'}}>{props.red}</button>
        <button disabled style={{backgroundColor:'YELLOW'}}>{props.yellow}</button>
        <button disabled style={{backgroundColor:'GREEN', color:'WHITE'}}>{props.green}</button>
        <button disabled style={{backgroundColor:'BLUE', color:'WHITE'}}>{props.blue}</button>
    </div>)
};

const DICE_COLORS = ['WHITE1', 'WHITE2', 'RED', 'YELLOW', 'GREEN', 'BLUE'];

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
            WHITE1:1,
            WHITE2:2,
            RED:2,
            YELLOW:2,
            GREEN:2,
            BLUE:2,
        },
    };

    addToGamecard = (digit, color) => (event) => {
        let gamecard = this.state.GAMECARD;
        gamecard[color].push(parseInt(digit));
        gamecard[color] = gamecard[color].sort((a, b) => a - b);
        this.setState({
            GAMECARD: gamecard
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
                    />
                    <DiceBoard
                        white1={this.state.diceRolls.WHITE1}
                        white2={this.state.diceRolls.WHITE2}
                        red={this.state.diceRolls.RED}
                        yellow={this.state.diceRolls.YELLOW}
                        green={this.state.diceRolls.GREEN}
                        blue={this.state.diceRolls.BLUE}
                    />
                    <Button onClick={()=>{
                        let diceRolls = {};
                        DICE_COLORS.forEach(color => {
                            diceRolls[color] = Math.floor(Math.random() * 6) + 1;
                        });
                        this.setState({
                            diceRolls: diceRolls,
                        });
                    }}>Roll Dice</Button>
                </div>
            </div>
        );
    }
}

export default App;

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

class App extends Component {
    state = {
        GAMECARD: {
            RED: [],
            BLUE: [],
            YELLOW: [],
            GREEN: [],
            lockedRows: []
        },
        white1:1,
        white2:2,
        red:2,
        yellow:2,
        green:2,
        blue:2,
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
                    />
                    <DiceBoard
                        white1={this.state.white1}
                        white2={this.state.white2}
                        red={this.state.red}
                        yellow={this.state.yellow}
                        green={this.state.green}
                        blue={this.state.blue}
                    />
                    <Button onClick={()=>{
                        let diceRolls = {};
                        diceRolls['white1'] = Math.floor(Math.random() * 6) + 1;
                        diceRolls['white2'] = Math.floor(Math.random() * 6) + 1;
                        diceRolls['red'] = Math.floor(Math.random() * 6) + 1;
                        diceRolls['yellow'] = Math.floor(Math.random() * 6) + 1;
                        diceRolls['green'] = Math.floor(Math.random() * 6) + 1;
                        diceRolls['blue'] = Math.floor(Math.random() * 6) + 1;
                        this.setState(diceRolls);
                    }}>Roll Dice</Button>
                </div>
            </div>
        );
    }
}

export default App;

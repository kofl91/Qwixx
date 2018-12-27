import React, {Component} from 'react';
import './App.css';
import {QuinxBoard} from './QuinxBoard';
import {BootstrapStyled} from "./BootstrapStyled";

class App extends Component {
    state = {
        GAMECARD: {
            RED: [],
            BLUE: [],
            YELLOW: [],
            GREEN: [],
            lockedRows: []
        }
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
                </div>
            </div>
        );
    }
}

export default App;

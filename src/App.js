import React, {Component} from 'react';
import './App.css';
import {Button, Table} from 'react-bootstrap';
import {calculateScore, canLockRow, generateNumbers, isDisabled, isReversed} from "./Quinx";


const QuinxField = ({color, digit, gamecard, addToGamecard, lastField}) => {
    if (gamecard[color].includes(digit)) {
        return (
            <Button
                bsStyle="info"
                disabled={
                    isDisabled(
                        gamecard[color],
                        digit,
                        isReversed(color),
                        gamecard.lockedRows.includes(color)
                    )
                }
                onClick={() => {
                }}
            >
                X
            </Button>
        );
    } else if (isDisabled(gamecard[color], digit, isReversed(color), gamecard.lockedRows.includes(color))) {
        return (
            <Button
                disabled={true}
                onClick={() => {
                }}
            >
                -
            </Button>
        );
    }
    return (
        <Button
            onClick={addToGamecard}
            disabled={lastField && gamecard[color].length < 5}
        >
            {digit}
        </Button>
    );
};

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
        let GAMECARD = this.state.GAMECARD;
        GAMECARD[color].push(parseInt(digit));
        GAMECARD[color] = GAMECARD[color].sort((a, b) => a - b);
        this.setState(GAMECARD);
        // new Notification(`Punched in: ${color} ${digit}`);
    };

    lockRow = (color) => () => {
        let gamecard = this.state.GAMECARD;
        gamecard.lockedRows.push(color);
        gamecard[color].push(color);
        this.setState({
            GAMECARD: gamecard
        });
    };

    componentDidMount() {
        const w = window,
            d = document,
            documentElement = d.documentElement,
            body = d.getElementsByTagName('body')[0],
            width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
            height = w.innerHeight || documentElement.clientHeight || body.clientHeight;
        // if (typeof Notification !== 'undefined') {
        //     Notification.requestPermission();
        // }
    }

    render() {
        return (
            <div className="App">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
                      integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
                      crossOrigin="anonymous"/>
                <link rel="stylesheet"
                      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
                      integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
                      crossOrigin="anonymous"/>
                <div>
                    <p>WELCOME TO QUINXX</p>
                    <Table striped bordered condensed hover>
                        <thead>
                        <tr>
                            <th>Score</th>
                        </tr>
                        </thead>
                        <tbody>
                        {['RED', 'YELLOW', 'GREEN', 'BLUE'].map(color => (
                            <tr key={color} style={{backgroundColor: color}}>
                                <td>
                                    <input value={calculateScore(this.state.GAMECARD[color].length)} size={3}
                                           disabled={true}/>
                                </td>
                                {generateNumbers(isReversed(color)).map((digit, index) => {
                                        return (
                                            <td key={digit + color}>
                                                <QuinxField
                                                    color={color}
                                                    digit={digit}
                                                    gamecard={this.state.GAMECARD}
                                                    addToGamecard={this.addToGamecard(digit, color)}
                                                    lastField={index === 10 ? true : false}
                                                />
                                            </td>);
                                    }
                                )}
                                <td>
                                    <Button
                                        bsStyle="danger"
                                        disabled={!canLockRow(this.state.GAMECARD, color)}
                                        onClick={this.lockRow(color)}
                                    >
                                        LOCK
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                {calculateScore(this.state.GAMECARD['RED'].length) +
                                calculateScore(this.state.GAMECARD['YELLOW'].length) +
                                calculateScore(this.state.GAMECARD['BLUE'].length) +
                                calculateScore(this.state.GAMECARD['GREEN'].length)}
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default App;

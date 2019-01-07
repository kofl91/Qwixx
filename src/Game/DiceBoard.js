import React from 'react';
import {connect} from 'react-redux'
import {diceDefault} from "../reduxStuff";

export const DICE_COLORS = ['WHITE1', 'WHITE2', 'RED', 'YELLOW', 'GREEN', 'BLUE'];

export const DiceBoard = (props) => {
    console.log(props);
    return (<div>
        <button disabled style={{backgroundColor: 'WHITE'}}>{props.WHITE1}</button>
        <button disabled style={{backgroundColor: 'WHITE'}}>{props.WHITE2}</button>
        <button disabled style={{backgroundColor: 'RED'}}>{props.RED}</button>
        <button disabled style={{backgroundColor: 'YELLOW'}}>{props.YELLOW}</button>
        <button disabled style={{backgroundColor: 'GREEN', color: 'WHITE'}}>{props.GREEN}</button>
        <button disabled style={{backgroundColor: 'BLUE', color: 'WHITE'}}>{props.BLUE}</button>
    </div>);
};

const mapStateToProps = (state = {diceRolls: diceDefault}) => {
    return state.diceRolls;
};
export default connect(mapStateToProps)(DiceBoard)
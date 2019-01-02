import React from 'react';

export const DICE_COLORS = ['WHITE1', 'WHITE2', 'RED', 'YELLOW', 'GREEN', 'BLUE'];

export const DiceBoard = (props) => {
    return (<div>
        <button disabled style={{backgroundColor:'WHITE'}}>{props.white1}</button>
        <button disabled style={{backgroundColor:'WHITE'}}>{props.white2}</button>
        <button disabled style={{backgroundColor:'RED'}}>{props.red}</button>
        <button disabled style={{backgroundColor:'YELLOW'}}>{props.yellow}</button>
        <button disabled style={{backgroundColor:'GREEN', color:'WHITE'}}>{props.green}</button>
        <button disabled style={{backgroundColor:'BLUE', color:'WHITE'}}>{props.blue}</button>
    </div>)
};
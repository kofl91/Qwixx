import React, {Component} from 'react';
import * as QwixxGame from "./Quinx";
import {Table} from 'react-bootstrap';

export const ScoreLegend = () => {
    return (
        <Table striped bordered condensed hover>
            <tbody>
            <tr>
                <td>Number of crosses:</td>
                {[...Array(12).keys()].map(digit => digit + 1).map((crosses) =>
                    <td key={crosses}>{crosses}</td>)}
            </tr>
            <tr>
                <td>Points for that row:</td>
                {[...Array(12).keys()].map(digit => digit + 1).map((crosses) =>
                    <td key={crosses + 'score'}>{QwixxGame.calculateScore(crosses)}</td>)}
            </tr>
            </tbody>
        </Table>);
};
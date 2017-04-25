import React, { Component } from 'react';
import AvailabilityCell from './AvailabilityCell';

export default class AvailabilityRow extends Component {
    render() {
        let dayCells = this.props.bed.days.map(d => (
            <AvailabilityCell key={d.id} day={d} isAlternate={this.props.isAlternate} />
        ));
        let rowTitle = this.props.titleRow &&
            <td rowSpan={this.props.bed.beds}
                className={this.props.isAlternate && ' border stripe'} >
                {this.props.bed.room.name}
            </td>;
            
        return (
            <tr >
                {rowTitle}
                {dayCells}
            </tr>
        );
    }
}
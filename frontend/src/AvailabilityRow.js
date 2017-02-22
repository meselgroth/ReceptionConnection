import React, { Component } from 'react';
import AvailabilityCell from './AvailabilityCell';

export default class AvailabilityRow extends Component {
    render() {
        let dayCells = this.props.bed.days.map(d => (
            <AvailabilityCell key={d.id} day={d} alternate={this.props.alternate} />
        ));
        let rowTitle = this.props.titleRow && <td rowSpan={this.props.bed.beds} className={this.props.alternate && ' border stripe'} >{this.props.bed.room}</td>
        return (
            <tr >
                {rowTitle}
                {dayCells}
            </tr>
        );
    }
}
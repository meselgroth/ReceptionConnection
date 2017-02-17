import React, { Component } from 'react';
import AvailabilityCell from './AvailabilityCell';

export default class AvailabilityRow extends Component {
    render() {
        let dayCells = this.props.bed.days.map(d => (
            <AvailabilityCell key={d.id} day={d} />
        ));
        return (
            <tr>
                <td>{this.props.bed.room}</td>
                {dayCells}
            </tr>
        );
    }
}
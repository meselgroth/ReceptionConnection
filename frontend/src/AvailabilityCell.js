import React, { Component } from 'react';

export default class AvailabilityCell extends Component {
    getClass = () => {
        let classes = '';
        if (this.props.day.name) {
            classes = 'avail-booking';
        } else {
            classes = 'border';
        }
        classes += this.props.isAlternate && classes!=='avail-booking' ? ' stripe' :'';
        return classes;
    }
    render() {
        return (
            <td className={this.getClass()}>{this.props.day.name || '\u00a0'}</td>
        );
    }
}
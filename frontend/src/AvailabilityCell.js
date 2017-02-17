import React, { Component } from 'react';

export default class AvailabilityCell extends Component {
    getClass(){
        if(this.props.day.name){
            return 'avail-booking';
        }
    }
    render() {
        return (
            <td className={()=>this.getClass()}>{this.props.day.name}</td>
        );
    }
}
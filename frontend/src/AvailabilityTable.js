import React from 'react';
import './AvailabilityTable.css';
import AvailabilityRow from './AvailabilityRow';
import DateService from './services/DateService';
import { Table } from 'react-bootstrap';

export default function AvailabilityTable(props) {
    let room = '';
    let titleRow = false;
    let isAlternate = true;
    let availRows = props.beds.map((b) => {
        titleRow = b.room.id !== room.id;
        room = b.room;
        if (titleRow) { isAlternate = !isAlternate; }
        return <AvailabilityRow key={b.id} bed={b} titleRow={titleRow} isAlternate={isAlternate} />
    });

    let dayHeaders = props.days.map((d) => (
        <th key={d.getTime()}>{DateService.DayMonth(d)}</th>
    ));

    return (
        <Table condensed hover>
            <thead>
                <tr>
                    <th>Room</th>
                    {dayHeaders}
                </tr>
            </thead>
            <tbody>
                {availRows}
            </tbody>
            <OverBookings overbookingBeds={props.overbookingBeds} />
            <ErrorBookings errors={props.errors} />
        </Table>
    );
}

function OverBookings(props) {
    if (props.overbookingBeds.length===0) return null;

    let overBookingRows = props.overbookingBeds.map((b) => (
        <AvailabilityRow key={b.id} bed={b} />
    ));

    return (
        <tbody key='overbookings'>
            <tr>
                <th>OverBookings</th>
            </tr>
            {overBookingRows}
        </tbody>
    );
}

function ErrorBookings(props) {
    let errorBookings = [];

    for (let i = 0; i < props.errors.length; i++) {
        let e = props.errors;
        errorBookings.push(
            <tr key={i}><td colSpan={props.days.length + 1}>{e}</td></tr>
        );
    }
    return <tfoot>{errorBookings}</tfoot>;
}
import React, { Component } from 'react';
import './AvailabilityTable.css';
import AvailabilityRow from './AvailabilityRow';
import BedLayoutService from './services/BedLayoutService';
import DateService from './services/DateService';
import { Table } from 'react-bootstrap';

export default class AvailabilityTable extends Component {
    constructor({startDate, endDate, bookingService, roomRepo}) {
        super(arguments[0]);
        this.state = { beds: [], days: [], overbookingBeds: [] };
        this.bookingService = bookingService;
        this.roomRepo = roomRepo;

        this.startDate = startDate ? startDate : DateService.CurrentDate();
        this.endDate = endDate ? endDate : new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, this.startDate.getDate());
        this.bedLayoutService = new BedLayoutService(this.startDate, this.endDate);
    }
    componentDidMount() {
        this.roomBeds = this.roomRepo.GetRoomBeds();
        this.bookingService.GetBookings(this.startDate, this.endDate, this.makeLayout)
            .then(data => this.makeLayout(data));
    }
    makeLayout(bookings) {
        let days = this.bedLayoutService.Days;
        let beds = this.bedLayoutService.MakeLayout(bookings, this.roomBeds);
        let overbookingBeds = this.bedLayoutService.MakeOverbookingsLayout();
        this.setState({ beds, days, overbookingBeds });
    }
    render() {
        let room = '';
        let titleRow = false;
        let alternate = true;
        let availRows = this.state.beds.map((b) => {
            titleRow = b.room.id !== room.id;
            room = b.room;
            if (titleRow) { alternate = !alternate; }
            return <AvailabilityRow key={b.id} bed={b} titleRow={titleRow} alternate={alternate} />
        });
        let overBookingRows = this.state.overbookingBeds.map((b) => (
            <AvailabilityRow key={b.id} bed={b} />
        ));
        let overBookings = this.state.overbookingBeds.map((b) => (
            <tbody key='overbookings'>
                <tr>
                    <th>OverBookings</th>
                </tr>
                {overBookingRows}
            </tbody>
        ));
        let dayHeaders = this.state.days.map((d) => (
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
                {overBookings}
                <tfoot>
                    {this.bedLayoutService.errors}
                </tfoot>
            </Table>
        );
    }
}
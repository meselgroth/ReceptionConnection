import React, { Component } from 'react';
import './AvailabilityTable.css';
import AvailabilityRow from './AvailabilityRow';
import BedLayoutService from './services/BedLayoutService';

export default class AvailabilityTable extends Component {
    constructor({startDate, endDate, bookingService, roomRepo}) {
        super(arguments[0]);
        this.state = { beds: [{ id: 0, days: [] }], days: [], overbookingBeds: [] };
        this.bookingService = bookingService;
        this.roomRepo = roomRepo;

        let currentTime = new Date();
        this.startDate = startDate ? startDate : new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
        this.endDate = endDate ? endDate : new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, this.startDate.getDate());
        this.bedLayoutService = new BedLayoutService(this.startDate, this.endDate);
    }
    componentDidMount() {
        this.roomBeds = this.roomRepo.GetRoomBeds();
        this.bookingService.GetBookings(this.startDate, this.endDate)
            .then(data => this.makeLayout(data));
    }
    makeLayout(bookings) {
        let days = this.bedLayoutService.Days;
        let beds = this.bedLayoutService.MakeLayout(bookings, this.roomBeds);
        let overbookingBeds = this.bedLayoutService.MakeOverbookingsLayout();
        this.setState({ beds, days, overbookingBeds });
    }
    render() {
        let availRows = this.state.beds.map((b) => (
            <AvailabilityRow key={b.id} bed={b} />
        ));
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
            <th key={d.getTime()}>{d.toLocaleString(undefined, { month: 'short', day: 'numeric' })}</th>
        ));
        return (
            <div><h1>Availability</h1>
                <table>
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
                </table>
                <div>{this.bedLayoutService.errors}</div>
            </div>
        );
    }
}
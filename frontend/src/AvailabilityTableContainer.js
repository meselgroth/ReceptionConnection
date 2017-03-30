import React, { Component } from 'react';
import BedLayoutService from './services/BedLayoutService';
import DateService from './services/DateService';
import AvailabilityTable from './AvailabilityTable';

export default class AvailabilityTableContainer extends Component {
    constructor({ startDate, endDate, bookingService, roomRepo }) {
        super(arguments[0]);
        this.state = { beds: [], days: [], overbookingBeds: [], errors: '' };
        this.bookingService = bookingService;
        this.roomRepo = roomRepo;

        this.startDate = startDate ? startDate : DateService.CurrentDate();
        this.endDate = endDate ? endDate : new Date(this.startDate.getFullYear(), this.startDate.getMonth() + 1, this.startDate.getDate());
        this.bedLayoutService = new BedLayoutService(this.startDate, this.endDate);

        this.bookingService.SetObserver((bookings) => this.makeLayout(bookings));
    }
    componentDidMount() {
        this.roomBeds = this.roomRepo.GetRoomBeds();
        this.bookingService.GetBookings(this.startDate, this.endDate);
    }
    makeLayout(bookings) {
        let days = this.bedLayoutService.Days;
        let beds = this.bedLayoutService.MakeLayout(bookings, this.roomBeds);
        let overbookingBeds = this.bedLayoutService.MakeOverbookingsLayout();
        let errors = this.bedLayoutService.errors;
        this.setState({ beds, days, overbookingBeds, errors });
    }
    render() {
        return (
            <AvailabilityTable beds={this.state.beds}
                overbookingBeds={this.state.overbookingBeds}
                days={this.state.days}
                errors={this.state.errors} />
        );
    }
}
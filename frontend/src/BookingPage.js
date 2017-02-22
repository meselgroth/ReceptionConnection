import React, { Component } from 'react';
import { Link } from 'react-router';
import DateService from './services/DateService';

export default class BookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { checkin: DateService.CurrentDateInputFormat(), checkout: DateService.TomorrowInputFormat(), name: '', room: '', pax: 1 };
        this.routeService = props.route.routeService;
        this.bookingService = props.route.bookingService;
        this.rooms = props.route.roomRepo.GetRoomNames();
    }

    handleChange = (event) => {
        this.setState({[event.target.id] : event.target.value});
    }
    save = (e) => {
        e.preventDefault();
        this.bookingService.Save(this.state);
    }
    render() {
        let roomOptions = this.rooms.map(r => <option key={r} value={r}>{r}</option>);
        return (
            <div><h1>New Booking</h1>
                <p>Enter details</p>
                <form onSubmit={this.save}>
                    <div className='form-group row'>
                        <label htmlFor='checkin' className='col-sm-2'>Check in
                        </label>
                        <div className='col-sm-10'>
                            <input type="date" id='checkin' value={this.state.checkin} onChange={this.handleChange} className="form-control" required /></div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor='checkout' className='col-sm-2'>Check out
                        </label>
                        <div className='col-sm-10'>
                            <input type="date" id='checkout' value={this.state.checkout} onChange={this.handleChange} className="form-control" required /></div>
                    </div>

                    <div className='form-group row'>
                        <label htmlFor='name' className='col-sm-2'>Name
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id='name' value={this.state.name} onChange={this.handleChange} className="form-control" required />
                        </div>
                    </div>

                    <div className='form-group row'>
                        <label htmlFor='room' className='col-sm-2'>Room
                        </label>
                        <div className='col-sm-10'>
                            <select id="room" value={this.state.room} onChange={this.handleChange} className="form-control" required >
                                <option></option>
                                {roomOptions}
                            </select>
                        </div>
                    </div>

                    <div className='form-group row'>
                        <label htmlFor='pax' className='col-sm-2'>Pax
                        </label>
                        <div className='col-sm-10'>
                            <input type="number" id='pax' value={this.state.pax} onChange={this.handleChange} className="form-control" required />
                        </div>
                    </div>

                    <input type="submit" value='Save' className="btn btn-default pull-right" />
                    <Link to="/" className="btn btn-default pull-right">Home</Link>

                </form>
            </div>
        );
    }
}
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DateService from './services/DateService';

export default class BookingPage extends Component {
    constructor(props) {
        super(props);

        this.state = { checkin: DateService.CurrentDateInputFormat(), checkout: DateService.TomorrowInputFormat(), name: '', room: '', pax: 1 };
    }

    handleChange = (event) => {
        this.setState({ [event.target.id]: event.target.value });
    }
    onSave = (e) => {
        e.preventDefault();
        this.props.Save(this.state);
    }
    render() {
        let roomOptions = this.props.rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>);
        return (
            <div><h1>New</h1>
                <p>Enter details</p>
                <form onSubmit={this.onSave}>
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
                        <label htmlFor='roomId' className='col-sm-2'>Room
                        </label>
                        <div className='col-sm-10'>
                            <select id="roomId" value={this.state.roomId} onChange={this.handleChange} className="form-control" required >
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
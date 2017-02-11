import React, { Component } from 'react';

export default class BookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { checkin: '', checkout:'', name:'', room:'', pax:'' };
        this.routeService = props.route.routeService;
    }

    handleChange(event, propertyName) {
        var change = {};
        change[propertyName] = event.target.value;
        this.setState(change);
    }
    render() {
        return (
            <div><h1>New Booking</h1>
                <p>Enter details</p>
                <form onSubmit={(e) => this.save(e)}>
                    <div className='form-group row'>
                        <label htmlFor='checkin' className='col-sm-2'>Check in
                        </label>
                        <div className='col-sm-10'>
                            <input type="date" id='checkin' value={this.state.checkin} onChange={(e) => this.handleChange(e, 'jogDateTime')} className="form-control" /></div>
                    </div>
                    <div className='form-group row'>
                        <label htmlFor='checkout' className='col-sm-2'>Check out
                        </label>
                        <div className='col-sm-10'>
                            <input type="date" id='checkout' value={this.state.checkout} onChange={(e) => this.handleChange(e, 'jogDateTime')} className="form-control" /></div>
                    </div>

                    <div className='form-group row'>
                        <label htmlFor='nameInput' className='col-sm-2'>Name
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id='nameInput' value={this.state.name} onChange={(e) => this.handleChange(e, 'Name')} className="form-control" />
                        </div>
                    </div>

                    <div className='form-group row'>
                        <label htmlFor='room' className='col-sm-2'>Room
                        </label>
                        <div className='col-sm-10'>
                            <input type="text" id='room' value={this.state.room} onChange={(e) => this.handleChange(e, 'Name')} className="form-control" />
                        </div>
                    </div>

                    <div className='form-group row'>
                        <label htmlFor='pax' className='col-sm-2'>Pax
                        </label>
                        <div className='col-sm-10'>
                            <input type="number" id='pax' value={this.state.pax} onChange={(e) => this.handleChange(e, 'Pax')} className="form-control" />
                        </div>
                    </div>

                    <input type="submit" value='Save' className="btn btn-default pull-right" />
                </form>
            </div>
        );
    }
}
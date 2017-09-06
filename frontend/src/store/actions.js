import RoomRepo from '../services/RoomRepo';
import * as types from './actionTypes';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';

export default function initialLoad() {
    return function (dispatch, getState) {

        let bookingsPromise = fetch('/api/Bookings/InitialLoad', { headers: {} })
            .then(response => response.json())  // handle response errors like not logged in
            .then(json => dispatch(receiveBookings(json)));

        let roomTypesPromise;

        if (getState().roomTypes.length === 0) {
            roomTypesPromise = fetch('/api/RoomTypes', { headers: {} })
                .then(response => response.json())  // handle response errors like not logged in
                .then(json => dispatch(receiveRoomTypes(json)));
        }

        return Promise.all([bookingsPromise, roomTypesPromise]);
    };
}

export function receiveBookings(bookings) {
    return {
        type: types.RECEIVE_BOOKINGS, bookings
    };
}

export function addBooking(booking) {
    return function (dispatch, getState) {
        return fetch('/api/Bookings', { method: 'POST', body: JSON.stringify(booking), headers: { 'content-type': 'application/json' } })
            .then(response => response.json())  // handle response errors like not logged in
            .then(json => dispatch(bookingAdded(booking)));
    };
}

export function bookingAdded(booking) {
    return {
        type: types.ADD_BOOKING, booking
    };
}

function receiveRoomTypes(json) {
    return {
        type: types.RECEIVE_ROOMTYPES, roomTypes: json
    };
}


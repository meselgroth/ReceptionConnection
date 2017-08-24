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

        if (getState().roomTypes.length > 0) {
            roomTypesPromise = fetch('/api/Bookings/roomTypes', { headers: {} })
                .then(response => response.json())  // handle response errors like not logged in
                .then(json => dispatch(receiveRoomBeds(json)));
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
            .then(json => dispatch(bookingAdded(json)));
    };
}

export function bookingAdded(booking) {
    push('/');
    return {
        type: types.ADD_BOOKING, booking
    };
}

function receiveRooms(json) {
    return {
        type: types.RECEIVE_ROOMS, rooms: json
    };
}

function receiveRoomBeds(json) {
    return {
        type: types.RECEIVE_ROOMBEDS, roomBeds: json
    };
}


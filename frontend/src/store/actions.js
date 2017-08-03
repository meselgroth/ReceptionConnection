import RoomRepo from '../services/RoomRepo';
import * as types from './actionTypes';

export default function initialLoad() {
    return function (dispatch, getState) {
        dispatch(receiveRoomBeds(new RoomRepo().GetRoomBeds()));
        dispatch(receiveRooms(new RoomRepo().GetRooms()));

        if (getState().bookings.length > 0) {
            //data comes from database
            // call upload
            //return fetch('/api/Bookings/InitialLoad', { headers: {} });
        }
        else {
            return fetch('/api/Bookings/InitialLoad', { headers: {} })
                .then(response => response.json())  // handle response errors like not logged in
                .then(json => dispatch(receiveBookings(json)));
        }
    };
}

export function receiveBookings(bookings) {
    return {
        type: types.RECEIVE_BOOKINGS, bookings
    };
}

export function addBooking(booking){
    return function(dispatch, getState) {
        return fetch('/api/Bookings', { method: "POST", body: booking })
                .then(response => response.json())  // handle response errors like not logged in
                .then(json => dispatch(bookingAdded(json)));
    };
}

export function bookingAdded(booking){
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


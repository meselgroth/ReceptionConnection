import RoomRepo from '../services/RoomRepo';
import * as types from './actionTypes';

export default function initialLoad() {
    return function (dispatch, getState) {
        dispatch(receiveRoomBeds(new RoomRepo().GetRoomBeds()));

        if (getState().bookings.length>0) {
            //data comes from database
            // call upload
        }
        else {
            return fetch('/api/Bookings/InitialLoad', { headers: {} })
            .then(response=>response.json())  // handle response errors like not logged in
            .then(json => dispatch(receiveBookings(json)));
        }
    };
}

export function receiveBookings(body) {
    return {
        type: types.RECEIVE_BOOKINGS, bookings: body
    };
}

function receiveRoomBeds(json) {
    return {
        type: types.RECEIVE_ROOMBEDS, roomBeds: json
    };
}


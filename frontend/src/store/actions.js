import fetch from 'isomorphic-fetch';

import RoomRepo from '../services/RoomRepo';
import * as types from './actionTypes';

export default function initialLoad() {
    return function (dispatch, getState) {
        dispatch(receiveRoomBeds(new RoomRepo().GetRoomBeds()));

        if (getState.initialLoadComplete) {
            //data comes from database
            // call upload
        }
        else {
            var newArrivalsFetch = fetch('/api/Bookings/InitialLoad', { headers: {} });
            newArrivalsFetch.then(response => response.json())  // handle response errors like not logged in
                .then(json => dispatch(receiveBookings(json)));
            return newArrivalsFetch;
        }
    }
}

function receiveRoomBeds(json) {
    return {
        type: types.RECEIVE_ROOMBEDS, roomBeds: json
    }
}

export function receiveBookings(json) {
    return {
        type: types.RECEIVE_BOOKINGS, bookings: json
    }
}
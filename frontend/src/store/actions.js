import RoomRepo from '../services/RoomRepo';

export default function initialLoad() {
    return function (dispatch) {
        dispatch(receiveRoomBeds(new RoomRepo().GetRoomBeds()));
        
        var newArrivalsFetch = fetch('/api/Bookings/InitialLoad', { headers: {} });
        newArrivalsFetch.then(response => response.json())  // handle response errors like not logged in
            .then(json => dispatch(receiveBookings(json)));
        
    }
}

 function receiveRoomBeds(json) {
    return {
        type: 'receive_roomBeds', roomBeds: json
    }
}
export function receiveBookings(json) {
    return {
        type: 'receive_bookings', bookings: json
    }
}
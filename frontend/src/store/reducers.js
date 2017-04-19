import {routerReducer} from 'react-router-redux';

export default function rootReducer(state = {}, action) {
    return {
        bookings: bookings(state.bookings, action),
        roomBeds: state.roomBeds?state.roomBeds:[],
        routing: routerReducer
    };
}

function bookings(state = [], action) {
    return state;
}
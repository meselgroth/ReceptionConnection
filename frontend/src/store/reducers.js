import { routerReducer } from 'react-router-redux';

import * as types from './actionTypes';

export default function rootReducer(state = {}, action) {
    return {
        bookings: bookings(state.bookings, action),
        roomBeds: state.roomBeds ? state.roomBeds : [],
        routing: routerReducer,
        initialLoadComplete: initialLoad(action)
    };
}

function bookings(state = [], action) {
    return state;
}

function initialLoad(action) {
    if (action.type === types.RECEIVE_BOOKINGS) {
        return true;
    }
    return false;
}
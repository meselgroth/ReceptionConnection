import { routerReducer } from 'react-router-redux';

import * as types from './actionTypes';

export default function rootReducer(state = {}, action) {
    return {
        bookings: bookings(state.bookings, action),
        roomBeds: roomBeds(state.roomBeds, action),
        routing: routerReducer,
        initialLoadComplete: initialLoad(action)
    };
}

function bookings(state = [], action) {
    if(action.type===types.RECEIVE_BOOKINGS){
        return action.bookings;
    }
    return state;
}

function roomBeds(state = [], action) {
    if(action.type===types.RECEIVE_ROOMBEDS){
        return action.roomBeds;
    }
    return state;
}

function initialLoad(action) {
    if (action.type === types.RECEIVE_BOOKINGS) {
        return true;
    }
    return false;
}
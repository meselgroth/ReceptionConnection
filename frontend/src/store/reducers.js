import { routerReducer } from 'react-router-redux';
import { persistentReducer, INIT } from 'redux-pouchdb';

import * as types from './actionTypes';

export const myPersistentReducer = persistentReducer(rootReducer);

export default function rootReducer(state = {}, action) {
    return {
        bookings: persistentReducer(bookings)(state.bookings, action),
        roomBeds: roomBeds(state.roomBeds, action),
        routing: routerReducer,
        dbInitComplete: dbInit(action)
    };
}

function dbInit(action) {
    if (action.type === INIT) {
        return true;
    }
    return false;
}

function bookings(state = [], action) {
    if (action.type === types.RECEIVE_BOOKINGS) {
        return action.bookings;
    }
        if (action.type === types.ADD_BOOKING) {
        return [...state, action.booking];
    }
    
    return state;
}

function roomBeds(state = [], action) {
    if (action.type === types.RECEIVE_ROOMBEDS) {
        return action.roomBeds;
    }
    return state;
}
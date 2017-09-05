import { routerReducer } from 'react-router-redux';
import { persistentReducer, INIT } from 'redux-pouchdb';

import * as types from './actionTypes';

export const myPersistentReducer = persistentReducer(rootReducer);

export default function rootReducer(state = {}, action) {
    return {
        bookings: persistentReducer(bookings)(state.bookings, action),
        roomTypes: roomTypes(state.roomTypes, action),
        roomBeds: roomBeds(state.roomBeds, action),
        rooms: rooms(state.rooms, action),
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

function roomTypes(state = [], action) {
    if (action.type === types.RECEIVE_ROOMTYPES) {
        return action.roomTypes;
    }
    return state;
}
function roomBeds(state = [], action) {
    if (action.type === types.RECEIVE_ROOMTYPES) {
        let roomBeds = [];
        let bedCount =0;
        for (let roomType of action.roomTypes) {
            for (let i = 0; i < roomType.bedCount; i++) {
                roomBeds.push({ id: bedCount, room: roomType });
                bedCount++;
            }
        }
        return roomBeds;
    }
    return state;
}
function rooms(state = [], action) {
    if (action.type === types.RECEIVE_ROOMTYPES) {
        return action.roomTypes;
    }
    return state;
}
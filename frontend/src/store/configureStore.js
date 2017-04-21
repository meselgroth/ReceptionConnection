import { createStore, applyMiddleware, compose, initialState } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistentStore } from 'redux-pouchdb';
import PouchDB from 'pouchdb-browser';
import rootReducer from './reducers';
import initialLoad from './actions';

const loggerMiddleware = createLogger();
const db = new PouchDB('receptionDb');
let store = null;
let unsubscribeInitialiser = null;

export default function configureStore() {
    let pouchDbStoreCreator = persistentStore(db);
    let composer = compose(
        applyMiddleware(thunkMiddleware, loggerMiddleware),
        pouchDbStoreCreator
    );
    let composedMiddleware = composer(createStore);
    store = composedMiddleware(rootReducer, initialState);

    unsubscribeInitialiser = store.subscribe(subscriber);

    return store;
    // return createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
}
function subscriber() {
    if(store.getState().dbInitComplete){
        store.dispatch(initialLoad());
        unsubscribeInitialiser();
    }
}
import { createStore, applyMiddleware, compose, initialState } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistentStore } from 'redux-pouchdb';
import PouchDB from 'pouchdb-browser';
import rootReducer from './reducers';
import initialLoad from './actions';


export default class ConfigureStore {
    constructor() {
        const middlewares = [thunkMiddleware];

        if (process.env.NODE_ENV === `development`) {
            middlewares.push(createLogger());
        }

        this._db = new PouchDB('receptionDb');

        let pouchDbStoreCreator = persistentStore(this._db);
        let composer = compose(
            applyMiddleware(...middlewares),
            pouchDbStoreCreator
        );
        let composedMiddleware = composer(createStore);

        this._store = composedMiddleware(rootReducer, initialState);

        this._configure = new Promise((resolve, reject) => this._resolve = resolve);
        this.unsubscribeInitialiser = this._store.subscribe(this.subscriber.bind(this));
    }
    get store() {
        return this._store;
    }
    get configure() {
        return this._configure;
    }
    get db() {
        return this._db;
    }
    subscriber() {
        if (this._store.getState().dbInitComplete) {
            this.unsubscribeInitialiser();
            this._store.dispatch(initialLoad())
                .then(() => this._resolve());
        }
    }
}

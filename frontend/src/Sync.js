import initialLoad from './store/actions';

export default class Sync {
    constructor(store) {
        this.store = store;
    }
    StartUp() {
        this.store.dispatch(initialLoad());

        if (this.store.getState().initialLoadComplete) {
            //store.dispatch(getLatestMods());
        }
        else {
        }
    }
}
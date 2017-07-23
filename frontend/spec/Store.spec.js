import 'isomorphic-fetch';
import fetchMock from 'fetch-Mock';
import PouchDB from 'pouchdb';

import { addBooking } from '../src/store/actions';
import DeleteDb from '../src/store/powerActions';
import ConfigureStore from '../src/store/configureStore';

describe("StoreIntegration InitialLoad", () => {

  let configureStore;
  let store;

  beforeEach(() => {
  });
  afterEach(() => {
    fetchMock.restore();
    let db = configureStore.db;
    return db.allDocs().then((result) => {
      return Promise.all(result.rows.map(function (row) {
        return db.remove(row.id, row.value.rev);
      }));
    }).then(()=>{let prom = db.close(); store=undefined; db=undefined; configureStore=undefined; return prom;});
  });

  it("It fills the booking state", () => {
    fetchMock.get('*', { body: [{ "name": "Eselgroth", "firstName": "Michael", "nationality": "Philippines", "checkin": "2017-02-24", "checkout": "2017-02-28", "roomId": "95159" }] });

    configureStore = new ConfigureStore();
    store = configureStore.store;

    return configureStore.configure.then(() => {
      let bookings = store.getState().bookings;
      expect(bookings.length).toBe(1);
    });
  });


  it("It fills the booking db", () => {
    fetchMock.get('*', { body: [] });

    configureStore = new ConfigureStore();
    store = configureStore.store;

    return configureStore.configure.then(() => {
      store.dispatch(addBooking({ "name": "Eselgroth", "firstName": "Michael", "nationality": "Philippines", "checkin": "2017-02-24", "checkout": "2017-02-28", "roomId": "95159" }));
      let bookings = store.getState().bookings;
      expect(bookings.length).toBe(1);
    });
  });
});
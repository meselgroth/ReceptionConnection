import 'isomorphic-fetch';

import fetchMock from 'fetch-Mock';
import initialLoad from '../src/store/actions';
import configureStore from '../src/store/configureStore';

describe("StoreIntegration InitialLoad", () => {

  it("It fills the booking state", () => {
    fetchMock.get('*', { body: [{ "name": "Eselgroth", "firstName": "Michael", "nationality": "Philippines", "checkin": "2017-02-24", "checkout": "2017-02-28", "roomId": "95159" }] });
    let store = configureStore();

    return initialLoad()(store.dispatch, store.getState).then(() => {
      let bookings = store.getState().bookings;
      expect(bookings.length).toBe(1);
    });
  });


  it("It fills the booking db", () => {
    fetchMock.get('*', { body: [{ "name": "Eselgroth", "firstName": "Michael", "nationality": "Philippines", "checkin": "2017-02-24", "checkout": "2017-02-28", "roomId": "95159" }] });
    let store = configureStore();

    return initialLoad()(store.dispatch, store.getState).then(() => {
      //db stuff
    });
  });
});
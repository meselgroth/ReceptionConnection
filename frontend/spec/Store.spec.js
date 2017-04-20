import 'isomorphic-fetch';

import fetchMock from 'fetch-Mock';
import initialLoad from '../src/store/actions';
import configureStore from '../src/store/configureStore';


describe("StoreIntegration InitialLoad", () => {

  it("It fills the state", () => {

    fetchMock.get('*', { body: [{ "name": "Eselgroth", "firstName": "Michael", "nationality": "Philippines", "checkin": "2017-02-24", "checkout": "2017-02-28", "roomId": "95159" }] });
    // nock('http://localhost:5000')
    //   .get('/api/Bookings/InitialLoad')
    //   .reply(200, { body: [{"name":"Eselgroth","firstName":"Michael","nationality":"Philippines","checkin":"2017-02-24","checkout":"2017-02-28","roomId":"95159"}]});

    let store = configureStore();

    return initialLoad()(store.dispatch, store.getState).then(() => {
      let bookings = store.getState().bookings;
      expect(bookings.length).toBe(1);
    });

  });
});
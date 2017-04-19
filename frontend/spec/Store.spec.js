import initialLoad from '../src/store/actions';
import configureStore from '../src/store/configureStore';


describe("StoreIntegration InitialLoad", () => {

  it("It fills the state", done => {
    let store = configureStore();

    initialLoad()(store.dispatch, store.getState).then(() => {

      let bookings = store.getState().bookings;
      expect(bookings.length).toBe(1);
      done();
    });

  });
});
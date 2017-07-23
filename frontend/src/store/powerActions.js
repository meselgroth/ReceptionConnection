import PouchDB from 'pouchdb-browser';
import { receiveBookings } from './actions';

export default function DeleteDb() {
    return function (dispatch) {
        let db = new PouchDB('receptionDb');
        //db.info().then(info => console.log(info));
        return db.destroy();//.then(dispatch(receiveBookings([])));
    };
}
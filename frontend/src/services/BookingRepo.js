var PouchDB = require('pouchdb-browser');
//PouchDB.debug.enable('*');
PouchDB.debug.disable();
export default class BookingRepo {
    constructor() {
        this.db = new PouchDB('receptionDb');
        //this.db.destroy();
        this.db.info().then(function (info) {
            console.log(info);
        });

        this.bookings = [];
        this.updateComponent = () => { console.log('updateComponent not set') };
    }
    AddBookings(bookings) {
        for (let booking of bookings) {
            this.Add(booking);
        }
        this.updateComponent(this.bookings);
    }
    Add(booking) {
        booking._id = booking.name;
        this.bookings.push(booking);
        this.db.put(booking).then(() => this.updateComponent(this.bookings));
    }
    Update(booking) {
        console.log('not implemented yet');
    }
    GetBookings(startDate, endDate) {
        let bookingsPromise = this.db.allDocs({ include_docs: true }).then(bookingDocs => this.AllDocs(bookingDocs));
        return bookingsPromise;
    }
    AllDocs(bookings) {
        this.bookings = bookings.rows.map(b => b.doc);
        //todo:mce sort
        this.updateComponent(this.bookings);
    }
    Exists() {
        console.log('not implemented');
        return false;
    }
    SetObserver(observer) {
        this.updateComponent = observer;
    }
}
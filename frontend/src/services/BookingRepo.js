class FakePromise {
    constructor(repo) {
        this.repo = repo;
    }
    then(updateComponent) {
        this.repo.updateComponent = updateComponent;
        updateComponent(this.repo.bookings);
    }
}

export default class BookingRepo {
    constructor() {
        this.bookings = [];
        this.updateComponent = () => { console.log('updateComponent not set') };
    }
    AddBookings(bookings) {
        for (let booking of bookings) {
            this.bookings.push(booking);
        }
        this.updateComponent(this.bookings);
    }
    Add(booking) {
        this.bookings.push(booking);
        this.updateComponent(this.bookings);
    }
    Update(booking) {
        console.log('not implemented');
    }
    GetBookings(startDate, endDate) {
        let promise = new FakePromise(this);
        return promise;
    }
    Exists() {
        console.log('not implemented');
        return false;
    }
}
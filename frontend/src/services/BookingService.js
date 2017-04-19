export default class BookingService {
    constructor(bookingRepo, store) {
        this.bookingRepo = bookingRepo;
        this.store = store;

        //Load bookings from indexeddb
        //If empty or very old
        if (true) {
            this.InitialLoad();
        }
        else {
            this.UpdateRepo(/*last load date*/);
        }
    }
    Save(booking) {
        if (this.bookingRepo.Exists(booking)) {
            this.bookingRepo.Update();
        }
        else {
            this.bookingRepo.Add(booking);
        }
    }
    GetBookings(startDate, endDate) {
        this.getBookingsPromise = this.bookingRepo.GetBookings(startDate, endDate)
        return this.getBookingsPromise;
    }

    InitialLoad() {
        var newArrivalsFetch = fetch('/api/Bookings/InitialLoad', { headers: this.headers });
        newArrivalsFetch.then(response => response.json())  // handle response errors like not logged in
            .then(bookings => this.bookingRepo.AddBookings(bookings));
    }
    UpdateRepo() {

    }
    HandelFetchError(err) {
        console.log(err);
    }
    SetObserver(observer) {
        this.bookingRepo.SetObserver(observer);
    }
}
export default class BookingService {
    constructor(bookingRepo) {
        this.bookingRepo = bookingRepo;


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
        this.bookingRepo.Refresh();
    }
    GetBookings(startDate, endDate, updateComponent) {
        this.getBookingsPromise = this.bookingRepo.GetBookings(startDate, endDate, updateComponent)
        return this.getBookingsPromise;
    }

    InitialLoad() {
        var newArrivalsFetch = fetch('/api/Bookings/InitialLoad', { headers: this.headers });
        //fetch('/api/Bookings/',{headers:this.headers});
        newArrivalsFetch.then(response => response.json())  // handle response errors like not logged in
            .then(bookings => this.bookingRepo.AddBookings(bookings));
    }
    UpdateRepo() {

    }
    HandelFetchError(err) {
        console.log(err);
    }
}
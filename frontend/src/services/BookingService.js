export default class BookingService {
    constructor(bookingRepo) {
        this.bookingRepo = bookingRepo;
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
    GetBookings(){
        return {then:((callback)=>{callback(this.bookingRepo.bookings)})};
    }
}
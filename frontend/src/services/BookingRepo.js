
export default class BookingRepo {
    constructor(){
        this.bookings = [];
    }
    Add(booking){
        this.bookings.push(booking);

    }
    Update(booking){

    }
    Exists(){
        return false;
    }
    Refresh(){

    }
}
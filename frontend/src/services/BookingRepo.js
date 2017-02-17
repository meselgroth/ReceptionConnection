
export default class BookingRepo {
    constructor(){
        this.bookings = [{id:0,room:'6 Bed',name:'John',checkin:new Date('2/14/2017'),checkout:new Date('2/16/2018')},
        {id:0,room:'6 Bed',name:'Jay',checkin:new Date('2/14/2017'),checkout:new Date('2/16/2018')},
        {id:0,room:'6 Bed',name:'Bob',checkin:new Date('2/14/2017'),checkout:new Date('2/16/2018')}];
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
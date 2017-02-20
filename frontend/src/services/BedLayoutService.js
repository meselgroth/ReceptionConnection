import DateService from './DateService';

export default class BedLayoutService {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;

        this.days = DateService.MakeDays(startDate, endDate);
        this.errors = '';
        this.overbookings = [];
    }

    get Days() {
        return this.days;
    }
    MakeLayout(bookings, roomBeds) {
        let beds = [];
        this.overbookings = [];

        for (let roomBed of roomBeds) {
            let bed = { days: [] };
            bed.id = roomBed.id;
            bed.room = roomBed.room;
            for (let day of this.days) {
                bed.days.push({ id: bed.id + '_' + day.getTime() });
            }
            beds.push(bed);
        }
        for (let booking of bookings) {
            let bedIndex = 0;
            while (bedIndex < beds.length && beds[bedIndex].room !== booking.room) {
                bedIndex++;
            }
            if (bedIndex >= beds.length) {
                this.errors += 'Bad booking, unrecognised room: ' + booking.name + '\n';
                continue;
            }
            let startDay = DateService.CalcDaysBetween(this.startDate, booking.checkin);
            let numOfNights = DateService.CalcDaysBetween(booking.checkin, booking.checkout);
            if (startDay < 0) {
                startDay = 0;
                numOfNights = DateService.CalcDaysBetween(this.startDate, booking.checkout);
            }
            for (let dayIndex = startDay; dayIndex < numOfNights + startDay; dayIndex++) {
                if (dayIndex >= this.days.length) break;
                while (bedIndex < beds.length && beds[bedIndex].days[dayIndex].name !== undefined) bedIndex++;
                if (bedIndex >= beds.length || beds[bedIndex].room !== booking.room) {
                    this.overbookings.push(booking);
                    break;
                }
                beds[bedIndex].days[dayIndex].name = booking.name;
            }
        }
        return beds;
    }
    MakeOverbookingsLayout() {
        let roomBeds = [];
        for (let overbooking of this.overbookings) {
            roomBeds.push({ id: overbooking.id, room: overbooking.room });
        }
        return this.MakeLayout(this.overbookings, roomBeds);
    }
}
export default class BedLayoutService {
    constructor(startDate, endDate) {
        this.startDate = startDate;
        this.endDate = endDate;

        this.days = BedLayoutService.MakeDays(startDate, endDate);
        this.errors = '';
        this.overbookings = [];
    }

    get Days() {
        return this.days;
    }
    MakeLayout(bookings, roomBeds) {
        let beds = [];

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
            let startDay = BedLayoutService.CalcDaysBetween(this.startDate, booking.checkin);
            let numOfNights = BedLayoutService.CalcDaysBetween(booking.checkin, booking.checkout);
            if (startDay < 0) {
                startDay = 0;
                numOfNights = BedLayoutService.CalcDaysBetween(this.startDate, booking.checkout);
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
    static MakeDays(startDate, endDate) {
        let numofdays = BedLayoutService.CalcDaysBetween(startDate, endDate);
        let days = [];
        for (let i = 0; i < numofdays; i++) {
            let tmpDate = new Date(startDate);
            days.push(new Date(tmpDate.setDate(startDate.getDate() + i)));
        }
        return days;
    }
    static CalcDaysBetween(startDate, endDate) {
        let oneDay = 1000 * 60 * 60 * 24;
        let startMillisecond = new Date(startDate).getTime();
        let endMillisecond = new Date(endDate).getTime();
        return Math.round((endMillisecond - startMillisecond) / oneDay);
    }
}
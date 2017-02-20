export default class DateService {
    static CurrentDate() {
        let currentTime = new Date();
        return new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate());
    }
    static CurrentDateInputFormat() {
        return new Date().toISOString().substring(0, 10);
    }
    static TomorrowInputFormat() {
        let tmpDate = new Date();
        return new Date(tmpDate.setDate(tmpDate.getDate() + 1)).toISOString().substring(0, 10);
    }
    static MakeDays(startDate, endDate) {
        let numofdays = DateService.CalcDaysBetween(startDate, endDate);
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
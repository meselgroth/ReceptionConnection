import { connect } from 'react-redux';
import BedLayoutService from './services/BedLayoutService';
import DateService from './services/DateService';
import AvailabilityTable from './AvailabilityTable';

const AvailabilityTableContainer = connect(mapStateToProps)(AvailabilityTable);
export default AvailabilityTableContainer;

function mapStateToProps(state) {
    let startDate = state.startDate ? state.startDate : DateService.CurrentDate();
    let endDate = state.endDate ? state.endDate : new Date(startDate.getFullYear(), startDate.getMonth() + 1, startDate.getDate());

    let bookings = state.bookings;
    let roomBeds = state.roomBeds;

    // todo:mce initialise outside
    let bedLayoutService = new BedLayoutService(startDate, endDate);

    let days = bedLayoutService.Days;
    let beds = bedLayoutService.MakeLayout(bookings, roomBeds);
    let overbookingBeds = bedLayoutService.MakeOverbookingsLayout();
    let errors = bedLayoutService.errors;
    return { beds, days, overbookingBeds, errors };
}

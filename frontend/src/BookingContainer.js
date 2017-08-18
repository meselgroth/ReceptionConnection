import { connect } from 'react-redux';
import BookingPage from './BookingPage';
import { addBooking } from './store/actions.js';

export const BookingContainer = connect(mapStateToProps, mapDispatchToProps)(BookingPage);
//export default BookingContainer;

function mapStateToProps(state) {

    let rooms = state.rooms;

    return { rooms };
}

function mapDispatchToProps(dispatch, ownProps) {
    return { Save: function (booking) { dispatch(addBooking(booking)); } };
}
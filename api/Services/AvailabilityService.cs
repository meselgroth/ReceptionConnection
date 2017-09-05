using ReceptionConnection.Api.Models;

namespace ReceptionConnection.Api.Services
{
    public class AvailabilityService
    {
        private readonly IMyallocatorService _myallocatorService;

        public AvailabilityService(IMyallocatorService myallocatorService)
        {
            _myallocatorService = myallocatorService;
        }
        public Availability AddBooking(Booking booking)
        {
            var availability = _myallocatorService.GetAvailability(booking.Checkin, booking.Checkout);



            return availability;
        }
    }
}
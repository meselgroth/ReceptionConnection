using System;
using ReceptionConnection.Api.Models;

namespace ReceptionConnection.Api.Services
{
    public class AvailabilityService : IAvailabilityService
    {
        private readonly IMyallocatorService _myallocatorService;

        public AvailabilityService(IMyallocatorService myallocatorService)
        {
            _myallocatorService = myallocatorService;
        }
        public Availability AddBooking(Booking booking)
        {
            var availability = _myallocatorService.GetAvailability(booking.Checkin, booking.Checkout);

            var result = (int.Parse(availability.Rooms[0].Dates[0].Units) - int.Parse(booking.NumOfPeople));
            if (result<0)
            {
                throw new Exception();
            }
            availability.Rooms[0].Dates[0].Units = result.ToString();

            _myallocatorService.AvailabilityUpdate(availability);

            return availability;
        }
    }
}
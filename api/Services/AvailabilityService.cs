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

            var checkin = DateTime.Parse(booking.Checkin);
            var checkout = DateTime.Parse(booking.Checkout);
            var numOfNights = checkout.Subtract(checkin).Days;

            for (var i = 0; i < numOfNights; i++)
            {
                var result = (int.Parse(availability.Rooms[0].Dates[i].Units) - int.Parse(booking.NumOfPeople));
                if (result < 0)
                {
                    throw new Exception();
                }
                availability.Rooms[0].Dates[i].Units = result.ToString();
            }

            _myallocatorService.AvailabilityUpdate(availability);

            return availability;
        }
    }
}
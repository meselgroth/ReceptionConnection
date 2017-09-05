using ReceptionConnection.Api.Models;

namespace ReceptionConnection.Api.Services
{
    public interface IAvailabilityService
    {
        Availability AddBooking(Booking booking);
    }
}
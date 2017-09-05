using System;
using System.Collections.Generic;
using ReceptionConnection.Api.Models;

namespace ReceptionConnection.Api.Services
{
    public interface IMyallocatorService
    {
        IEnumerable<Booking> GetBookings(DateTime startDate, DateTime endDate, bool isInitialLoad);
        void AddBooking(Booking booking);
        List<RoomType> GetRoomTypes();
    }
}
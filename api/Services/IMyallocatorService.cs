using System;
using System.Collections.Generic;
using ReceptionConnection.Api.Models;

namespace ReceptionConnection.Api.Services
{
    public interface IMyallocatorService
    {
        IEnumerable<Booking> PopulateBookings(DateTime startDate, DateTime endDate);
    }
}
using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ReceptionConnection.Api.Models;
using ReceptionConnection.Api.Services;

namespace ReceptionConnection.Api.Test
{
    [TestClass]
    public class AddBookingUpdateAllocationTest
    {
        [TestMethod]
        public void AddBooking1Person1Night()
        {
            var availabilityService = new AvailabilityService(new Mock<IMyallocatorService>());

            var newAvailabilty = availabilityService.AddBooking(new Booking {Checkin = DateTime.Now.ToString("yyyy-MM-dd"), Checkout = DateTime.Now.AddDays(1).ToString("yyyy-MM-dd"), NumOfPeople = "1" });

            Assert.AreEqual(5, newAvailabilty.Rooms[0].Dates[0].Units);
        }
    }
}

using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
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
            var mockMyAllocatorService = new Mock<IMyallocatorService>();
            mockMyAllocatorService.Setup(m => m.GetAvailability("", "")).Returns(new Availability
            {
                Rooms = new List<RoomAvailability>
                {
                    new RoomAvailability
                    {
                        RoomId = "123",
                        Dates = new List<AvailPrice>
                        {
                            new AvailPrice {Date = DateTime.Today.ToString("yyyy-MM-dd"), Price = "600", Units = "6"}
                        }
                    }
                }
            });

            var availabilityService = new AvailabilityService(mockMyAllocatorService.Object);

            var newAvailabilty = availabilityService.AddBooking(new Booking { Checkin = DateTime.Now.ToString("yyyy-MM-dd"), Checkout = DateTime.Now.AddDays(1).ToString("yyyy-MM-dd"), NumOfPeople = "1" });

            Assert.AreEqual(5, newAvailabilty.Rooms[0].Dates[0].Units);
        }
    }
}

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
            var checkin = DateTime.Today.ToString("yyyy-MM-dd");
            var checkout = DateTime.Today.AddDays(1).ToString("yyyy-MM-dd");
            mockMyAllocatorService.Setup(m => m.GetAvailability(checkin, checkout)).Returns(new Availability
            {
                Rooms = new List<RoomAvailability>
                {
                    new RoomAvailability
                    {
                        RoomId = "123",
                        Dates = new List<AvailPrice>
                        {
                            new AvailPrice {Date = checkin, Price = "600", Units = "6"}
                        }
                    }
                }
            });

            var availabilityService = new AvailabilityService(mockMyAllocatorService.Object);

            var newAvailabilty = availabilityService.AddBooking(new Booking { Checkin = checkin, Checkout = checkout, NumOfPeople = "1" });

            Assert.AreEqual("5", newAvailabilty.Rooms[0].Dates[0].Units);
        }
        [TestMethod]
        public void AddBooking2Person1NightDoesntUpdate2ndAvailability()
        {
            var mockMyAllocatorService = new Mock<IMyallocatorService>();
            var checkin = DateTime.Today.ToString("yyyy-MM-dd");
            var checkout = DateTime.Today.AddDays(1).ToString("yyyy-MM-dd");
            mockMyAllocatorService.Setup(m => m.GetAvailability(checkin, checkout)).Returns(new Availability
            {
                Rooms = new List<RoomAvailability>
                {
                    new RoomAvailability
                    {
                        RoomId = "123",
                        Dates = new List<AvailPrice>
                        {
                            new AvailPrice {Date = checkin, Price = "600", Units = "6"},
                            new AvailPrice {Date = checkout, Price = "600", Units = "6"}
                        }
                    }
                }
            });

            var availabilityService = new AvailabilityService(mockMyAllocatorService.Object);

            var newAvailabilty = availabilityService.AddBooking(new Booking { Checkin = checkin, Checkout = checkout, NumOfPeople = "2" });

            Assert.AreEqual("4", newAvailabilty.Rooms[0].Dates[0].Units);
            Assert.AreEqual("6", newAvailabilty.Rooms[0].Dates[1].Units);
        }
        [TestMethod]
        public void AddBooking2Person2Nights()
        {
            var mockMyAllocatorService = new Mock<IMyallocatorService>();
            var checkin = DateTime.Today.ToString("yyyy-MM-dd");
            var checkout = DateTime.Today.AddDays(2).ToString("yyyy-MM-dd");
            mockMyAllocatorService.Setup(m => m.GetAvailability(checkin, checkout)).Returns(new Availability
            {
                Rooms = new List<RoomAvailability>
                {
                    new RoomAvailability
                    {
                        RoomId = "123",
                        Dates = new List<AvailPrice>
                        {
                            new AvailPrice {Date = checkin, Price = "600", Units = "6"},
                            new AvailPrice {Date = DateTime.Today.AddDays(1).ToString("yyyy-MM-dd"), Price = "600", Units = "6"}
                        }
                    }
                }
            });

            var availabilityService = new AvailabilityService(mockMyAllocatorService.Object);

            var newAvailabilty = availabilityService.AddBooking(new Booking { Checkin = checkin, Checkout = checkout, NumOfPeople = "2" });

            Assert.AreEqual("4", newAvailabilty.Rooms[0].Dates[0].Units);
            Assert.AreEqual("4", newAvailabilty.Rooms[0].Dates[1].Units);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using ReceptionConnection.Api.Models;

namespace ReceptionConnection.Api.Services
{
    public class MyallocatorService : IMyallocatorService
    {
        public IEnumerable<Booking> PopulateBookings(DateTime startDate, DateTime endDate)
        {
            var httpClient = new HttpClient();
            //const string myallocatorApi = "http://api.myallocator.com/pms/v201408/json";
            const string myallocatorApi = "http://localhost:2982/api";

            var bodyDictionary = new Dictionary<string, string> {
                {"Auth/UserToken", ""},
                {"Auth/PropertyId",""},
                {"Auth/VendorId",""},
                {"Auth/VendorPassword",""},
                {"ArrivalStartDate",startDate.ToString("yyyy-MM-dd")},
                {"ArrivalEndDate",endDate.ToString("yyyy-MM-dd")}};

            var jsonRequest = JsonConvert.SerializeObject(bodyDictionary);
            var stringContent = new StringContent(jsonRequest);
            stringContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");
            var request = httpClient.PostAsync(myallocatorApi + "/BookingList", stringContent);
            var result = request.Result;
            var responseBody = result.Content.ReadAsStringAsync().Result;
            dynamic content = JsonConvert.DeserializeObject(responseBody);

            var bookings = new List<Booking>();

            foreach (var booking in content.Bookings)
            {
                var customer = booking.Customers[0];
                bookings.Add(new Booking
                {
                    Name = customer.CustomerLName,
                    FirstName = customer.CustomerFName,
                    Nationality = customer.CustomerNationality,
                    Checkin = booking.StartDate,
                    Checkout = booking.EndDate,
                    RoomId = booking.Rooms[0].ChannelRoomType
                });
            }

            return bookings;
        }
    }
}
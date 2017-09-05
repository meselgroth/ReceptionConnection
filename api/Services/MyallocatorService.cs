using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using ReceptionConnection.Api.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace ReceptionConnection.Api.Services
{
    public class MyallocatorService : IMyallocatorService
    {
        private readonly AppSettings _appSettings;
        private HttpClient _httpClient;
        private Dictionary<string, string> _bodyDictionary;

        public MyallocatorService(IOptions<AppSettings> settings)
        {
            _appSettings = settings.Value;

            _httpClient = new HttpClient();
            _bodyDictionary = new Dictionary<string, string>
            {
                //TODO:mce switch to token
                {"Auth/UserToken", _appSettings.UserToken},
                {"Auth/PropertyId", _appSettings.PropertyId},
                {"Auth/VendorId", _appSettings.VendorId},
                {"Auth/VendorPassword", _appSettings.VendorPassword}
            };
        }

        public IEnumerable<Booking> GetBookings(DateTime startDate, DateTime endDate, bool isInitialLoad)
        {
            if (isInitialLoad)
            {
                _bodyDictionary.Add("ArrivalStartDate", startDate.ToString("yyyy-MM-dd"));
                _bodyDictionary.Add("ArrivalEndDate", endDate.ToString("yyyy-MM-dd"));
            }
            else
            {
                _bodyDictionary.Add("ModificationStartDate", startDate.ToString("yyyy-MM-dd"));
                _bodyDictionary.Add("ModificationEndDate", endDate.ToString("yyyy-MM-dd"));
            }

            var stringContent = new StringContent(JsonConvert.SerializeObject(_bodyDictionary));
            stringContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");

            var request = _httpClient.PostAsync(_appSettings.Myallocator + "/BookingList", stringContent);
            var responseBody = request.Result.Content.ReadAsStringAsync().Result;

            var bookings = new List<Booking>();
            dynamic content = JsonConvert.DeserializeObject(responseBody);

            if (content == null) return bookings;
            if (content.Bookings == null) return bookings;

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

        public void AddBooking(Booking booking)
        {
            _bodyDictionary.Add("Channels", "all");
            var allocationDictionary = new Dictionary<string, string>
            {
                {"ArrivalStartDate", booking.Checkin},
                {"ArrivalEndDate", booking.Checkout},
                {"RoomId", booking.RoomId},
                {"Units", booking.NumOfPeople}

            };
            _bodyDictionary.Add("Allocation", JsonConvert.SerializeObject(allocationDictionary));

            var stringContent = new StringContent(JsonConvert.SerializeObject(_bodyDictionary));
            stringContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");

            var request = _httpClient.PostAsync(_appSettings.Myallocator + "/BookingList", stringContent);
            var responseBody = request.Result.Content.ReadAsStringAsync().Result;
        }

        public List<RoomType> GetRoomTypes()
        {
            var stringContent = new StringContent(JsonConvert.SerializeObject(_bodyDictionary));
            stringContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");

            var request = _httpClient.PostAsync(_appSettings.Myallocator + "/RoomList", stringContent);
            var responseBody = request.Result.Content.ReadAsStringAsync().Result;

            var roomTypes = new List<RoomType>();
            dynamic content = JsonConvert.DeserializeObject(responseBody);

            if (content == null) return roomTypes;
            if (content.Bookings == null) return roomTypes;

            foreach (var roomType in content.RoomTypes)
            {
                roomTypes.Add(new RoomType
                {
                    Id = roomType.CustomerLName,
                    Label = roomType.Label,
                    NumOfRooms = roomType.Units,
                    Occupancy = roomType.Occupancy
                });
            }
            return roomTypes;
        }


        public Availability GetAvailability(string startDate, string endDate)
        {
            _bodyDictionary.Add("StartDate", startDate);
            _bodyDictionary.Add("EndDate", endDate);

            var stringContent = new StringContent(JsonConvert.SerializeObject(_bodyDictionary));
            stringContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");

            var request = _httpClient.PostAsync(_appSettings.Myallocator + "/RoomAvailabilityList", stringContent);
            var responseBody = request.Result.Content.ReadAsStringAsync().Result;

            var availability = JsonConvert.DeserializeObject<Availability>(responseBody);


            return availability;
        }
    }
}
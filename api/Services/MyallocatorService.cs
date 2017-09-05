using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Authentication;
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
        private string _token;

        public MyallocatorService(IOptions<AppSettings> settings)
        {
            _appSettings = settings.Value;

            _httpClient = new HttpClient();
            _bodyDictionary = new Dictionary<string, string>
            {
                {"Auth/PropertyId", _appSettings.PropertyId},
                {"Auth/VendorId", _appSettings.VendorId},
                {"Auth/VendorPassword", _appSettings.VendorPassword},
            };
        }

        public void GetToken()
        {
            if (!string.IsNullOrEmpty(_token)) return;

            var bodyDictionary = new Dictionary<string, string>
            {
                {"Auth/UserId", _appSettings.UserId},
                {"Auth/UserPassword", _appSettings.UserPassword},
                {"Auth/VendorId", _appSettings.VendorId},
                {"Auth/VendorPassword", _appSettings.VendorPassword}
            };
            var stringContent = new StringContent(JsonConvert.SerializeObject(bodyDictionary));
            stringContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");

            var request = _httpClient.PostAsync(_appSettings.Myallocator + "/AssociateUserToPMS", stringContent);
            var responseBody = request.Result.Content.ReadAsStringAsync().Result;

            dynamic content = JsonConvert.DeserializeObject(responseBody);

            if (content == null) throw new AuthenticationException($"No token from myallocator: {responseBody}");
            if (content["Auth/UserToken"] == null) throw new AuthenticationException($"No token from myallocator: {responseBody}");

            _token = content["Auth/UserToken"];
            _bodyDictionary.Add("Auth/UserToken", _token);
        }

        public IEnumerable<Booking> GetBookings(DateTime startDate, DateTime endDate, bool isInitialLoad)
        {
            GetToken();

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
            GetToken();

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
            GetToken();

            var stringContent = new StringContent(JsonConvert.SerializeObject(_bodyDictionary));
            stringContent.Headers.ContentType = MediaTypeHeaderValue.Parse("application/json");

            var request = _httpClient.PostAsync(_appSettings.Myallocator + "/RoomList", stringContent);
            var responseBody = request.Result.Content.ReadAsStringAsync().Result;

            var roomTypes = new List<RoomType>();
            dynamic content = JsonConvert.DeserializeObject(responseBody);

            if (content == null) return roomTypes;
            if (content.RoomTypes == null) return roomTypes;

            foreach (var roomType in content.RoomTypes)
            {
                roomTypes.Add(new RoomType
                {
                    Id = roomType.RoomId,
                    Name = roomType.Label,
                    NumOfRooms = roomType.Units,
                    BedCount = roomType.Occupancy
                });
            }
            return roomTypes;
        }
    }
}
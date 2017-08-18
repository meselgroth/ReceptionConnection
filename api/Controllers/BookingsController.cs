using System;
using System.Collections.Generic;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ReceptionConnection.Api.Models;
using ReceptionConnection.Api.Services;

namespace ReceptionConnection.Api.Controllers
{
    [Route("api/[controller]")]
    public class BookingsController : Controller
    {
        private readonly IMyallocatorService _myallocatorService;
        private readonly ILogger _logger;

        public BookingsController(IMyallocatorService myallocatorService, ILogger logger)
        {
            _myallocatorService = myallocatorService;
            _logger = logger;
        }

        [HttpGet("InitialLoad")]
        public IEnumerable<Booking> InitialLoad(DateTime? startDate, DateTime? endDate)
        {
            _logger.LogInformation($"InitialLoad: {startDate}, {endDate}");

            startDate = startDate ?? DateTime.Today.AddMonths(-1);
            endDate = endDate ?? DateTime.Today.AddMonths(1);

            var bookings = _myallocatorService.GetBookings(startDate.Value, endDate.Value, true);

            return bookings;
        }
        [HttpGet]
        public IEnumerable<Booking> GetLatestBookings(DateTime? startDate, DateTime? endDate)
        {
            startDate = startDate ?? DateTime.Today;
            endDate = endDate ?? DateTime.Today.AddDays(1);

            var bookings = _myallocatorService.GetBookings(startDate.Value, endDate.Value, false);

            return bookings;
        }
        [HttpPost]
        public ActionResult AddBooking([FromBody] Booking booking)
        {
            _logger.LogInformation($"AddBooking: {JsonConvert.SerializeObject(booking)}");

            _myallocatorService.AddBooking(booking);
            return Ok();
        }
    }
}

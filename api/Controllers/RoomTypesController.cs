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
    public class RoomTypesController : Controller
    {
        private readonly IMyallocatorService _myallocatorService;
        private readonly ILogger _logger;

        public RoomTypesController(IMyallocatorService myallocatorService, ILogger<RoomTypesController> logger)
        {
            _myallocatorService = myallocatorService;
            _logger = logger;
        }
        [HttpGet]
        public IEnumerable<RoomType> GetRoomTypes(DateTime? startDate, DateTime? endDate)
        {
            startDate = startDate ?? DateTime.Today;
            endDate = endDate ?? DateTime.Today.AddDays(1);

            var bookings = _myallocatorService.GetBookings(startDate.Value, endDate.Value, false);

            return bookings;
        }
    }
}

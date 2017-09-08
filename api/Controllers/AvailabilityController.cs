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
    public class AvailabilityController : Controller
    {
        private readonly IMyallocatorService _myallocatorService;
        private readonly ILogger _logger;

        public AvailabilityController(IMyallocatorService myallocatorService, ILogger<BookingsController> logger)
        {
            _myallocatorService = myallocatorService;
            _logger = logger;
        }

        [HttpPost("Price")]
        public ActionResult Price([FromBody]AvailPrice availPrice)
        {
            _logger.LogInformation($"Price: {availPrice.Date}, {availPrice.Price}");

            _myallocatorService.AvailabilityUpdate(new Availability
            {
                Rooms = new List<RoomAvailability>
            {
                 new RoomAvailability{ Dates = new List<AvailPrice>{new AvailPrice
               {
                   Date = availPrice.Date,
                   Price = availPrice.Price,
                   
               }}}
            }
            });

            return Ok();
        }
    }
}

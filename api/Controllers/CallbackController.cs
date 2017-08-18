using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReceptionConnection.Api.Models;
using ReceptionConnection.Api.Services;

namespace ReceptionConnection.Api.Controllers
{
    [Route("api/[controller]")]
    public class CallbackController : Controller
    {
        private readonly ILogger<CallbackController> _logger;

        public CallbackController(ILogger<CallbackController> logger)
        {
            _logger = logger;
        }
        [HttpPost("Bookings")]
        public string ReceiveBookings([FromBody] string booking)
        {
            _logger.LogInformation($"Received callback: {booking}");
            return "{\"success\": true}";
        }
    }
}

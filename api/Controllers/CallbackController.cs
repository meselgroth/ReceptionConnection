using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using ReceptionConnection.Api.Models;
using ReceptionConnection.Api.Services;

namespace ReceptionConnection.Api.Controllers
{
    [Route("api/[controller]")]
    public class CallbackController : Controller
    {
        [HttpPost("Bookings")]
        public string ReceiveBookings([FromBody] string booking)
        {
            return "{\"success\": true}";
        }
    }
}

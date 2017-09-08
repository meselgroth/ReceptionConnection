using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ReceptionConnection.Api.Controllers
{
    [Route("api")]
    public class MyAllocatorMockApi : Controller
    {
        [HttpPost("BookingList")]
        public string BookingList()
        {
            var json = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), @"testData", "myallocatorBookingList.json"));
            return json;
        }
        [HttpPost("RoomList")]
        public string RoomList()
        {
            var json = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), @"testData", "RoomList.json"));
            return json;
        }
        [HttpPost("AssociateUserToPMS")]
        public string AssociateUserToPMS()
        {
            var json = "{\"Auth/UserToken\":\"\"}";
            return json;
        }
        
    }
}

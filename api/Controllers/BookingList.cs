using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ReceptionConnection.Api.Controllers
{
    [Route("api/[controller]")]
    public class BookingList : Controller
    {
        // POST api/values
        [HttpPost]
        public string Post([FromBody]string value)
        {
            var json = System.IO.File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), @"testData", "myallocatorBookingList.json"));
            return json; 
        }
    }
}

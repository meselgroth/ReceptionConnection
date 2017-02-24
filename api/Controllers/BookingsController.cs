using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ReceptionConnection.Api.Models;

namespace ReceptionConnection.Api.Controllers
{
    [Route("api/[controller]")]
    public class BookingsController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<Booking> Get(DateTime? startDate, DateTime? endDate)
        {
            startDate = startDate ?? DateTime.Today;
            endDate = endDate ?? DateTime.Today.AddMonths(1);

            return new Booking[] { new Booking() };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

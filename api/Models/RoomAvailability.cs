using System.Collections.Generic;

namespace ReceptionConnection.Api.Models
{
    public class RoomAvailability
    {
        public List<AvailPrice> Dates { get; set; }
        public string RoomId { get; set; }
    }
}
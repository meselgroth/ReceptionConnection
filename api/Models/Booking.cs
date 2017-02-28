namespace ReceptionConnection.Api.Models
{
    public class Booking
    {
        public string Name { get; internal set; }
        public string FirstName { get; internal set; }
        public string Nationality { get; internal set; }
        public string Checkin { get; internal set; }
        public string Checkout { get; internal set; }
        public string RoomId { get; internal set; }
    }
}
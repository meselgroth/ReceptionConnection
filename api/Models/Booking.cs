namespace ReceptionConnection.Api.Models
{
    public class Booking
    {
        public string Name { get; internal set; }
        public string FirstName { get; internal set; }
        public string Nationality { get; internal set; }
        public string Checkin { get; set; }
        public string Checkout { get; set; }
        public string RoomId { get; internal set; }
        public string NumOfPeople { get; set; }
    }
}
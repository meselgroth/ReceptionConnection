namespace ReceptionConnection.Api.Models
{
    public class Booking
    {
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string Nationality { get; set; }
        public string Checkin { get; set; }
        public string Checkout { get; set; }
        public string RoomId { get; set; }
        public string NumOfPeople { get; set; }
    }
}
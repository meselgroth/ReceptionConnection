namespace ReceptionConnection.Api.Models
{
    public class Booking
    {
        public string Name { get; internal set; }
        public string FirstName { get; internal set; }
        public string Nationality { get; internal set; }
        public string StartDate { get; internal set; }
        public string EndDate { get; internal set; }
        public string RoomId { get; internal set; }
    }
}
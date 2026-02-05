namespace Domain.Entities;

public class Reservation
{
    public uint Id { get; set; }

    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }

    public uint MobilhomeId { get; set; }

    public string? Comment { get; set; }
    public string Color { get; set; } = null!;
    public int? NumberPerson { get; set; }

    public sbyte? Funpass { get; set; }
    public string? Email { get; set; }
    public string? Immat { get; set; }
    public string? SibluResa { get; set; }
    public string? Phone { get; set; }

    public List<Vacationer> Vacationers { get; set; } = new();
}

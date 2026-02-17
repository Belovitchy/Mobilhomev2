namespace Application.DTOs;


public class MobilhomeDetailsDto
{
    public uint Id { get; set; }
    public string Name { get; set; } = null!;
    public uint OwnerId { get; set; }
    public string? IcalLink { get; set; }
    public ManagerDto Manager { get; set; } = null!;

    public List<ReservationDetailsDto> Reservations { get; set; } = new();
}

public class ReservationDetailsDto
{
    public uint Id { get; set; }
    public string Name { get; set; } = null!;

    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }

    public string? Comment { get; set; }
    public string Color { get; set; } = null!;
    public int? NumberPerson { get; set; }

    public string? Email { get; set; }
    public string? Phone { get; set; }

    public List<VacationerDto> Vacationers { get; set; } = new();
}

public class VacationerDto
{
    public uint Id { get; set; }
    public string Name { get; set; } = null!;
    public string Firstname { get; set; } = null!;
    public uint Age { get; set; }
}

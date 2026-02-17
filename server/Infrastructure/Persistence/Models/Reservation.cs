using System;
using System.Collections.Generic;

namespace Infrastructure.Persistence.Models;

public partial class Reservation
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

    public string Name { get; set; } = null!;

    public virtual Mobilhome Mobilhome { get; set; } = null!;

    public virtual ICollection<Vacationer> Vacationers { get; set; } = new List<Vacationer>();
}

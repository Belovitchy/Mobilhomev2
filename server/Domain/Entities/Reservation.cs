using System;
using System.Collections.Generic;

namespace Domain.Entities;



public partial class Reservation
{
    public uint Id { get; set; }

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public uint MobilhomeId { get; set; }

    public uint OwnerId { get; set; }

    public virtual Mobilhome Mobilhome { get; set; } = null!;

    public virtual Owner Owner { get; set; } = null!;

    public virtual ICollection<Vacationer> Vacationers { get; set; } = new List<Vacationer>();
}

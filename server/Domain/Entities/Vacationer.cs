using System;
using System.Collections.Generic;

namespace Domain.Entities;



public partial class Vacationer
{
    public uint Id { get; set; }

    public string Name { get; set; } = null!;

    public string Firstname { get; set; } = null!;

    public uint Age { get; set; }

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}

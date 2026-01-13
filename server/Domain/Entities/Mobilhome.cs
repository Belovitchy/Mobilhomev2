using System;
using System.Collections.Generic;

namespace Domain.Entities;



public partial class Mobilhome
{
    public uint Id { get; set; }

    public string Name { get; set; } = null!;

    public uint OwnerId { get; set; }

    public uint ManagerId { get; set; }

    public string? IcalLink { get; set; }

    public virtual Manager Manager { get; set; } = null!;

    public virtual Owner Owner { get; set; } = null!;

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();
}

using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class Owner
{
    public uint Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public bool IsAdmin { get; set; }

    public virtual ICollection<Invoice> Invoices { get; set; } = new List<Invoice>();

    public virtual ICollection<Link> Links { get; set; } = new List<Link>();

    public virtual ICollection<Mobilhome> Mobilhomes { get; set; } = new List<Mobilhome>();

    public virtual ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    public virtual ICollection<Manager> Managers { get; set; } = new List<Manager>();
}

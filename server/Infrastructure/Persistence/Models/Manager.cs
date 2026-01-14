using System;
using System.Collections.Generic;

namespace Infrastructure.Persistence.Models;

public partial class Manager
{
    public uint Id { get; set; }

    public string Name { get; set; } = null!;

    public string Firstname { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Telephone { get; set; } = null!;

    public virtual ICollection<Mobilhome> Mobilhomes { get; set; } = new List<Mobilhome>();

    public virtual ICollection<Owner> Owners { get; set; } = new List<Owner>();
}

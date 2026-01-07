using System;
using System.Collections.Generic;

namespace Domain.Entities;

public partial class Invoice
{
    public uint Id { get; set; }

    public string Description { get; set; } = null!;

    public decimal Amount { get; set; }

    public string Type { get; set; } = null!;

    public string Category { get; set; } = null!;

    public DateOnly Date { get; set; }

    public uint OwnerId { get; set; }

    public virtual Owner Owner { get; set; } = null!;
}

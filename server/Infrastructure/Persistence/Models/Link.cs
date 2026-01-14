using System;
using System.Collections.Generic;

namespace Infrastructure.Persistence.Models;

public partial class Link
{
    public uint Id { get; set; }

    public string Name { get; set; } = null!;

    public string Url { get; set; } = null!;

    public uint OwnerId { get; set; }

    public virtual Owner Owner { get; set; } = null!;
}

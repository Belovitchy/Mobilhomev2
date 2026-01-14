namespace Domain.Entities;

public class Mobilhome
{
    public uint Id { get; set; }
    public string Name { get; set; } = null!;
    public uint OwnerId { get; set; }
    public uint ManagerId { get; set; }
    public string? IcalLink { get; set; }

    public Manager? Manager { get; set; }
}

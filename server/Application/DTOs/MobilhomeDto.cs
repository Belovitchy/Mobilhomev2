namespace Application.DTOs;

public class MobilhomeDto
{
    public uint Id { get; set; }
    public string Name { get; set; } = null!;
    public ManagerDto Manager { get; set; } = null!;

}
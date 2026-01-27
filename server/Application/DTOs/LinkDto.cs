namespace Application.DTOs;

public class LinkDto
{
    public uint Id { get; set; }
    public string Name { get; set; } = null!;
    public string Url { get; set; } = null!;
    public uint OwnerId { get; set; }
}

namespace Application.DTOs;

public class AdminOwnerDto
{
    public uint Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool IsAdmin { get; set; }
}

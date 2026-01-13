namespace Application.DTOs;

public class OwnerDto
{
    public uint Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;

    public bool IsAdmin { get; set; } = false;
}

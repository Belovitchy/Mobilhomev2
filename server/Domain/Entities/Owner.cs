namespace Domain.Entities;

public class Owner
{
    public uint Id { get; set; }
    public string Name { get; set; } = null!;
    public string Email { get; set; } = null!;
    public bool IsAdmin { get; set; }

    public string Password { get; set; } = null!;   // hash
}

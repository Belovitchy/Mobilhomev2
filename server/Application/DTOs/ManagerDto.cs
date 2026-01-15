using System.Text;

namespace Application.DTOs;

public class ManagerDto
{
    public uint Id { get; set; }
    public string Name { get; set; } = null!;
    public string Firstname { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Telephone { get; set; } = null!;
}
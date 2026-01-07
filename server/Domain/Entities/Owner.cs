namespace Domain.Entities;

public class Owner
{
    public int Id { get; set; }
    public string Name { get; set; } = default!; //"=default!"=>je te promet qu'elle ne sera pas null
    public string Email { get; set; } = default!;
}

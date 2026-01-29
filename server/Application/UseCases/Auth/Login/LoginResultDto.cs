using Application.DTOs;

namespace Application.UseCases.Auth.Login;

public class LoginResultDto
{
    public string Token { get; set; } = null!;
    public OwnerDto Owner { get; set; } = null!;
}




using Application.Interfaces;
using Application.Interfaces.Security;
using Application.Mappers;

namespace Application.UseCases.Auth.Login;

public class LoginHandler
{
    private readonly IOwnerRepository _ownerRepo;
    private readonly IPasswordHasher _passwordHasher;
    private readonly IJwtTokenGenerator _jwt;

    public LoginHandler(
        IOwnerRepository ownerRepo,
        IPasswordHasher passwordHasher,
        IJwtTokenGenerator jwt)
    {
        _ownerRepo = ownerRepo;
        _passwordHasher = passwordHasher;
        _jwt = jwt;
    }

    public async Task<LoginResultDto> Handle(LoginCommand command)
    {
        var owner = await _ownerRepo.GetByEmailAsync(command.Email);
        if (owner is null)
            throw new Exception("Invalid credentials");

        if (!_passwordHasher.Verify(command.Password, owner.Password))
            throw new Exception("Invalid credentials");

        var token = _jwt.Generate(owner);

        return new LoginResultDto { Token = token, Owner = OwnerMapper.ToDto(owner) };
    }
}

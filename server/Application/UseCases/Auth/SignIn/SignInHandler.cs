using Application.Interfaces;
using Domain.Entities;
using Application.Interfaces.Security;

namespace Application.UseCases.Auth.SignIn;

public class SignInHandler
{
    private readonly IOwnerRepository _ownerRepository;
    private readonly IPasswordHasher _passwordHasher;

    public SignInHandler(
        IOwnerRepository ownerRepository,
        IPasswordHasher passwordHasher)
    {
        _ownerRepository = ownerRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task Handle(SignInCommand command)
    {
        var existing = await _ownerRepository.GetByEmailAsync(command.Email);
        if (existing != null)
            throw new Exception("Email déjà utilisé");

        var hash = _passwordHasher.Hash(command.Password);

        var owner = new Owner
        {
            Name = command.Name,
            Email = command.Email,
            Password = hash,
            IsAdmin = false
        };

        await _ownerRepository.AddAsync(owner);
    }
}

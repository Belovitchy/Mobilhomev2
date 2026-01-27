using Application.Interfaces;
using Domain.Entities;
using Application.Interfaces.Security;
using Application.Mappers;

namespace Application.UseCases.Auth.UpdatePassOwner;

public class UpdatePassOwnerHandler
{
    private readonly IOwnerRepository _ownerRepository;
    private readonly IPasswordHasher _passwordHasher;


    public UpdatePassOwnerHandler(IOwnerRepository ownerRepository, IPasswordHasher passwordHasher)
    {
        _ownerRepository = ownerRepository;
        _passwordHasher = passwordHasher;
    }

    public async Task<Owner> Handle(UpdatePassOwnerCommand command, uint ownerId)
    {
        var owner = await _ownerRepository.GetByIdAsync(ownerId);

        if (owner == null)
        {
            throw new Exception("Owner not found");
        }

        if (!_passwordHasher.Verify(command.OldPassword, owner.Password))
            throw new Exception("Invalid credentials");

        owner.Password = _passwordHasher.Hash(command.NewPassword);

        await _ownerRepository.UpdateAsync(owner);

        return owner;

    }
}
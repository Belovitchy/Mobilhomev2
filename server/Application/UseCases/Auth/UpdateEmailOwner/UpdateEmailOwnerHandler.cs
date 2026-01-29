using Application.Interfaces;
using Domain.Entities;

namespace Application.UseCases.Auth.UpdateEmailOwner;

public class UpdateEmailOwnerHandler
{
    private readonly IOwnerRepository _ownerRepository;

    public UpdateEmailOwnerHandler(IOwnerRepository ownerRepository)
    {
        _ownerRepository = ownerRepository;
    }

    public async Task<Owner> Handle(UpdateEmailOwnerCommand command, uint ownerId)
    {
        var owner = await _ownerRepository.GetByIdAsync(ownerId);

        if (owner == null)
        {
            throw new Exception("Owner not found");
        }

        owner.Email = command.Email;

        await _ownerRepository.UpdateAsync(owner);


        return owner;
    }
}

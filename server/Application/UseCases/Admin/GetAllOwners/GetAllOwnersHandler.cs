using Application.Interfaces;
using Domain.Entities;


namespace Application.UseCases.Admin.GetAllOwners;

public class GetAllOwnersHandler
{
    private readonly IOwnerRepository _ownerRepository;

    public GetAllOwnersHandler(IOwnerRepository ownerRepository)
    {
        _ownerRepository = ownerRepository;
    }
    public async Task<List<Owner>> Handle(GetAllOwnersQuery query)
    {
        return await _ownerRepository.GetAllAsync();
    }
}


using Application.Interfaces;


namespace Application.UseCases.Admin.DeleteOwner;

public class DeleteOwnerHandler
{
    private readonly IOwnerRepository _ownerRepository;
    public DeleteOwnerHandler(IOwnerRepository ownerRepository)
    {
        _ownerRepository = ownerRepository;
    }

    public async Task Handle(uint id, uint ownerId)
    {
        var ownerAdmin = await _ownerRepository.GetByIdAsync(id);

        if (ownerAdmin == null)
        {
            throw new Exception("Owner not found");
        }

        if (!ownerAdmin.IsAdmin)
        {
            throw new UnauthorizedAccessException();
        }

        await _ownerRepository.DeleteAsync(ownerId);
    }
}



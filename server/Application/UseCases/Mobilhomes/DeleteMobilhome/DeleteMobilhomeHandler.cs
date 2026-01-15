using Application.Interfaces;


namespace Application.UseCases.Mobilhomes.DeleteMobilhome;

public class DeleteMobilhomeHandler
{
    private readonly IMobilhomeRepository _mobilhomeRepository;

    public DeleteMobilhomeHandler(IMobilhomeRepository mobilhomeRepository)
    {
        _mobilhomeRepository = mobilhomeRepository;
    }

    public async Task Handle(uint mobilhomeId, uint ownerId)
    {
        var mobilhome = await _mobilhomeRepository.GetByIdAsync(mobilhomeId);

        if (mobilhome == null)
        {
            throw new Exception("Mobilhome not found");
        }

        if (mobilhome.OwnerId != ownerId)
        {
            throw new UnauthorizedAccessException();
        }

        await _mobilhomeRepository.DeleteAsync(mobilhomeId);

    }

}
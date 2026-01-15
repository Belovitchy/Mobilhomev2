using Application.Interfaces;
using Domain.Entities;


namespace Application.UseCases.Mobilhomes.UpdateMobilhome;

public class UpdateMobilhomeHandler
{
    private readonly IMobilhomeRepository _mobilhomeRepository;

    public UpdateMobilhomeHandler(IMobilhomeRepository mobilhomeRepository)
    {
        _mobilhomeRepository = mobilhomeRepository;
    }

    public async Task<Mobilhome> Handle(UpdateMobilhomeCommand command, uint ownerId, uint mobilhomeId)
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
        mobilhome.Name = command.Name;
        mobilhome.ManagerId = command.ManagerId;
        mobilhome.IcalLink = command.IcalLink;

        await _mobilhomeRepository.UpdateAsync(mobilhome);

        return mobilhome;

    }

}
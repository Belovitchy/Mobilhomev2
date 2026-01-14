using Application.Interfaces;
using Domain.Entities;

namespace Application.UseCases.Mobilhomes.AddMobilhome;

public class AddMobilhomeHandler
{
    private readonly IMobilhomeRepository _mobilhomeRepository;

    public AddMobilhomeHandler(IMobilhomeRepository mobilhomeRepository)
    {
        _mobilhomeRepository = mobilhomeRepository;
    }

    public async Task Handle(AddMobilhomeCommand command, uint ownerId)
    {
        var mobilhome = new Mobilhome
        {
            Name = command.Name,
            OwnerId = ownerId,
            ManagerId = command.ManagerId,
            IcalLink = command.IcalLink
        };

        await _mobilhomeRepository.AddAsync(mobilhome);
    }
}
using Application.Interfaces;
using Application.DTOs;
using Application.Mappers;


namespace Application.UseCases.Mobilhomes.GetMobilhomeDetailById;

public class GetMobilhomeDetailByIdHandler
{
    private readonly IMobilhomeRepository _repository;

    public GetMobilhomeDetailByIdHandler(IMobilhomeRepository repository)
    {
        _repository = repository;
    }

    public async Task<MobilhomeDetailsDto> Handle(GetMobilhomeDetailByIdCommand command, uint ownerId)
    {
        var mobilhome = await _repository.GetByIdAsync(command.MobilhomeId);

        if (mobilhome == null)
            throw new Exception("Mobilhome not found");

        if (mobilhome.OwnerId != ownerId)
            throw new UnauthorizedAccessException();

        return MobilhomeDetailsDtoMapper.ToDto(mobilhome);

    }
}
using Application.Interfaces;
using Application.DTOs;
using Application.Mappers;

namespace Application.UseCases.Mobilhomes.GetMobilhomesByOwner;

public class GetMobilhomesByOwnerHandler
{
    private readonly IMobilhomeRepository _repository;

    public GetMobilhomesByOwnerHandler(IMobilhomeRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<MobilhomeDto>> Handle(GetMobilhomesByOwnerQuery query)
    {
        var mobilhomes = await _repository.GetByOwnerIdAsync(query.OwnerId);

        return mobilhomes.Select(MobilhomeDtoMapper.ToDto).ToList();

    }
}
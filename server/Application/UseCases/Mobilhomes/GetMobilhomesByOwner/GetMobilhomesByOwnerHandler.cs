using Application.Interfaces;
using Application.DTOs;
using Application.UseCases.Mobilhomes.GetMobilhomesByOwner;

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

        return mobilhomes.Select(m => new MobilhomeDto
        {
            Id = m.Id,
            Name = m.Name,
            Manager = new ManagerDto
            {
                Id = m.Manager.Id,
                Name = m.Manager.Name,
                Firstname = m.Manager.Firstname,
                Email = m.Manager.Email,
                Telephone = m.Manager.Telephone
            }

        }).ToList();
    }
}
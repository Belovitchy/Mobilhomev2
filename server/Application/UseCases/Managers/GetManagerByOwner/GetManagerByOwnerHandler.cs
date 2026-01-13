
using Application.DTOs;
using Application.UseCases.Managers.GetManagersByOwner;
using Application.Interfaces;

namespace Application.UseCases.Managers.GetManagersByOwner;

public class GetManagersByOwnerHandler
{
    private readonly IManagerRepository _repository;

    public GetManagersByOwnerHandler(IManagerRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<ManagerDto>> Handle(GetManagersByOwnerQuery query)
    {
        var managers = await _repository.GetByOwnerIdAsync(query.OwnerId);

        return managers.Select(m => new ManagerDto
        {
            Id = m.Id,
            Name = m.Name,
        }).ToList();
    }
}
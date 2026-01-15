using ManagerEntity = Domain.Entities.Manager;
using ManagerModel = Infrastructure.Persistence.Models.Manager;


namespace Infrastructure.Mappers;

public static class ManagerMapper
{
    public static ManagerEntity ToEntity(ManagerModel model)
    {
        return new ManagerEntity
        {
            Id = model.Id,
            Name = model.Name,
            Firstname = model.Firstname,
            Email = model.Email,
            Telephone = model.Telephone
        };
    }
}


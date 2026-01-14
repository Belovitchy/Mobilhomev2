using OwnerEntity = Domain.Entities.Owner;
using OwnerModel = Infrastructure.Persistence.Models.Owner;

namespace Infrastructure.Persistence.Mappers;

public static class OwnerMapper
{
    public static OwnerEntity ToEntity(OwnerModel model)
    {
        return new OwnerEntity
        {
            Id = model.Id,
            Name = model.Name,
            Email = model.Email,
            Password = model.Password,
            IsAdmin = model.IsAdmin
        };
    }

    public static OwnerModel ToModel(OwnerEntity entity)
    {
        return new OwnerModel
        {
            Id = entity.Id,
            Name = entity.Name,
            Email = entity.Email,
            Password = entity.Password,
            IsAdmin = entity.IsAdmin
        };
    }
}

using OwnerEntity = Domain.Entities.Owner;
using LinkEntity = Domain.Entities.Link;
using OwnerModel = Infrastructure.Persistence.Models.Owner;

namespace Infrastructure.Mappers;

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
            IsAdmin = model.IsAdmin,
            Links = model.Links
                .Select(l => new LinkEntity
                {
                    Id = l.Id,
                    Name = l.Name,
                    Url = l.Url,
                    OwnerId = l.OwnerId
                })
                .ToList()
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

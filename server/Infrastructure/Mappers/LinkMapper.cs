using LinkEntity = Domain.Entities.Link;
using LinkModel = Infrastructure.Persistence.Models.Link;

namespace Infrastructure.Mappers;

public static class LinkMapper
{
    public static LinkEntity ToEntity(LinkModel model)
    {
        return new LinkEntity
        {
            Id = model.Id,
            Name = model.Name,
            Url = model.Url,
            OwnerId = model.OwnerId
        };
    }

    public static LinkModel ToModel(LinkEntity entity)
    {
        return new LinkModel
        {
            Id = entity.Id,
            Name = entity.Name,
            Url = entity.Url,
            OwnerId = entity.OwnerId
        };
    }
}


using MobilhomeModel = Infrastructure.Persistence.Models.Mobilhome;
using MobilhomeEntity = Domain.Entities.Mobilhome;
using ManagerEntity = Domain.Entities.Manager;

namespace Infrastructure.Mappers;

public static class MobilhomeMapper
{
    public static MobilhomeEntity ToEntity(MobilhomeModel model)
    {
        return new MobilhomeEntity
        {
            Id = model.Id,
            Name = model.Name,
            OwnerId = model.OwnerId,
            ManagerId = model.ManagerId,
            IcalLink = model.IcalLink,

            Manager = model.Manager == null ? null! : new ManagerEntity
            {
                Id = model.Manager.Id,
                Name = model.Manager.Name,
                Firstname = model.Manager.Firstname,
                Email = model.Manager.Email,
                Telephone = model.Manager.Telephone
            }
        };
    }
    public static MobilhomeModel ToModel(MobilhomeEntity entity)
    {
        return new MobilhomeModel
        {
            Id = entity.Id,
            Name = entity.Name,
            OwnerId = entity.OwnerId,
            ManagerId = entity.ManagerId,
            IcalLink = entity.IcalLink
        };
    }
}

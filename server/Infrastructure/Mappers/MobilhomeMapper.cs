
using MobilhomeModel = Infrastructure.Persistence.Models.Mobilhome;
using MobilhomeEntity = Domain.Entities.Mobilhome;
using ManagerEntity = Domain.Entities.Manager;
using ReservationEntity = Domain.Entities.Reservation;
using VacationerEntity = Domain.Entities.Vacationer;

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
            },

            Reservations = model.Reservations
                .Select(r => new ReservationEntity
                {
                    Id = r.Id,
                    StartDate = r.StartDate,
                    EndDate = r.EndDate,
                    MobilhomeId = r.MobilhomeId,
                    Comment = r.Comment,
                    Color = r.Color,
                    NumberPerson = r.NumberPerson,
                    Funpass = r.Funpass,
                    Email = r.Email,
                    Immat = r.Immat,
                    SibluResa = r.SibluResa,
                    Phone = r.Phone,

                    Vacationers = r.Vacationers
                        .Select(v => new VacationerEntity
                        {
                            Id = v.Id,
                            Name = v.Name,
                            Firstname = v.Firstname,
                            Age = v.Age
                        })
                        .ToList()
                })
                .ToList()
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

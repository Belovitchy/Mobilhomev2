using ReservationEntity = Domain.Entities.Reservation;
using ReservationModel = Infrastructure.Persistence.Models.Reservation;

namespace Infrastructure.Mappers;

public static class ReservationMapper
{
    public static ReservationModel ToModel(ReservationEntity entity)
    {
        return new ReservationModel
        {
            Id = entity.Id,
            Name = entity.Name,
            StartDate = entity.StartDate,
            EndDate = entity.EndDate,
            MobilhomeId = entity.MobilhomeId,
            Comment = entity.Comment,
            Color = entity.Color,
            NumberPerson = entity.NumberPerson,
            Funpass = entity.Funpass,
            Email = entity.Email,
            Phone = entity.Phone,
            Immat = entity.Immat,
            SibluResa = entity.SibluResa
        };
    }

    public static ReservationEntity ToEntity(ReservationModel model)
    {
        return new ReservationEntity
        {
            Id = model.Id,
            Name = model.Name,
            StartDate = model.StartDate,
            EndDate = model.EndDate,
            MobilhomeId = model.MobilhomeId,
            Comment = model.Comment,
            Color = model.Color,
            NumberPerson = model.NumberPerson,
            Funpass = model.Funpass,
            Email = model.Email,
            Phone = model.Phone,
            Immat = model.Immat,
            SibluResa = model.SibluResa,
            Vacationers = model.Vacationers.Select(v => VacationerMapper.ToEntity(v)).ToList()
        };

    }
}
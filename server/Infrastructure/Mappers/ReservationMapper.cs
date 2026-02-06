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
}
using Application.DTOs;
using Domain.Entities;

namespace Application.Mappers;

public static class ReservationDtoMapper
{
    public static ReservationDto ToDto(Reservation reservation)
    {
        return new ReservationDto
        {
            Id = reservation.Id,
            Name = reservation.Name,
            StartDate = reservation.StartDate,
            EndDate = reservation.EndDate,
            Comment = reservation.Comment,
            Color = reservation.Color,
            NumberPerson = reservation.NumberPerson,
            Email = reservation.Email,
            Phone = reservation.Phone,
            Immat = reservation.Immat,
            SibluResa = reservation.SibluResa,
            Funpass = reservation.Funpass,
            MobilhomeId = reservation.MobilhomeId

        };
    }
}

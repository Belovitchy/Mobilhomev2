using Application.DTOs; // si tu mets tes DTOs là
using Domain.Entities;

namespace Application.Mappers;

public static class MobilhomeDetailsDtoMapper
{
    public static MobilhomeDetailsDto ToDto(Mobilhome mobilhome)
    {
        return new MobilhomeDetailsDto
        {
            Id = mobilhome.Id,
            Name = mobilhome.Name,
            IcalLink = mobilhome.IcalLink,
            Manager = new ManagerDto
            {
                Id = mobilhome.Manager.Id,
                Name = mobilhome.Manager.Name,
                Firstname = mobilhome.Manager.Firstname,
                Email = mobilhome.Manager.Email,
                Telephone = mobilhome.Manager.Telephone
            },

            Reservations = mobilhome.Reservations
                .OrderBy(r => r.StartDate)
                .Select(ToDto)
                .ToList()
        };
    }

    private static ReservationDetailsDto ToDto(Reservation reservation)
    {
        return new ReservationDetailsDto
        {
            Id = reservation.Id,
            StartDate = reservation.StartDate,
            EndDate = reservation.EndDate,
            Comment = reservation.Comment,
            Color = reservation.Color,
            NumberPerson = reservation.NumberPerson,
            Email = reservation.Email,
            Phone = reservation.Phone,

            Vacationers = reservation.Vacationers
                .Select(ToDto)
                .ToList()
        };
    }

    private static VacationerDto ToDto(Vacationer vacationer)
    {
        return new VacationerDto
        {
            Id = vacationer.Id,
            Name = vacationer.Name,
            Firstname = vacationer.Firstname,
            Age = vacationer.Age
        };
    }
}

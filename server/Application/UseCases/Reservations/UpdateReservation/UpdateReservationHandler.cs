using Application.Interfaces;
using Domain.Entities;

namespace Application.UseCases.Reservations.UpdateReservation;

public class UpdateReservationHandler
{
    private readonly IReservationRepository _reservationRepository;

    public UpdateReservationHandler(IReservationRepository reservationRepository)
    {
        _reservationRepository = reservationRepository;
    }

    public async Task<Reservation> Handle(UpdateReservationCommand command, uint ownerId, uint mobilhomeId, uint reservationId)
    {
        var reservation = await _reservationRepository.GetByIdAsync(reservationId);

        if (reservation == null)
        {
            throw new Exception("Reservation not found");
        }

        Console.WriteLine(reservation.MobilhomeId);
        Console.WriteLine(mobilhomeId);


        if (reservation.MobilhomeId != mobilhomeId)
        {
            throw new UnauthorizedAccessException();
        }

        reservation.Name = command.Name;
        reservation.StartDate = command.StartDate;
        reservation.EndDate = command.EndDate;
        reservation.Color = command.Color;
        reservation.Comment = command.Comment;
        reservation.NumberPerson = command.NumberPerson;
        reservation.Funpass = command.Funpass;
        reservation.Email = command.Email;
        reservation.Phone = command.Phone;
        reservation.Immat = command.Immat;
        reservation.SibluResa = command.SibluResa;

        await _reservationRepository.UpdateAsync(reservation);

        return reservation;
    }
}

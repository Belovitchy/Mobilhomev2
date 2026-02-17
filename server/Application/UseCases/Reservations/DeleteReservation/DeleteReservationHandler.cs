using Application.Interfaces;


namespace Application.UseCases.Reservations.DeleteReservation;

public class DeleteReservationHandler
{
    private readonly IReservationRepository _reservationRepository;

    public DeleteReservationHandler(IReservationRepository reservationRepository)
    {
        _reservationRepository = reservationRepository;
    }

    public async Task Handle(uint ownerId, uint mobilhomeId, uint resaId)
    {
        var reservation = await _reservationRepository.GetByIdAsync(resaId);

        if (reservation == null)
        {
            throw new Exception("Reservation not found");
        }

        if (reservation.MobilhomeId != mobilhomeId)
        {
            throw new UnauthorizedAccessException();
        }

        await _reservationRepository.DeleteAsync(resaId);

    }
}
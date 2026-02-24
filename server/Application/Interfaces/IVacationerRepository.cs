using Domain.Entities;


namespace Application.Interfaces;

public interface IVacationerRepository
{
    Task AddToReservationAsync(uint reservationId, Vacationer vacationer);

}
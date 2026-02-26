using Domain.Entities;


namespace Application.Interfaces;

public interface IVacationerRepository
{
    Task<Vacationer> AddToReservationAsync(uint reservationId, Vacationer vacationer);
    Task UpdateVacationerAsync(uint vacationerId, Vacationer vacationer);
    Task<Vacationer?> GetByIdAsync(uint vacationerId);
}




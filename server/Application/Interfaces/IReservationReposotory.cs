using Domain.Entities;


namespace Application.Interfaces;

public interface IReservationRepository
{
    Task<Reservation> AddAsync(Reservation reservation);
    Task<Reservation?> GetByIdAsync(uint id);
    Task DeleteAsync(uint id);
    Task UpdateAsync(Reservation reservation);
}
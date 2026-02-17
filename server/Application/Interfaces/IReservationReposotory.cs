using Domain.Entities;


namespace Application.Interfaces;

public interface IReservationRepository
{
    Task<Reservation> AddAsync(Reservation reservation);

}
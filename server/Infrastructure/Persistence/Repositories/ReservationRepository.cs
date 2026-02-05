using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Mappers;


namespace Infrastructure.Persistence.Repositories;

public class ReservationRepository : IReservationRepository
{
    private readonly MobilhomeDbContext _db;

    public ReservationRepository(MobilhomeDbContext db)
    {
        _db = db;
    }

    public async Task<Reservation> AddAsync(Reservation reservation)
    {
        var model = ReservationMapper.ToModel(reservation);

        _db.Reservations.Add(model);
        await _db.SaveChangesAsync();

        // récupérer l'ID généré
        reservation.Id = model.Id;

        return reservation;
    }
}
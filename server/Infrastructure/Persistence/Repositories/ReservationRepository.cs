using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Mappers;
using Microsoft.EntityFrameworkCore;


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

    public async Task<Reservation?> GetByIdAsync(uint id)
    {
        var model = await _db.Reservations.FirstOrDefaultAsync(r => r.Id == id);

        if (model == null) return null;

        return ReservationMapper.ToEntity(model);
    }

    public async Task DeleteAsync(uint id)
    {
        var model = await _db.Reservations.FindAsync(id);

        if (model == null) return;
        _db.Reservations.Remove(model);
        await _db.SaveChangesAsync();
    }

}

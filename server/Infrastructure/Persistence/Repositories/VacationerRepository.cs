using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class VacationerRepository : IVacationerRepository
{
    private readonly MobilhomeDbContext _db;

    public VacationerRepository(MobilhomeDbContext db)
    {
        _db = db;
    }

    public async Task AddToReservationAsync(uint reservationId, Vacationer vacationer)
    {
        var reservation = await _db.Reservations
        .Include(r => r.Vacationers)
        .FirstAsync(r => r.Id == reservationId);

        var model = VacationerMapper.ToModel(vacationer);

        reservation.Vacationers.Add(model);

        await _db.SaveChangesAsync();
    }
}
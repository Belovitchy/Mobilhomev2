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

    public async Task<Vacationer?> GetByIdAsync(uint vacationerId)
    {
        var vacationer = await _db.Vacationers
        .FirstOrDefaultAsync(v => v.Id == vacationerId);

        if (vacationer == null) return null;

        return VacationerMapper.ToEntity(vacationer);
    }

    public async Task<Vacationer> AddToReservationAsync(uint reservationId, Vacationer vacationer)
    {
        var reservation = await _db.Reservations
        .Include(r => r.Vacationers)
        .FirstAsync(r => r.Id == reservationId);

        var model = VacationerMapper.ToModel(vacationer);

        reservation.Vacationers.Add(model);

        await _db.SaveChangesAsync();

        return VacationerMapper.ToEntity(model);
    }
    public async Task UpdateVacationerAsync(uint vacationerId, Vacationer vacationer)
    {
        var model = await _db.Vacationers.FirstOrDefaultAsync(v => v.Id == vacationerId);

        if (model == null) return;

        model.Name = vacationer.Name;
        model.Firstname = vacationer.Firstname;
        model.Age = vacationer.Age;

        await _db.SaveChangesAsync();
    }
}

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
        var model = await _db.Reservations
        .Include(r => r.Vacationers)
        .FirstOrDefaultAsync(r => r.Id == id);

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

    public async Task UpdateAsync(Reservation reservation)
    {
        var model = await _db.Reservations.FirstOrDefaultAsync(r => r.Id == reservation.Id);

        if (model == null) return;

        model.Name = reservation.Name;
        model.StartDate = reservation.StartDate;
        model.EndDate = reservation.EndDate;
        model.Color = reservation.Color;
        model.Comment = reservation.Comment;
        model.NumberPerson = reservation.NumberPerson;
        model.Funpass = reservation.Funpass;
        model.Email = reservation.Email;
        model.Phone = reservation.Phone;
        model.Immat = reservation.Immat;
        model.SibluResa = reservation.SibluResa;

        await _db.SaveChangesAsync();
    }
}

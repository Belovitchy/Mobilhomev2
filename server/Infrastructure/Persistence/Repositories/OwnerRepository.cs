using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class OwnerRepository : IOwnerRepository
{
    private readonly MobilhomeDbContext _db;

    public OwnerRepository(MobilhomeDbContext db)
    {
        _db = db;
    }

    public async Task<Owner?> GetByIdAsync(uint id)
    {
        var model = await _db.Owners
        .Include(o => o.Links)
        .FirstOrDefaultAsync(o => o.Id == id);

        if (model == null) return null;

        return OwnerMapper.ToEntity(model);
    }

    public async Task<Owner?> GetByEmailAsync(string email)
    {
        var model = await _db.Owners
        .Include(o => o.Links)
        .FirstOrDefaultAsync(o => o.Email == email);

        if (model == null) return null;

        return OwnerMapper.ToEntity(model);
    }

    public async Task AddAsync(Owner owner)
    {
        var model = OwnerMapper.ToModel(owner);

        _db.Owners.Add(model);
        await _db.SaveChangesAsync();

        // Optionnel : récupérer l’ID généré par MySQL
        owner.Id = model.Id;
    }

    public async Task UpdateAsync(Owner owner)
    {
        Console.WriteLine($"UPDATE OWNER {owner.Id} → {owner.Email}");

        var model = await _db.Owners.FirstOrDefaultAsync(o => o.Id == owner.Id);

        if (model == null)
        {
            throw new Exception("Owner not found");
        }

        model.Email = owner.Email;
        model.Name = owner.Name;
        model.Password = owner.Password;
        model.IsAdmin = owner.IsAdmin;

        var changes = await _db.SaveChangesAsync();
        Console.WriteLine($"Rows affected: {changes}");
    }

}

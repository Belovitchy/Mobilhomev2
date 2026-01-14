using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Infrastructure.Mappers;
using Microsoft.EntityFrameworkCore;

public class MobilhomeRepository : IMobilhomeRepository
{
    private readonly MobilhomeDbContext _db;

    public MobilhomeRepository(MobilhomeDbContext db)
    {
        _db = db;
    }

    public async Task<List<Mobilhome>> GetByOwnerIdAsync(uint ownerId)
    {
        var models = await _db.Mobilhomes
            .Include(m => m.Manager)
            .Where(m => m.OwnerId == ownerId)
            .ToListAsync();

        return models.Select(MobilhomeMapper.ToEntity).ToList();
    }

    public async Task AddAsync(Mobilhome mobilhome)
    {
        var model = MobilhomeMapper.ToModel(mobilhome);

        _db.Mobilhomes.Add(model);
        await _db.SaveChangesAsync();

        // Optionnel : récupérer l’ID généré par MySQL
        mobilhome.Id = model.Id;
    }
}

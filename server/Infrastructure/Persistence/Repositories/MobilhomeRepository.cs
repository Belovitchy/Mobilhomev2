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

    //tous les mobilhomes pour un proprio
    public async Task<List<Mobilhome>> GetByOwnerIdAsync(uint ownerId)
    {
        var models = await _db.Mobilhomes
            .Include(m => m.Manager)
            .Where(m => m.OwnerId == ownerId)
            .ToListAsync();

        return models.Select(MobilhomeMapper.ToEntity).ToList();
    }

    //get mobilhome by id
    public async Task<Mobilhome?> GetByIdAsync(uint mobilhomeId)
    {
        var model = await _db.Mobilhomes
            .Include(m => m.Manager)
            .FirstOrDefaultAsync(m => m.Id == mobilhomeId);

        if (model == null) return null;

        return MobilhomeMapper.ToEntity(model);
    }


    //ajout d'un nouveau mobilhome
    public async Task<Mobilhome> AddAsync(Mobilhome mobilhome)
    {
        var model = MobilhomeMapper.ToModel(mobilhome);

        _db.Mobilhomes.Add(model);
        await _db.SaveChangesAsync();

        //reload avec manager
        await _db.Entry(model)
        .Reference(m => m.Manager)
        .LoadAsync();

        return MobilhomeMapper.ToEntity(model);
    }

    public async Task UpdateAsync(Mobilhome mobilhome)
    {
        var model = await _db.Mobilhomes.FirstOrDefaultAsync(m => m.Id == mobilhome.Id);

        if (model == null) return;

        model.Name = mobilhome.Name;
        model.ManagerId = mobilhome.ManagerId;
        model.IcalLink = mobilhome.IcalLink;

        await _db.SaveChangesAsync();
    }

    public async Task DeleteAsync(uint mobilhomeId)
    {
        var model = await _db.Mobilhomes.FindAsync(mobilhomeId);

        if (model == null) return;
        _db.Mobilhomes.Remove(model);
        await _db.SaveChangesAsync();
    }

}

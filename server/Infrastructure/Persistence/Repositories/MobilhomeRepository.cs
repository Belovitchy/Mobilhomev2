using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class MobilhomeRepository : IMobilhomeRepository
{
    private readonly MobilhomeDbContext _db;

    public MobilhomeRepository(MobilhomeDbContext db)
    {
        _db = db;
    }

    public async Task<List<Mobilhome>> GetByOwnerIdAsync(uint ownerId)
    {
        return await _db.Mobilhomes
            .Include(m => m.Manager)
            .Where(m => m.OwnerId == ownerId)
            .ToListAsync();
    }
}

using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class ManagerRepository : IManagerRepository
{
    private readonly MobilhomeDbContext _db;

    public ManagerRepository(MobilhomeDbContext db)
    {
        _db = db;
    }
    public async Task<List<Manager>> GetByOwnerIdAsync(uint ownerId)
    {
        return await _db.Managers
            .Where(m => m.Owners.Any(o => o.Id == ownerId))
            .ToListAsync();
    }
}
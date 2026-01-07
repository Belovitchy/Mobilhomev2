using Application.Interfaces;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence.Repositories;

public class OwnerRepository : IOwnerRepository
{
    private readonly MobilhomeDbContext _db;

    public OwnerRepository(MobilhomeDbContext db)
    {
        _db = db;
    }

    public async Task<Owner?> GetByIdAsync(int id)
    {
        var entity = await _db.Owners.FirstOrDefaultAsync(o => o.Id == id);

        if (entity == null) return null;

        return new Owner
        {
            Id = (int)entity.Id,
            Name = entity.Name,
            Email = entity.Email
        };
    }
}

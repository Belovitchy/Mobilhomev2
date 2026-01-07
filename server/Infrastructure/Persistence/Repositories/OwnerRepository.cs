using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

public class OwnerRepository : IOwnerRepository
{
    private readonly MobilhomeDbContext _db;

    public OwnerRepository(MobilhomeDbContext db)
    {
        _db = db;
    }

    public Task<Owner?> GetByIdAsync(int id)
    {
        return _db.Owners.FirstOrDefaultAsync(o => o.Id == id);
    }
}


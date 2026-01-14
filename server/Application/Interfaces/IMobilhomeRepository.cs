using Domain.Entities;

namespace Application.Interfaces;

public interface IMobilhomeRepository
{
    Task<List<Mobilhome>> GetByOwnerIdAsync(uint ownerId);
    Task AddAsync(Mobilhome mobilhome);
}



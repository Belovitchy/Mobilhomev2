using Domain.Entities;

namespace Application.Interfaces;

public interface IMobilhomeRepository
{
    Task<List<Mobilhome>> GetByOwnerIdAsync(uint ownerId);
    Task<Mobilhome> AddAsync(Mobilhome mobilhome);
}



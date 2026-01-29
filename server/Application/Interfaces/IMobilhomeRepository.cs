using Domain.Entities;

namespace Application.Interfaces;

public interface IMobilhomeRepository
{
    Task<List<Mobilhome>> GetByOwnerIdAsync(uint ownerId);
    Task<Mobilhome> AddAsync(Mobilhome mobilhome);
    Task<Mobilhome?> GetByIdAsync(uint mobilhomeId);
    Task UpdateAsync(Mobilhome mobilhome);
    Task DeleteAsync(uint mobilhomeId);
}



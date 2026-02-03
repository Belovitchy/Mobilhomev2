using Domain.Entities;

namespace Application.Interfaces;

public interface IOwnerRepository
{
    Task<Owner?> GetByIdAsync(uint id);
    Task<Owner?> GetByEmailAsync(string email);
    Task<Owner> AddAsync(Owner owner);
    Task UpdateAsync(Owner owner);
    Task<List<Owner>> GetAllAsync();
    Task DeleteAsync(uint ownerId);
}

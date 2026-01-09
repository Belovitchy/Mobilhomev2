using Domain.Entities;

namespace Application.Interfaces;

public interface IOwnerRepository
{
    Task<Owner?> GetByIdAsync(uint id);
    Task<Owner?> GetByEmailAsync(string email);
    Task AddAsync(Owner owner);
}

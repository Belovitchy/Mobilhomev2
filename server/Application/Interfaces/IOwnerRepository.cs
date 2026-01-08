using Domain.Entities;

namespace Application.Interfaces;

public interface IOwnerRepository
{
    Task<Owner?> GetByIdAsync(uint id);
}

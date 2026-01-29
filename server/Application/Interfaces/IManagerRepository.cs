using Domain.Entities;

namespace Application.Interfaces;

public interface IManagerRepository
{
    Task<List<Manager>> GetByOwnerIdAsync(uint ownerId);
}


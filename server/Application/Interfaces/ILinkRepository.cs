using Domain.Entities;


namespace Application.Interfaces;

public interface ILinkRepository
{
    Task<Link> AddAsync(Link link);
    Task<Link?> GetByIdAsync(uint linkId);
    Task DeleteAsync(uint linkId);
    Task UpdateAsync(Link link);

}



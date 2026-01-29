using Domain.Entities;


namespace Application.Interfaces;

public interface ILinkRepository
{
    Task<Link> AddAsync(Link link);
}
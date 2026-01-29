using Application.Interfaces;
using Domain.Entities;
using Infrastructure.Persistence;
using Infrastructure.Mappers;
using Microsoft.EntityFrameworkCore;

namespace Application.Interfaces;


public class linkRepository : ILinkRepository
{
    private readonly MobilhomeDbContext _db;

    public linkRepository(MobilhomeDbContext db)
    {
        _db = db;
    }

    public async Task<Link> AddAsync(Link link)
    {
        var model = LinkMapper.ToModel(link);

        _db.Links.Add(model);
        await _db.SaveChangesAsync();

        return LinkMapper.ToEntity(model);
    }
}


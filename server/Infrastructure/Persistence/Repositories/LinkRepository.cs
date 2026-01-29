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

    public async Task<Link?> GetByIdAsync(uint linkId)
    {
        var model = await _db.Links.FirstOrDefaultAsync(l => l.Id == linkId);

        if (model == null) return null;

        return LinkMapper.ToEntity(model);
    }


    public async Task<Link> AddAsync(Link link)
    {
        var model = LinkMapper.ToModel(link);

        _db.Links.Add(model);
        await _db.SaveChangesAsync();

        return LinkMapper.ToEntity(model);
    }

    public async Task DeleteAsync(uint linkId)
    {
        var model = await _db.Links.FindAsync(linkId);

        if (model == null) return;
        _db.Links.Remove(model);
        await _db.SaveChangesAsync();
    }

    public async Task UpdateAsync(Link link)
    {
        var model = await _db.Links.FirstOrDefaultAsync(l => l.Id == link.Id);

        if (model == null) return;

        model.Name = link.Name;
        model.Url = link.Url;

        await _db.SaveChangesAsync();

    }

}
using Application.Interfaces;
using Domain.Entities;

namespace Application.UseCases.Links.AddLink;

public class AddLinkHandler
{
    private readonly ILinkRepository _linkRepository;

    public AddLinkHandler(ILinkRepository linkRepository)
    {
        _linkRepository = linkRepository;
    }

    public async Task<Link> Handle(AddLinkCommand command, uint ownerId)
    {
        var link = new Link
        {
            Name = command.Name,
            Url = command.Url,
            OwnerId = ownerId
        };

        return await _linkRepository.AddAsync(link);
    }
}


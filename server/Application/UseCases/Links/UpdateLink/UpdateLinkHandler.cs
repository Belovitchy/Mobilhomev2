using Application.Interfaces;
using Domain.Entities;


namespace Application.UseCases.Links.UpdateLink;

public class UpdateLinkHandler
{
    private readonly ILinkRepository _linkRepository;

    public UpdateLinkHandler(ILinkRepository linkRepository)
    {
        _linkRepository = linkRepository;
    }

    public async Task<Link> Handle(UpdateLinkCommand command, uint ownerId, uint linkId)
    {
        var link = await _linkRepository.GetByIdAsync(linkId);

        if (link == null)
        {
            throw new Exception("Link not found");
        }

        link.Name = command.Name;
        link.Url = command.Url;

        await _linkRepository.UpdateAsync(link);

        return link;
    }
}
using Application.Interfaces;


namespace Application.UseCases.Links.DeleteLink;

public class DeleteLinkHandler
{
    private readonly ILinkRepository _linkRepository;

    public DeleteLinkHandler(ILinkRepository linkRepository)
    {
        _linkRepository = linkRepository;
    }

    public async Task Handle(uint linkId, uint ownerId)
    {
        var link = await _linkRepository.GetByIdAsync(linkId);

        if (link == null)
        {
            throw new Exception("Link not found");
        }

        if (link.OwnerId != ownerId)
        {
            throw new UnauthorizedAccessException();
        }

        await _linkRepository.DeleteAsync(linkId);

    }

}

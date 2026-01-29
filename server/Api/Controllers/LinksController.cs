using Microsoft.AspNetCore.Mvc;
using Application.UseCases.Links.AddLink;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Application.Mappers;



[ApiController]
[Route("api/owners/{ownerId}/links")]
public class LinksController : ControllerBase
{
    private readonly AddLinkHandler _addLinkHandler;

    public LinksController(AddLinkHandler addLinkHandler)
    {
        _addLinkHandler = addLinkHandler;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Add(uint ownerId, [FromBody] AddLinkCommand command)
    {
        var ownerIdByToken = uint.Parse(
          User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        if (ownerId != ownerIdByToken)
            return Forbid();

        var createdLink = await _addLinkHandler.Handle(command, ownerIdByToken);

        var dto = LinkDtoMapper.ToDto(createdLink);


        return CreatedAtAction(
            nameof(Add),
            new { ownerId },
            dto
        );
    }
}
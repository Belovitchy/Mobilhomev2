using Microsoft.AspNetCore.Mvc;
using Application.UseCases.Links.AddLink;
using Application.UseCases.Links.DeleteLink;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Application.Mappers;
using Application.UseCases.Links.UpdateLink;


[ApiController]
[Route("api/owners/{ownerId}/links")]
public class LinksController : ControllerBase
{
    private readonly AddLinkHandler _addLinkHandler;
    private readonly DeleteLinkHandler _deleteLinkHandler;

    private readonly UpdateLinkHandler _updateLinkHandler;


    public LinksController(AddLinkHandler addLinkHandler, DeleteLinkHandler deleteLinkHandler, UpdateLinkHandler updateLinkHandler)
    {
        _addLinkHandler = addLinkHandler;
        _deleteLinkHandler = deleteLinkHandler;
        _updateLinkHandler = updateLinkHandler;
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

    [Authorize]
    [HttpDelete("{linkId:int}")]
    public async Task<IActionResult> Delete(uint ownerId, uint linkId)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (ownerId != ownerIdByToken)
            return Forbid();

        await _deleteLinkHandler.Handle(linkId, ownerIdByToken);


        return NoContent();
    }

    [Authorize]
    [HttpPut("{linkId:int}")]
    public async Task<IActionResult> Update(uint ownerId, uint linkId, [FromBody] UpdateLinkCommand command)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (ownerId != ownerIdByToken)
            return Forbid();

        var updatedLink = await _updateLinkHandler.Handle(command, ownerIdByToken, linkId);

        return Ok(LinkDtoMapper.ToDto(updatedLink));
    }

}


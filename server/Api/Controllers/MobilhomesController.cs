using Application.UseCases.Mobilhomes.GetMobilhomesByOwner;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.UseCases.Mobilhomes.AddMobilhome;
using System.Security.Claims;


[ApiController]
[Route("api/owners/{ownerId}/mobilhomes")]
public class MobilhomesController : ControllerBase
{
    private readonly GetMobilhomesByOwnerHandler _handler;
    private readonly AddMobilhomeHandler _addMobilhomeHandler;


    public MobilhomesController(
        AddMobilhomeHandler addMobilhomeHandler,
        GetMobilhomesByOwnerHandler handler)
    {
        _handler = handler;
        _addMobilhomeHandler = addMobilhomeHandler;
    }

    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetByOwner(uint ownerId)
    {
        var ownerIdByToken = uint.Parse(
          User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        if (ownerId != ownerIdByToken)
            return Forbid();

        var result = await _handler.Handle(
            new GetMobilhomesByOwnerQuery(ownerId)
        );

        return Ok(result);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Add(uint ownerId, [FromBody] AddMobilhomeCommand command)
    {
        var ownerIdByToken = uint.Parse(
          User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        if (ownerId != ownerIdByToken)
            return Forbid();

        await _addMobilhomeHandler.Handle(command, ownerIdByToken);
        return Ok();
    }
}

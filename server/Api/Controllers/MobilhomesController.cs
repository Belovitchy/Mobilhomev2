using Application.UseCases.Mobilhomes.GetMobilhomesByOwner;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.UseCases.Mobilhomes.AddMobilhome;
using System.Security.Claims;
using Application.UseCases.Mobilhomes.UpdateMobilhome;
using Application.UseCases.Mobilhomes.DeleteMobilhome;
using Application.Mappers;

[ApiController]
[Route("api/owners/{ownerId}/mobilhomes")]
public class MobilhomesController : ControllerBase
{
    private readonly GetMobilhomesByOwnerHandler _handler;
    private readonly AddMobilhomeHandler _addMobilhomeHandler;
    private readonly UpdateMobilhomeHandler _updateMobilhomeHandler;
    private readonly DeleteMobilhomeHandler _deleteMobilhomeHandler;


    public MobilhomesController(
        AddMobilhomeHandler addMobilhomeHandler,
        GetMobilhomesByOwnerHandler handler,
        UpdateMobilhomeHandler updateMobilhomeHandler,
        DeleteMobilhomeHandler deleteMobilhomeHandler
    )
    {
        _handler = handler;
        _addMobilhomeHandler = addMobilhomeHandler;
        _updateMobilhomeHandler = updateMobilhomeHandler;
        _deleteMobilhomeHandler = deleteMobilhomeHandler;
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

        var createdMobilhome = await _addMobilhomeHandler.Handle(command, ownerIdByToken);

        var dto = MobilhomeDtoMapper.ToDto(createdMobilhome);


        return CreatedAtAction(
            nameof(GetByOwner),
            new { ownerId },
            dto
        );
    }

    [Authorize]
    [HttpPut("{mobilhomeId:int}")]
    public async Task<IActionResult> Update(uint ownerId, uint mobilhomeId, [FromBody] UpdateMobilhomeCommand command)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (ownerId != ownerIdByToken)
            return Forbid();

        var updatedMobilhome = await _updateMobilhomeHandler.Handle(command, ownerIdByToken, mobilhomeId);

        return Ok(MobilhomeDtoMapper.ToDto(updatedMobilhome));
    }

    [Authorize]
    [HttpDelete("{mobilhomeId:int}")]
    public async Task<IActionResult> Delete(uint ownerId, uint mobilhomeId)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (ownerId != ownerIdByToken)
            return Forbid();

        await _deleteMobilhomeHandler.Handle(mobilhomeId, ownerIdByToken);


        return NoContent();
    }

}

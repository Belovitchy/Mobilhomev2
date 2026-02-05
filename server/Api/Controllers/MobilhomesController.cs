using Application.UseCases.Mobilhomes.GetMobilhomesByOwner;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.UseCases.Mobilhomes.AddMobilhome;
using System.Security.Claims;
using Application.UseCases.Mobilhomes.UpdateMobilhome;
using Application.UseCases.Mobilhomes.DeleteMobilhome;
using Application.UseCases.Mobilhomes.GetMobilhomeDetailById;
using Application.Mappers;

[ApiController]
[Route("api/owners/{ownerId}/mobilhomes")]
public class MobilhomesController : ControllerBase
{
    private readonly GetMobilhomesByOwnerHandler _getMobilhomesByOwnerHandler;
    private readonly AddMobilhomeHandler _addMobilhomeHandler;
    private readonly UpdateMobilhomeHandler _updateMobilhomeHandler;
    private readonly DeleteMobilhomeHandler _deleteMobilhomeHandler;
    private readonly GetMobilhomeDetailByIdHandler _getMobilhomeDetailByIdHandler;



    public MobilhomesController(
        AddMobilhomeHandler addMobilhomeHandler,
        GetMobilhomesByOwnerHandler getMobilhomesByOwnerHandler,
        UpdateMobilhomeHandler updateMobilhomeHandler,
        DeleteMobilhomeHandler deleteMobilhomeHandler,
        GetMobilhomeDetailByIdHandler getMobilhomeDetailByIdHandler
    )
    {
        _getMobilhomesByOwnerHandler = getMobilhomesByOwnerHandler;
        _addMobilhomeHandler = addMobilhomeHandler;
        _updateMobilhomeHandler = updateMobilhomeHandler;
        _deleteMobilhomeHandler = deleteMobilhomeHandler;
        _getMobilhomeDetailByIdHandler = getMobilhomeDetailByIdHandler;
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

        var result = await _getMobilhomesByOwnerHandler.Handle(
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

    [Authorize]
    [HttpGet("{mobilhomeId:int}")]
    public async Task<IActionResult> GetById(uint ownerId, uint mobilhomeId)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (ownerId != ownerIdByToken)
            return Forbid();

        var dto = await _getMobilhomeDetailByIdHandler.Handle(new GetMobilhomeDetailByIdCommand(mobilhomeId), ownerIdByToken);

        return Ok(dto);
    }

}

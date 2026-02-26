using Microsoft.AspNetCore.Mvc;
using Application.UseCases.Vacationers.AddVacationers;
using Application.UseCases.Vacationers.UpdateVacationer;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Application.Mappers;
using Domain.Entities;


[ApiController]
[Route("api/owners/{ownerId}/mobilhomes/{mobilhomeId}/reservations/{reservationId}/vacationers")]
public class VacationersController : ControllerBase
{
    private readonly AddVacationersHandler _addVacationersHandler;
    private readonly UpdateVacationerHandler _updateVacationerHandler;



    public VacationersController(AddVacationersHandler addVacationersHandler, UpdateVacationerHandler updateVacationerHandler)
    {
        _addVacationersHandler = addVacationersHandler;
        _updateVacationerHandler = updateVacationerHandler;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Add(uint ownerId, uint mobilhomeId, uint reservationId, [FromBody] AddVacationersCommand command)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (ownerId != ownerIdByToken)
            return Forbid();

        var created = await _addVacationersHandler.Handle(ownerIdByToken, mobilhomeId, reservationId, command);


        return Ok(created);
    }

    [Authorize]
    [HttpPut("{vacationerId:int}")]
    public async Task<IActionResult> Update(uint ownerId, uint mobilhomeId, uint reservationId, uint vacationerId, [FromBody] UpdateVacationerCommand command)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (ownerId != ownerIdByToken)
            return Forbid();

        await _updateVacationerHandler.Handle(command, ownerIdByToken, mobilhomeId, vacationerId);

        return NoContent();
    }

}



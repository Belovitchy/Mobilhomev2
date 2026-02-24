using Microsoft.AspNetCore.Mvc;
using Application.UseCases.Vacationers.AddVacationers;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Application.Mappers;


[ApiController]
[Route("api/owners/{ownerId}/mobilhomes/{mobilhomeId}/reservations/{reservationId}/vacationers")]
public class VacationersController : ControllerBase
{
    private readonly AddVacationersHandler _addVacationersHandler;

    public VacationersController(AddVacationersHandler addVacationersHandler)
    {
        _addVacationersHandler = addVacationersHandler;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Add(uint ownerId, uint mobilhomeId, uint reservationId, [FromBody] AddVacationersCommand command)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (ownerId != ownerIdByToken)
            return Forbid();

        await _addVacationersHandler.Handle(ownerIdByToken, mobilhomeId, reservationId, command);


        return NoContent();
    }

}
using Application.UseCases.Reservations.AddReservation;
using Application.UseCases.Reservations.DeleteReservation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("api/owners/{ownerId}/mobilhomes/{mobilhomeId}/reservations")]
public class ReservationsController : ControllerBase
{
    private readonly AddReservationHandler _addReservationHandler;
    private readonly DeleteReservationHandler _deleteReservationHandler;



    public ReservationsController(AddReservationHandler addReservationHandler, DeleteReservationHandler deleteReservationHandler)
    {
        _deleteReservationHandler = deleteReservationHandler;
        _addReservationHandler = addReservationHandler;
        _addReservationHandler = addReservationHandler;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Add(uint ownerId, uint mobilhomeId, [FromBody] AddReservationCommand command)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (ownerId != ownerIdByToken)
            return Forbid();

        var created = await _addReservationHandler.Handle(command, mobilhomeId, ownerIdByToken);

        return Ok(created); // pour test swagger rapide
    }

    [Authorize]
    [HttpDelete("{resaId:int}")]
    public async Task<IActionResult> Delete(uint ownerId, uint mobilhomeId, uint resaId)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (ownerId != ownerIdByToken)
            return Forbid();

        await _deleteReservationHandler.Handle(ownerIdByToken, mobilhomeId, resaId);


        return NoContent();
    }
}

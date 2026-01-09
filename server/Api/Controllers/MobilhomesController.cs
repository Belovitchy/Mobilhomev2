using Application.UseCases.Mobilhomes.GetMobilhomesByOwner;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/owners/{ownerId}/mobilhomes")]
public class MobilhomesController : ControllerBase
{
    private readonly GetMobilhomesByOwnerHandler _handler;

    public MobilhomesController(GetMobilhomesByOwnerHandler handler)
    {
        _handler = handler;
    }

    [HttpGet]
    public async Task<IActionResult> GetByOwner(uint ownerId)
    {
        var result = await _handler.Handle(
            new GetMobilhomesByOwnerQuery(ownerId)
        );

        return Ok(result);
    }
}

using Microsoft.AspNetCore.Mvc;
using Application.UseCases.Managers.GetManagersByOwner;


[ApiController]
[Route("api/owners/{ownerId}/managers")]
public class ManagersController : ControllerBase
{
    private readonly GetManagersByOwnerHandler _handler;

    public ManagersController(GetManagersByOwnerHandler handler)
    {
        _handler = handler;
    }

    [HttpGet]
    public async Task<IActionResult> GetByOwner(uint ownerId)
    {
        var result = await _handler.Handle(
            new GetManagersByOwnerQuery(ownerId)
        );

        return Ok(result);
    }
}


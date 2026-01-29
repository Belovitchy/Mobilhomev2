using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.Mappers;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Application.UseCases.Auth.UpdateEmailOwner;
using Application.UseCases.Auth.UpdatePassOwner;


namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OwnersController : ControllerBase
{
    private readonly IOwnerRepository _ownerRepository;
    private readonly UpdateEmailOwnerHandler _updateEmailOwnerHandler;
    private readonly UpdatePassOwnerHandler _updatePassOwnerHandler;



    public OwnersController(IOwnerRepository ownerRepository, UpdateEmailOwnerHandler updateEmailOwnerHandler, UpdatePassOwnerHandler updatePassOwnerHandler)
    {
        _ownerRepository = ownerRepository;
        _updateEmailOwnerHandler = updateEmailOwnerHandler;
        _updatePassOwnerHandler = updatePassOwnerHandler;
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(uint id)
    {
        var owner = await _ownerRepository.GetByIdAsync(id);

        if (owner == null)
            return NotFound();

        var dto = OwnerMapper.ToDto(owner);

        return Ok(dto);
    }

    [Authorize]
    [HttpPatch("{id:int}/email")]
    public async Task<IActionResult> UpdateEmail(uint id, [FromBody] UpdateEmailOwnerCommand command)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        if (id != ownerIdByToken)
            return Forbid();

        var updateOwnerMail = await _updateEmailOwnerHandler.Handle(command, ownerIdByToken);

        var dto = OwnerMapper.ToDto(updateOwnerMail);

        return Ok(dto);
    }

    [Authorize]
    [HttpPatch("{id:int}/password")]
    public async Task<IActionResult> UpdatePassword(uint id, [FromBody] UpdatePassOwnerCommand command)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);
        if (id != ownerIdByToken)
            return Forbid();

        var updateOwnerPass = await _updatePassOwnerHandler.Handle(command, ownerIdByToken);

        var dto = OwnerMapper.ToDto(updateOwnerPass);

        return Ok(dto);
    }
}



using Application.UseCases.Auth.Login;
using Microsoft.AspNetCore.Mvc;

using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Application.Mappers;
using Application.Interfaces;

namespace Application.Controllers;



[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IOwnerRepository _ownerRepository;
    private readonly LoginHandler _loginhandler;



    public AuthController(
        IOwnerRepository ownerRepository,

        LoginHandler loginhandler)
    {
        _ownerRepository = ownerRepository;

        _loginhandler = loginhandler;
    }



    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginCommand command)
    {
        var result = await _loginhandler.Handle(command);
        return Ok(result);
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> Me()
    {
        var ownerIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

        if (ownerIdClaim is null)
            return Unauthorized();

        var ownerId = uint.Parse(ownerIdClaim.Value);

        var owner = await _ownerRepository.GetByIdAsync(ownerId);

        if (owner is null)
            return Unauthorized();

        return Ok(OwnerDtoMapper.ToDto(owner));
    }
}

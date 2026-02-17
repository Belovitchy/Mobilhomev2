using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.Mappers;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Application.UseCases.Admin.GetAllOwners;
using Application.UseCases.Auth.SignIn;
using Application.UseCases.Admin.DeleteOwner;



namespace Api.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{

    private readonly GetAllOwnersHandler _getAllOwnersHandler;
    private readonly SignInHandler _signInHandler;
    private readonly DeleteOwnerHandler _deleteOwnerHandler;




    public AdminController(SignInHandler signInHandler, GetAllOwnersHandler getAllOwnersHandler, DeleteOwnerHandler deleteOwnerHandler)
    {

        _getAllOwnersHandler = getAllOwnersHandler;
        _signInHandler = signInHandler;
        _deleteOwnerHandler = deleteOwnerHandler;
    }

    [Authorize(Roles = "admin")]
    [HttpPost("signin/{ownerId:int}")]
    public async Task<IActionResult> SignIn(uint ownerId, [FromBody] SignInCommand command)
    {
        var ownerIdByToken = uint.Parse(
          User.FindFirst(ClaimTypes.NameIdentifier)!.Value
        );

        if (ownerId != ownerIdByToken)
            return Forbid();

        var createdOwner = await _signInHandler.Handle(command);

        var dto = AdminOwnerDtoMapper.ToDto(createdOwner);

        return CreatedAtAction(
            nameof(SignIn),
            new { ownerId },
            dto
        );
    }

    [Authorize(Roles = "admin")]
    [HttpGet("owners")]
    public async Task<IActionResult> GetAllOwners()
    {
        var owners = await _getAllOwnersHandler.Handle(new GetAllOwnersQuery());

        var dtoList = owners.Select(AdminOwnerDtoMapper.ToDto);
        return Ok(dtoList);
    }

    [Authorize(Roles = "admin")]
    [HttpDelete("{id:int}/owner/{ownerId:int}")]
    public async Task<IActionResult> DeleteOwner(uint id, uint ownerId)
    {
        var ownerIdByToken = uint.Parse(User.FindFirst(ClaimTypes.NameIdentifier)!.Value);

        if (id != ownerIdByToken)
            return Forbid();

        await _deleteOwnerHandler.Handle(id, ownerId);


        return NoContent();
    }
}
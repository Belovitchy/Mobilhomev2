using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.Mappers;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Application.UseCases.Admin.GetAllOwners;


namespace Api.Controllers;

[ApiController]
[Route("api/admin")]
public class AdminController : ControllerBase
{
    private readonly IOwnerRepository _ownerRepository;
    private readonly GetAllOwnersHandler _getAllOwnersHandler;



    public AdminController(IOwnerRepository ownerRepository, GetAllOwnersHandler getAllOwnersHandler)
    {
        _ownerRepository = ownerRepository;
        _getAllOwnersHandler = getAllOwnersHandler;
    }

    [Authorize(Roles = "admin")]
    [HttpGet("owners")]
    public async Task<IActionResult> GetAllOwners()
    {
        var owners = await _getAllOwnersHandler.Handle(new GetAllOwnersQuery());

        var dtoList = owners.Select(AdminOwnerDtoMapper.ToDto);
        return Ok(dtoList);
    }
}
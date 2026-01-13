using Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Application.Mappers;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OwnersController : ControllerBase
{
    private readonly IOwnerRepository _ownerRepository;

    public OwnersController(IOwnerRepository ownerRepository)
    {
        _ownerRepository = ownerRepository;
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
}



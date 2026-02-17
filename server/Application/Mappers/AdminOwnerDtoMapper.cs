using Application.DTOs;
using Domain.Entities;

namespace Application.Mappers;

public static class AdminOwnerDtoMapper
{
    public static AdminOwnerDto ToDto(Owner owner)
    {
        return new AdminOwnerDto
        {
            Id = owner.Id,
            Name = owner.Name,
            Email = owner.Email,
            IsAdmin = owner.IsAdmin
        };
    }
}

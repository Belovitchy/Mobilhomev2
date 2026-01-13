using Application.DTOs;
using Domain.Entities;

namespace Application.Mappers;

public static class OwnerMapper
{
    public static OwnerDto ToDto(Owner owner)
    {
        return new OwnerDto
        {
            Id = owner.Id,
            Name = owner.Name,
            Email = owner.Email,
            IsAdmin = owner.IsAdmin
        };
    }
}

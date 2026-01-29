using Application.DTOs;
using Domain.Entities;

namespace Application.Mappers;

public static class LinkDtoMapper
{
    public static LinkDto ToDto(Link link)
    {
        return new LinkDto
        {
            Id = link.Id,
            Name = link.Name,
            Url = link.Url,
            OwnerId = link.OwnerId
        };
    }
}


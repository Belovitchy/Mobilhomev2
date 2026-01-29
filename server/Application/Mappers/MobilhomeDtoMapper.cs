using Application.DTOs;
using Domain.Entities;

namespace Application.Mappers;

public static class MobilhomeDtoMapper
{
    public static MobilhomeDto ToDto(Mobilhome mobilhome)
    {
        return new MobilhomeDto
        {
            Id = mobilhome.Id,
            Name = mobilhome.Name,
            IcalLink = mobilhome.IcalLink,
            Manager = new ManagerDto
            {
                Id = mobilhome.Manager.Id,
                Name = mobilhome.Manager.Name,
                Firstname = mobilhome.Manager.Firstname,
                Email = mobilhome.Manager.Email,
                Telephone = mobilhome.Manager.Telephone
            }
        };
    }
}
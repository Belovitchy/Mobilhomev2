using Domain.Entities;

namespace Application.Interfaces.Security;

public interface IJwtTokenGenerator
{
    string Generate(Owner owner);
}
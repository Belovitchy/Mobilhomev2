using VacationerEntity = Domain.Entities.Vacationer;
using VacationerModel = Infrastructure.Persistence.Models.Vacationer;

namespace Infrastructure.Mappers;

public static class VacationerMapper
{
    public static VacationerModel ToModel(VacationerEntity entity)
    {
        return new VacationerModel
        {
            Id = entity.Id,
            Name = entity.Name,
            Firstname = entity.Firstname,
            Age = entity.Age
        };
    }
    public static VacationerEntity ToEntity(VacationerModel model)
    {
        return new VacationerEntity
        {
            Id = model.Id,
            Name = model.Name,
            Firstname = model.Firstname,
            Age = model.Age
        };
    }
}
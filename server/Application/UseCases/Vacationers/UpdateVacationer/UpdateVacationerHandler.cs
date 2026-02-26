using Application.Interfaces;
using Domain.Entities;

namespace Application.UseCases.Vacationers.UpdateVacationer;

public class UpdateVacationerHandler
{
    private readonly IVacationerRepository _vacationerRepository;

    public UpdateVacationerHandler(IVacationerRepository vacationerRepository)
    {
        _vacationerRepository = vacationerRepository;
    }

    public async Task Handle(UpdateVacationerCommand command, uint ownerId, uint mobilhomeId, uint vacationerId)
    {
        var vacationer = await _vacationerRepository.GetByIdAsync(vacationerId);

        if (vacationer == null)
            throw new Exception("Vacationer not found");

        vacationer.Name = command.Name;
        vacationer.Firstname = command.Firstname ?? "";
        vacationer.Age = command.Age ?? 0;


        await _vacationerRepository.UpdateVacationerAsync(vacationerId, vacationer);
    }
}


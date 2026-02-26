using Application.Interfaces;
using Domain.Entities;


namespace Application.UseCases.Vacationers.AddVacationers;

public class AddVacationersHandler
{
    private readonly IVacationerRepository _vacationerRepository;
    private readonly IReservationRepository _reservationRepository;
    private readonly IMobilhomeRepository _mobilhomeRepository;



    public AddVacationersHandler(IVacationerRepository vacationerRepository, IReservationRepository reservationRepository, IMobilhomeRepository mobilhomeRepository)
    {
        _vacationerRepository = vacationerRepository;
        _reservationRepository = reservationRepository;
        _mobilhomeRepository = mobilhomeRepository;
    }

    public async Task<Vacationer> Handle(uint ownerId, uint mobilhomeId, uint reservationId, AddVacationersCommand command)
    {
        var reservation = await _reservationRepository.GetByIdAsync(reservationId);

        var mobilhome = await _mobilhomeRepository.GetByIdAsync(mobilhomeId);

        if (mobilhome == null)
            throw new Exception("Mobilhome not found");

        if (mobilhome.OwnerId != ownerId)
            throw new UnauthorizedAccessException();


        if (reservation == null)
            throw new Exception("Reservation not found");

        if (reservation.MobilhomeId != mobilhomeId)
            throw new UnauthorizedAccessException();


        var vacationer = new Vacationer
        {
            Name = command.Name,
            Firstname = command.Firstname,
            Age = command.Age

        };

        var created = await _vacationerRepository.AddToReservationAsync(reservationId, vacationer);
        return created;


    }
}
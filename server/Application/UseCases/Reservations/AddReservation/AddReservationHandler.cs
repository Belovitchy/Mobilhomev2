using Application.Interfaces;
using Domain.Entities;


namespace Application.UseCases.Reservations.AddReservation;

public class AddReservationHandler
{
    private readonly IReservationRepository _reservationRepository;
    private readonly IMobilhomeRepository _mobilhomeRepo;


    public AddReservationHandler(IReservationRepository reservationRepository, IMobilhomeRepository mobilhomeRepo)
    {
        _reservationRepository = reservationRepository;
        _mobilhomeRepo = mobilhomeRepo;
    }

    public async Task<Reservation> Handle(AddReservationCommand command, uint mobilhomeId, uint ownerId)
    {
        // Sécurité : vérifier que le mobilhome appartient bien au owner
        var mobilhome = await _mobilhomeRepo.GetByIdAsync(mobilhomeId);
        if (mobilhome == null)
            throw new Exception("Mobilhome not found");

        if (mobilhome.OwnerId != ownerId)
            throw new UnauthorizedAccessException();

        var reservation = new Reservation
        {
            MobilhomeId = mobilhomeId,
            Name = command.Name,
            StartDate = command.StartDate,
            EndDate = command.EndDate,
            Color = command.Color,
            Comment = command.Comment,
            NumberPerson = command.NumberPerson,
            Funpass = command.Funpass,
            Email = command.Email,
            Phone = command.Phone,
            Immat = command.Immat,
            SibluResa = command.SibluResa
        };

        return await _reservationRepository.AddAsync(reservation);
    }

}
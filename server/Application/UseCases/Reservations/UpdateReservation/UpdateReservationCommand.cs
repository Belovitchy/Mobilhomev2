namespace Application.UseCases.Reservations.UpdateReservation;

public record UpdateReservationCommand(
   string Name,
    DateOnly StartDate,
    DateOnly EndDate,
    string Color,
    string? Comment,
    int? NumberPerson,
    sbyte? Funpass,
    string? Email,
    string? Phone,
    string? Immat,
    string? SibluResa
);
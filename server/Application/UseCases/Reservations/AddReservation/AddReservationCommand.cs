namespace Application.UseCases.Reservations.AddReservation;

public record AddReservationCommand(

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
namespace Application.UseCases.Vacationers.AddVacationers;

public record AddVacationersCommand(
    string Name,
    string Firstname,
    uint Age
);


namespace Application.UseCases.Vacationers.AddVacationers;

public record AddVacationersCommand(
    List<VacationerDto> Vacationers
);

public record VacationerDto(
    string Name,
    string Firstname,
    uint Age
);
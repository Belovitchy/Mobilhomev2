namespace Application.UseCases.Vacationers.UpdateVacationer;

public record UpdateVacationerCommand(
    string Name,
    string? Firstname,
    uint? Age
);
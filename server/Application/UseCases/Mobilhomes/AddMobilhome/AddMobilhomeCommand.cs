namespace Application.UseCases.Mobilhomes.AddMobilhome;

public record AddMobilhomeCommand(
    string Name,
    uint ManagerId,
    string? IcalLink
);
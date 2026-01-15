namespace Application.UseCases.Mobilhomes.UpdateMobilhome;

public record UpdateMobilhomeCommand(
    string Name,
    uint ManagerId,
    string? IcalLink
);

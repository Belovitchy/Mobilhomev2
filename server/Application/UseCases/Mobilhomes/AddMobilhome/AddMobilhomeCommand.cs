namespace Application.UseCases.Mobilhomes.AddMobilhome;

public record AddMobilhomeCommand(
    string Name,
    uint OwnerId,
    uint ManagerId,
    string IcalLink
);
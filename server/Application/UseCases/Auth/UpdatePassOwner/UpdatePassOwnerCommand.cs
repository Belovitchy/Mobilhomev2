namespace Application.UseCases.Auth.UpdatePassOwner;

public record UpdatePassOwnerCommand(
    string OldPassword,
    string NewPassword
);

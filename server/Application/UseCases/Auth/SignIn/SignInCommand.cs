namespace Application.UseCases.Auth.SignIn;

public record SignInCommand(
    string Name,
    string Email,
    string Password,
    bool IsAdmin
);


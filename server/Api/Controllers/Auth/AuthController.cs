using Application.UseCases.Auth.Login;
using Microsoft.AspNetCore.Mvc;
using Application.UseCases.Auth.SignIn;

namespace Application.Controllers;



[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly LoginHandler _loginhandler;
    private readonly SignInHandler _signInHandler;


    public AuthController(
        SignInHandler signInHandler,
        LoginHandler loginhandler)
    {
        _signInHandler = signInHandler;
        _loginhandler = loginhandler;
    }

    [HttpPost("signin")]
    public async Task<IActionResult> SignIn(SignInCommand command)
    {
        await _signInHandler.ExecuteAsync(command);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginCommand command)
    {
        var result = await _loginhandler.Handle(command);
        return Ok(result);
    }
}

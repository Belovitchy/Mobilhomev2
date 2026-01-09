namespace Infrastructure.Options;

public class JwtOptions
{
    public const string SectionName = "Jwt";
    public string Secret { get; init; } = null!;
    public string Issuer { get; init; } = null!;
    public string Audience { get; init; } = null!;
    public int ExpirationHours { get; init; } = 2;
}

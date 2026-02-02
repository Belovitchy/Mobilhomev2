using Infrastructure;

using Microsoft.EntityFrameworkCore;
using Application.UseCases.Mobilhomes.GetMobilhomesByOwner;
using Application.UseCases.Managers.GetManagersByOwner;
using Application.UseCases.Auth.Login;
using Application.UseCases.Auth.SignIn;
using Microsoft.OpenApi.Models;
using Infrastructure.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Application.UseCases.Mobilhomes.AddMobilhome;
using Application.UseCases.Mobilhomes.UpdateMobilhome;
using Application.UseCases.Mobilhomes.DeleteMobilhome;
using Application.UseCases.Auth.UpdateEmailOwner;
using Application.UseCases.Auth.UpdatePassOwner;
using Application.UseCases.Links.AddLink;
using Application.UseCases.Links.DeleteLink;
using Application.UseCases.Links.UpdateLink;
using System.Security.Claims;
using Application.UseCases.Admin.GetAllOwners;

var builder = WebApplication.CreateBuilder(args);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactClient", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

builder.Services.AddInfrastructure(
    builder.Configuration.GetConnectionString("DefaultConnection")!
);

builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection(JwtOptions.SectionName));

var jwtOptions = builder.Configuration
    .GetSection(JwtOptions.SectionName)
    .Get<JwtOptions>()!;

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = jwtOptions.Issuer,
            ValidAudience = jwtOptions.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtOptions.Secret)
            ),
            RoleClaimType = ClaimTypes.Role
        };
    });



builder.Services.AddControllers();

builder.Services.AddScoped<GetMobilhomesByOwnerHandler>();
builder.Services.AddScoped<GetManagersByOwnerHandler>();
builder.Services.AddScoped<LoginHandler>();
builder.Services.AddScoped<SignInHandler>();
builder.Services.AddScoped<AddMobilhomeHandler>();
builder.Services.AddScoped<UpdateMobilhomeHandler>();
builder.Services.AddScoped<DeleteMobilhomeHandler>();
builder.Services.AddScoped<UpdateEmailOwnerHandler>();
builder.Services.AddScoped<UpdatePassOwnerHandler>();
builder.Services.AddScoped<AddLinkHandler>();
builder.Services.AddScoped<DeleteLinkHandler>();
builder.Services.AddScoped<UpdateLinkHandler>();
builder.Services.AddScoped<GetAllOwnersHandler>();


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MobilHome API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Entrez : Bearer {votre_token}"
    });

    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});



var app = builder.Build();

// Use CORS policy
app.UseCors("AllowReactClient");



app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MobilHome API v2"));

//checktoken
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();

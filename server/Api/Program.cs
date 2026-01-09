using Infrastructure;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Application.UseCases.Mobilhomes.GetMobilhomesByOwner;
using Application.UseCases.Managers.GetManagersByOwner;
using Application.UseCases.Auth.Login;
using Application.UseCases.Auth.SignIn;
using Microsoft.OpenApi.Models;
using Infrastructure.Options;


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

// var jwt = builder.Configuration.GetSection("Jwt").Get<JwtOptions>();
// Console.WriteLine(jwt?.Secret ?? "JWT SECRET NULL");


builder.Services.AddControllers();

builder.Services.AddScoped<GetMobilhomesByOwnerHandler>();
builder.Services.AddScoped<GetManagersByOwnerHandler>();
builder.Services.AddScoped<LoginHandler>();
builder.Services.AddScoped<SignInHandler>();


builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "MobilHome API", Version = "v1" });
});



var app = builder.Build();

// Use CORS policy
app.UseCors("AllowReactClient");

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MobilHome API v1"));

app.MapControllers();
app.Run();

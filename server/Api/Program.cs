using Infrastructure;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Application.UseCases.Mobilhomes.GetMobilhomesByOwner;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddInfrastructure(
    builder.Configuration.GetConnectionString("DefaultConnection")!
);

builder.Services.AddControllers();

builder.Services.AddScoped<GetMobilhomesByOwnerHandler>();

var app = builder.Build();

app.MapControllers();
app.Run();

using Kankoreziai.Database;
using Kankoreziai.Middleware;
using Kankoreziai.Models;
using Kankoreziai.Services;
using Kankoreziai.Services.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog();

var services = builder.Services;
var configuration = builder.Configuration;

services.AddDbContext<KankoreziaiDbContext>(options => options.UseInMemoryDatabase(databaseName: "KankoreziaiDB"));

services.AddTransient<GoogleAuthenticationMiddleware>();
services.AddScoped<IUserService, UserService>();

services.AddControllersWithViews();
services.AddSwaggerGen(options =>
{ 
    options.EnableAnnotations();
});


var dbOptions = new DbContextOptionsBuilder<KankoreziaiDbContext>()
    .UseInMemoryDatabase(databaseName: "KankoreziaiDB")
    .Options;

using (var context = new KankoreziaiDbContext(dbOptions))
{
    context.InitializeData();
}

services.AddScoped<IProductsRepository, ProductsRepository>();
services.AddScoped<IOrdersRepository, OrdersRepository>();
services.AddScoped<IOrderService, OrderService>();

var app = builder.Build();

app.UseCors(x => x.AllowAnyMethod().AllowAnyHeader().SetIsOriginAllowed(origin => true).AllowCredentials());

Log.Logger = new LoggerConfiguration()
            .Enrich.WithProperty("app", "Flower API")
            .Enrich.FromLogContext()
            .WriteTo.Console()
            .CreateLogger();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseMiddleware<GoogleAuthenticationMiddleware>();

app.UseSwagger(options =>
{
    options.RouteTemplate = "api/swagger/{documentname}/swagger.json";
});

app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint( "/api/swagger/v1/swagger.json", "Kankoreziai API");
    options.RoutePrefix = "api/swagger";
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");


app.Run();

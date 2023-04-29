using Kankoreziai.Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

services.AddDbContext<KankoreziaiDbContext>(options => options.UseInMemoryDatabase(databaseName: "MyDatabase"));
services.AddControllersWithViews();

var options = new DbContextOptionsBuilder<KankoreziaiDbContext>()
    .UseInMemoryDatabase(databaseName: "MyDatabase")
    .Options;

using (var context = new KankoreziaiDbContext(options))
{
    context.InitializeData();
}


var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

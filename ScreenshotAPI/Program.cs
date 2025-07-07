// var builder = WebApplication.CreateBuilder(args);
// builder.Services.AddControllers();
// builder.Services.AddHttpClient();
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", policy =>
//         policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
// });

// var app = builder.Build();
// app.UseCors("AllowAll");
// app.MapControllers();
// app.UseHttpsRedirection();
// app.UseRouting();
// app.UseAuthorization();
// app.Run();
 

// using Microsoft.AspNetCore.Builder;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
// using Microsoft.EntityFrameworkCore;

// var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddDbContext<ScanDbContext>(options =>
//     options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// // Add services to the container.
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();



// // Configure CORS
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAll", policy =>
//     {
//         policy.AllowAnyOrigin()
//               .AllowAnyMethod()
//               .AllowAnyHeader();
//     });
// });

// var app = builder.Build();

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// // Enable CORS before other middleware
// app.UseCors("AllowAll");

// app.UseHttpsRedirection();
// app.UseAuthorization();
// app.MapControllers();

// Console.WriteLine("Web Scanner API is running on https://localhost:7242");
// Console.WriteLine("Swagger UI available at: https://localhost:7242/swagger");

// app.Run();



using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ScreenshotAPI.Data;
using ScreenshotAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add CORS service
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
builder.Services.AddScoped<IWebsiteCrawler, WebsiteCrawler>();
builder.Services.AddScoped<WebsiteScannerService>();
builder.Services.AddScoped<UrlLivenessService>();

builder.Services.AddControllers();
builder.Services.AddDbContext<ScanDbContext>(options =>
    options.UseSqlite("Data Source=scan.db")); // or your actual DB config

var app = builder.Build();

// Enable CORS middleware
app.UseCors("AllowFrontend");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

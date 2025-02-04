using Erp.Server.Middleware;
using Erp.Server.Models;
using Erp.Server.Repository;
using Erp.Server.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;
using System.Text;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Register services
builder.Services.AddSingleton<IJwtAuthManager, JwtAuthManager>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("KDSFADSJFNFDGJASDFGADFNEJFWRWERdDSFHAKSD")),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true, // Enable lifetime validation
        ClockSkew = TimeSpan.Zero
    };

    options.Events = new JwtBearerEvents
    {

    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("https://localhost:4200", "http://localhost:4200")  // Replace with your Angular app URL
            .AllowAnyMethod()
            .AllowAnyHeader());
});

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\""
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Retrieve configuration instance to get connection string
builder.Services.AddDbContext<DBContext>(
    options => options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectionStr"))
);

builder.Services.AddTransient<IUser, UserRepository>();
builder.Services.AddTransient<IRole, RoleRepository>();
builder.Services.AddTransient<ILogin, LoginRepository>();
builder.Services.AddTransient<IPurchaseOrder, PurchaseOrderRepository>();
builder.Services.AddTransient<IMenu, MenuRepository>();
builder.Services.AddTransient<IRoleMenu, RoleMenuRepository>();
builder.Services.AddTransient<ISupplier, SupplierRepository>();
builder.Services.AddTransient<ICustomer, CustomerRepository>();
builder.Services.AddTransient<IExpense, ExpenseRepository>();
builder.Services.AddTransient<IIncome, IncomeRepository>();
builder.Services.AddTransient<ICategory, CategoryRepository>();
builder.Services.AddTransient<IMasterData, MasterDataRepository>();
builder.Services.AddTransient<IDesignation, DesignationRepository>();
builder.Services.AddTransient<ICompany, CompanyRepository>();
builder.Services.AddTransient<IReleaseDocument, ReleaseDocumentRepository>();
builder.Services.AddTransient<IAttendance, AttendanceRepository>();
builder.Services.AddTransient<IMachine, MachineRepository>();
builder.Services.AddTransient<IReport, ReportRepository>();



var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

//// Middleware to log incoming request details
//app.Use(async (context, next) =>
//{
//    var logger = context.RequestServices.GetRequiredService<ILogger<Program>>();
//    logger.LogInformation("Handling request: {Method} {Path}", context.Request.Method, context.Request.Path);
//    await next();
//    logger.LogInformation("Finished handling request.");
//});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();

app.UseAuthentication(); // Authentication should come before authorization
app.UseAuthorization();  // Authorization should come after authentication

app.MapControllers();
app.MapFallbackToFile("/Index.html");

app.Run();

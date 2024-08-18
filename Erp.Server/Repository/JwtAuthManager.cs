using Erp.Server.Services;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Erp.Server.Repository
{
    public class JwtAuthManager : IJwtAuthManager
    {
        private readonly string _key;

        public JwtAuthManager(IConfiguration configuration)
        {
            _key = configuration.GetValue<string>("Jwt:Key") ??"";
        }

        public string GenerateToken(string username)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("KDSFADSJFNFDGJASDFGADFNEJFWRWERdDSFHAKSD"); // Use UTF8 encoding

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim(ClaimTypes.Name, username) }), // Use standard claim type
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            // Encode the JWT token
            var tokenString = tokenHandler.CreateEncodedJwt(tokenDescriptor);

            // Log the token for debugging
            Trace.WriteLine($"Generated Token: {tokenString}");

            return tokenString;
        }


    }
}

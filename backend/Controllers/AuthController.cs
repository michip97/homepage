using Microsoft.AspNetCore.Mvc;
using backend.DTOs;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost("verify")]
        public IActionResult VerifyPassword([FromBody] AuthRequest request)
        {
            var correctPassword = _configuration["DownloadPassword"] ?? "secret";

            if (request.Password == correctPassword)
            {
                // In a real app we'd issue a JWT. For this simple portfolio, a simple token string is enough.
                return Ok(new { token = "valid-download-token", message = "Password verified" });
            }

            return Unauthorized(new { message = "Invalid password" });
        }
    }
}
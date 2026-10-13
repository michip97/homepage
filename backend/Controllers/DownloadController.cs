using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DownloadController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        public DownloadController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet("cv")]
        public IActionResult DownloadCv([FromQuery] string token)
        {
            if (token != "valid-download-token")
            {
                return Unauthorized("Invalid or missing token.");
            }

            // Path to the CV file (we will create a dummy one or you can upload the real one later)
            var filepath = Path.Combine(_env.ContentRootPath, "Assets", "CV_Michael_Portmann.pdf");

            if (!System.IO.File.Exists(filepath))
            {
                return NotFound("File not found.");
            }

            var bytes = System.IO.File.ReadAllBytes(filepath);
            return File(bytes, "application/pdf", "CV_Michael_Portmann.pdf");
        }
    }
}
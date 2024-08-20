using Microsoft.AspNetCore.Mvc;

namespace DictionaryApi.Controllers
{
    [ApiController]
    [Route("/")]
    public class HomeController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            var response = new
            {
                message = "Fullstack Challenge 🏅 - Dictionary"
            };

            return Ok(response);
        }
    }
}

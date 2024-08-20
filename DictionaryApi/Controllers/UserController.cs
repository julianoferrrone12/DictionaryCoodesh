using System;
using System.Threading.Tasks;
using DictionaryApi.Dtos.Dictionary;
using DictionaryApi.Interfaces;
using DictionaryApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DictionaryApi.Controllers
{
    [Authorize]
    [Route("user/me")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IFavoritesService _favoritesService;
        private readonly IHistoryService _historyService;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<UserController> _logger;

        public UserController(IFavoritesService favoritesService, IHistoryService historyService, ILogger<UserController> logger, UserManager<User> userManager)
        {
            _favoritesService = favoritesService;
            _historyService = historyService;
            _userManager = userManager;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> GetUserInfo()
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    _logger.LogWarning("User not found.");
                    return Unauthorized(new { message = "User not found" });
                }

                var userDto = new
                {
                    user.Id,
                    user.UserName,
                    user.Email
                };

                return Ok(userDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving user info.");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetUserHistory([FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    _logger.LogWarning("User not found.");
                    return Unauthorized(new { message = "User not found" });
                }

                var history = await _historyService.GetUserHistoryAsync(user.Id, page, limit);

                return Ok(history);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving user history.");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet("favorites")]
        public async Task<IActionResult> GetUserFavorites([FromQuery] int page = 1)
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    _logger.LogWarning("User not found.");
                    return Unauthorized(new { message = "User not found" });
                }

                // Chama o método com dois parâmetros
                var favorites = await _favoritesService.GetUserFavoritesAsync(user.Id, page);

                return Ok(favorites);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving user favorites.");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

    }
}

using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using DictionaryApi.Dtos.Dictionary;
using DictionaryApi.Interfaces;
using DictionaryApi.Models;
using DictionaryApi.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DictionaryApi.Controllers
{
    [Authorize]
    [Route("entries/")]
    [ApiController]
    public class DictionaryController : ControllerBase
    {
        private readonly IDictionaryService _dictionaryService;
        private readonly IFavoritesService _favoritesService;
        private readonly IHistoryService _historyService;
        private readonly UserManager<User> _userManager;

        public DictionaryController(IDictionaryService dictionaryService, IFavoritesService favoritesService, IHistoryService historyService, UserManager<User> userManager)
        {
            _dictionaryService = dictionaryService;
            _favoritesService = favoritesService;
            _historyService = historyService;
            _userManager = userManager;
        }

        [HttpGet("en")]
        public async Task<IActionResult> GetWords([FromQuery] string search = "", [FromQuery] int page = 1, [FromQuery] int limit = 10)
        {
            if (string.IsNullOrEmpty(search))
            {
                search = null;
            }

            var result = await _dictionaryService.GetAllWordsAsync(search, page, limit);
            return Ok(result);
        }

        [HttpGet("en/{word}")]
        public async Task<IActionResult> GetWordInfo(string word)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found" });
            }

            var wordInfoDto = await _dictionaryService.GetWordInfoAsync(word);

            if (wordInfoDto == null)
            {
                return NotFound(new { message = "Word not found" });
            }

            await _historyService.AddToHistoryAsync(user.Id, word);

            return Ok(wordInfoDto);
        }



        [HttpPost("en/{word}/favorite")]
        public async Task<IActionResult> AddToFavorites(string word)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found" });
            }

            await _favoritesService.AddToFavoritesAsync(user.Id, word);

            return NoContent();
        }


        [HttpDelete("en/{word}/unfavorite")]
        public async Task<IActionResult> RemoveFromFavorites(string word)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized(new { message = "User not found" });
            }

            await _favoritesService.RemoveFromFavoritesAsync(user.Id, word);

            return NoContent();
        }

    }

}
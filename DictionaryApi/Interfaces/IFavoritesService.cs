using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DictionaryApi.Dtos.Dictionary;

namespace DictionaryApi.Interfaces
{
    public interface IFavoritesService
    {
        Task AddToFavoritesAsync(string userId, string word);
        Task RemoveFromFavoritesAsync(string userId, string word);
        Task<PagedResult<FavoriteEntryDto>> GetUserFavoritesAsync(string userId, int page);
    }
}
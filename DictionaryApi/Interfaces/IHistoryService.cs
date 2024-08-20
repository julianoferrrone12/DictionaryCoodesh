using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DictionaryApi.Dtos.Dictionary;

namespace DictionaryApi.Interfaces
{
    public interface IHistoryService
    {
        Task AddToHistoryAsync(string userId, string word);
        Task<PagedResult<HistoryEntryDto>> GetUserHistoryAsync(string userId, int page, int limit);
    }
}
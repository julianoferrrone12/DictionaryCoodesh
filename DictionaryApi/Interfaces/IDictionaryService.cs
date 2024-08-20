using System.Threading.Tasks;
using DictionaryApi.Dtos.Dictionary;

namespace DictionaryApi.Interfaces
{
    public interface IDictionaryService
    {
        Task<PagedResult<string>> GetAllWordsAsync(string search, int page, int limit);

        Task<WordInfoDto> GetWordInfoAsync(string word);
    }
}

using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using DictionaryApi.Models;
using MongoDB.Driver;
public class WordImporter
{
    private readonly IMongoCollection<WordInfo> _wordCollection;
    private readonly HttpClient _httpClient;

    public WordImporter(IMongoCollection<WordInfo> wordCollection, HttpClient httpClient)
    {
        _wordCollection = wordCollection;
        _httpClient = httpClient;
    }

    public async Task ImportWordsAsync()
    {
        var response = await _httpClient.GetStringAsync("https://raw.githubusercontent.com/meetDeveloper/freeDictionaryAPI/master/meta/wordList/english.txt");
        var words = response.Split('\n');

        var wordInfos = words.Select(word => new WordInfo
        {
            Word = word.Trim(),
            Definition = "Definition pending..."
        });

        await _wordCollection.InsertManyAsync(wordInfos);
    }
}


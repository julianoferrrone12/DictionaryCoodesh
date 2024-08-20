using System;
using System.Threading.Tasks;
using DictionaryApi.Data;
using DictionaryApi.Models;
using DictionaryApi.Interfaces;
using DictionaryApi.Dtos.Dictionary;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using MongoDB.Driver;
using DictionaryApi.Configurations;
using Microsoft.Extensions.Options;

namespace DictionaryApi.Services
{
    public class DictionaryService : IDictionaryService
    {
        private readonly IMongoCollection<WordInfo> _context;

        private readonly HttpClient _httpClient;

        public DictionaryService(IOptions<MongoDBSettings> mongoDBSettings, HttpClient httpClient)
        {
            _httpClient = httpClient;
            var mongoClient = new MongoClient(
            mongoDBSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                mongoDBSettings.Value.DatabaseName);

            _context = mongoDatabase.GetCollection<WordInfo>(
                mongoDBSettings.Value.WordsCollectionName);
        }

        public async Task<PagedResult<string>> GetAllWordsAsync(string search, int page, int limit)
        {
            var filter = Builders<WordInfo>.Filter.Empty;

            if (!string.IsNullOrEmpty(search))
            {
                var searchFilter = Builders<WordInfo>.Filter.Regex(w => w.Word, new MongoDB.Bson.BsonRegularExpression("^" + search, "i"));

                filter = Builders<WordInfo>.Filter.And(filter, searchFilter);
            }

            long totalDocsLong = await _context.CountDocumentsAsync(filter);
            int totalDocs = (int)totalDocsLong;
            int totalPages = (int)Math.Ceiling((double)totalDocs / limit);

            var words = await _context.Find(filter)
                .Skip((page - 1) * limit)
                .Limit(limit)
                .ToListAsync();

            return new PagedResult<string>
            {
                Results = words.Select(w => w.Word).ToList(),
                TotalDocs = totalDocs,
                Page = page,
                TotalPages = totalPages,
                HasNext = page < totalPages,
                HasPrev = page > 1
            };
        }


        public async Task<WordInfoDto> GetWordInfoAsync(string word)
        {
            var response = await _httpClient.GetAsync($"https://api.dictionaryapi.dev/api/v2/entries/en/{word}");

            if (response.IsSuccessStatusCode)
            {
                var responseBody = await response.Content.ReadAsStringAsync();
                var apiResult = JsonSerializer.Deserialize<List<WordInfoDto>>(responseBody, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                return apiResult?.FirstOrDefault();
            }

            var wordInfo = await _context.Find(w => w.Word == word).FirstOrDefaultAsync();

            if (wordInfo != null)
            {
                return new WordInfoDto { Word = wordInfo.Word };
            }

            return null;
        }



    }

}
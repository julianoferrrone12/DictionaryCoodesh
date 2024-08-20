using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DictionaryApi.Configurations;
using DictionaryApi.Dtos.Dictionary;
using DictionaryApi.Interfaces;
using DictionaryApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace DictionaryApi.Service
{
    public class HistoryService : IHistoryService
    {
        private readonly IMongoCollection<HistoryEntry> _historyCollection;
        private readonly MongoDBSettings _mongoDBSettings;

        public HistoryService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            _mongoDBSettings = mongoDBSettings.Value;
            var mongoClient = new MongoClient(_mongoDBSettings.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(_mongoDBSettings.DatabaseName);
            _historyCollection = mongoDatabase.GetCollection<HistoryEntry>(_mongoDBSettings.HistoryCollectionName);
        }

        public async Task AddToHistoryAsync(string userId, string word)
        {
            var historyEntry = new HistoryEntry
            {
                UserId = userId,
                Word = word,
                Added = DateTime.UtcNow
            };

            await _historyCollection.InsertOneAsync(historyEntry);
        }

        public async Task<PagedResult<HistoryEntryDto>> GetUserHistoryAsync(string userId, int page, int limit)
        {
            try
            {
                var filter = Builders<HistoryEntry>.Filter.Eq(e => e.UserId, userId);

                var totalEntries = await _historyCollection.CountDocumentsAsync(filter);

                var historyEntries = await _historyCollection.Find(filter)
                    .SortByDescending(e => e.Added)
                    .Skip((page - 1) * limit)
                    .Limit(limit)
                    .ToListAsync();

                return new PagedResult<HistoryEntryDto>
                {
                    Results = historyEntries.Select(e => new HistoryEntryDto { Word = e.Word, Added = e.Added }).ToList(),
                    TotalDocs = (int)totalEntries,
                    Page = page,
                    TotalPages = (int)Math.Ceiling((double)totalEntries / limit),
                    HasNext = page * limit < totalEntries,
                    HasPrev = page > 1
                };
            }
            catch (Exception ex)
            {
                // Log the exception
                throw new InvalidOperationException("Failed to retrieve user history", ex);
            }
        }
    }
}

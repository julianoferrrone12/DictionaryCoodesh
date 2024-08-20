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
    public class FavoritesService : IFavoritesService
    {
        private readonly IMongoCollection<FavoriteEntry> _favoritesCollection;
        private readonly MongoDBSettings _mongoDBSettings;

        public FavoritesService(IOptions<MongoDBSettings> mongoDBSettings)
        {
            _mongoDBSettings = mongoDBSettings.Value;
            var mongoClient = new MongoClient(_mongoDBSettings.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(_mongoDBSettings.DatabaseName);
            _favoritesCollection = mongoDatabase.GetCollection<FavoriteEntry>(_mongoDBSettings.FavoritesCollectionName);
        }

        public async Task AddToFavoritesAsync(string userId, string word)
        {
            var favoriteEntry = new FavoriteEntry
            {
                UserId = userId,
                Word = word,
                Added = DateTime.UtcNow
            };

            await _favoritesCollection.InsertOneAsync(favoriteEntry);
        }

        public async Task RemoveFromFavoritesAsync(string userId, string word)
        {
            var filter = Builders<FavoriteEntry>.Filter.And(
                Builders<FavoriteEntry>.Filter.Eq(f => f.UserId, userId),
                Builders<FavoriteEntry>.Filter.Eq(f => f.Word, word)
            );

            await _favoritesCollection.DeleteOneAsync(filter);
        }

        public async Task<PagedResult<FavoriteEntryDto>> GetUserFavoritesAsync(string userId, int page)
        {
            var filter = Builders<FavoriteEntry>.Filter.Eq(f => f.UserId, userId);

            var totalEntries = await _favoritesCollection.CountDocumentsAsync(filter);

            var favoriteEntries = await _favoritesCollection.Find(filter)
                .SortByDescending(f => f.Added)
                .Skip((page - 1) * 10)
                .Limit(10)
                .ToListAsync();

            return new PagedResult<FavoriteEntryDto>
            {
                Results = favoriteEntries.Select(f => new FavoriteEntryDto { Word = f.Word, Added = f.Added }).ToList(),
                TotalDocs = (int)totalEntries,
                Page = page,
                TotalPages = (int)Math.Ceiling((double)totalEntries / 10),
                HasNext = page * 10 < totalEntries,
                HasPrev = page > 1
            };
        }
    }
}

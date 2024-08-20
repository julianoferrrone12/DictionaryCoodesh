using MongoDB.Driver;
using Microsoft.Extensions.Options;
using DictionaryApi.Models;
using DictionaryApi.Configurations;

namespace DictionaryApi.Data
{
    public class DictionaryContext
    {
        private readonly IMongoDatabase _database;

        public DictionaryContext(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            _database = client.GetDatabase(settings.Value.DatabaseName);
        }

        public IMongoCollection<FavoriteEntry> FavoriteEntries => _database.GetCollection<FavoriteEntry>("FavoriteEntries");
        public IMongoCollection<HistoryEntry> HistoryEntries => _database.GetCollection<HistoryEntry>("HistoryEntries");
        public IMongoCollection<WordInfo> WordInfos => _database.GetCollection<WordInfo>("WordInfos");
    }
}

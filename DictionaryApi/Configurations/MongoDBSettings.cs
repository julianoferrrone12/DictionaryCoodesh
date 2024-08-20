using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DictionaryApi.Configurations
{
    public class MongoDBSettings
    {
        public string ConnectionString { get; set; } = null!;
        public string DatabaseName { get; set; } = null!;
        public string WordsCollectionName { get; set; } = null!;
        public string FavoritesCollectionName { get; set; } = null!;

        public string HistoryCollectionName { get; set; } = null!;
    }

}
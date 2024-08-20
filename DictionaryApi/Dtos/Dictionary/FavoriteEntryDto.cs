using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DictionaryApi.Dtos.Dictionary
{
    public class FavoriteEntryDto
    {
        public string Word { get; set; }
        public DateTime Added { get; set; }
    }

}
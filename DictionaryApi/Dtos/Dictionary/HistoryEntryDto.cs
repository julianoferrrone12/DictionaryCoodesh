using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DictionaryApi.Dtos.Dictionary
{
    public class HistoryEntryDto
    {
        public string Word { get; set; }
        public DateTime Added { get; set; }
    }

}
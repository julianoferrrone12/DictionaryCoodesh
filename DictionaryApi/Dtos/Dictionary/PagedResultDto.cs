using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DictionaryApi.Dtos.Dictionary
{
    public class PagedResult<T>
    {
        public List<T> Results { get; set; }
        public int TotalDocs { get; set; }
        public int Page { get; set; }
        public int TotalPages { get; set; }
        public bool HasNext { get; set; }
        public bool HasPrev { get; set; }
    }

}
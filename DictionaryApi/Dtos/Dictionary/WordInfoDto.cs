using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DictionaryApi.Models;

namespace DictionaryApi.Dtos.Dictionary
{
    public class Phonetic
    {
        public string Text { get; set; }
        public string Audio { get; set; }
        public string SourceUrl { get; set; }
        public License License { get; set; }
    }

    public class Definitions
    {
        public string Definition { get; set; }
        public List<string> Synonyms { get; set; }
        public List<string> Antonyms { get; set; }
        public string Example { get; set; }
    }

    public class Meaning
    {
        public string PartOfSpeech { get; set; }
        public List<Definitions> Definitions { get; set; }
        public List<string> Synonyms { get; set; }
        public List<string> Antonyms { get; set; }
    }

    public class License
    {
        public string Name { get; set; }
        public string Url { get; set; }
    }

    public class WordInfoDto
    {
        public string Word { get; set; }
        public List<Phonetic> Phonetics { get; set; }
        public List<Meaning> Meanings { get; set; }
        public License License { get; set; }
        public List<string> SourceUrls { get; set; }
    }
}


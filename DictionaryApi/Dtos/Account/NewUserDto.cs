using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DictionaryApi.Dtos.Account
{
    public class NewUserDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Token { get; set; }
    }
}
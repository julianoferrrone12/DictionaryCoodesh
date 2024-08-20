using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DictionaryApi.Models;

namespace DictionaryApi.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
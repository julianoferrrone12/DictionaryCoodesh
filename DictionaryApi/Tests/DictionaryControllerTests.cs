using System.Threading.Tasks;
using DictionaryApi.Controllers;
using DictionaryApi.Interfaces;
using DictionaryApi.Models;
using DictionaryApi.Dtos.Dictionary;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace DictionaryApi.Tests
{
    public class DictionaryControllerTests
    {
        private readonly DictionaryController _controller;
        private readonly Mock<IDictionaryService> _mockDictionaryService;
        private readonly Mock<IFavoritesService> _mockFavoritesService;
        private readonly Mock<IHistoryService> _mockHistoryService;
        private readonly Mock<UserManager<User>> _mockUserManager;

        public DictionaryControllerTests()
        {
            _mockDictionaryService = new Mock<IDictionaryService>();
            _mockFavoritesService = new Mock<IFavoritesService>();
            _mockHistoryService = new Mock<IHistoryService>();
            _mockUserManager = new Mock<UserManager<User>>(
                Mock.Of<IUserStore<User>>(),
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
            );

            _controller = new DictionaryController(
                _mockDictionaryService.Object,
                _mockFavoritesService.Object,
                _mockHistoryService.Object,
                _mockUserManager.Object
            );
        }

        [Fact]
        public async Task GetWordInfo_ReturnsOkResult_WithWordInfo()
        {
            // Arrange
            var word = "example";
            var expectedWordInfo = new WordInfoDto
            {
                Word = "example",
            };

            _mockDictionaryService
                .Setup(service => service.GetWordInfoAsync(word))
                .ReturnsAsync(expectedWordInfo);

            // Mock the user manager
            _mockUserManager.Setup(um => um.GetUserAsync(It.IsAny<ClaimsPrincipal>()))
                .ReturnsAsync(new User { Id = "user1" });

            var result = await _controller.GetWordInfo(word) as OkObjectResult;

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(expectedWordInfo, result.Value);
        }
    }
}

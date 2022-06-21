using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace MyMusicAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private static List<Category> songsList = new List<Category>
            {
                new Category {
                    Id = 1,
                    Name = "Pop"
                },
                new Category {
                    Id = 2,
                    Name = "Rock"
                },
                new Category {
                    Id = 3,
                    Name = "Jazz"
                }
            };
    }
}
